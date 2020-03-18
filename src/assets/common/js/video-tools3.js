/*function displayObj(obj) {
  let names = "";
  for (let name in obj) {
    names += name + ": " + obj[name] + ", ";
  }
  return names;
}*/
class videoTool {
  constructor({ el, wsUri, rtsp, onPlay, isAudio = false }) {
    this.video = el;
    this.wsUri = wsUri;
    this.rtsp = rtsp;
    this.isaudio = isAudio;
    /*onPlay回调只会在视频开始播放后调用一次*/
    this.onPlay = onPlay;
    this.init();
    this.start()
  }

  init() {
    this.status = 0;
    this.checkCount = 0;
    this.buffer = [];
    this.sourceBuffer = null;
    this.mimeCodec = 'video/mp4; codecs="avc1.42E01E"';
    /*处理事件绑定得回调得作用域*/
    this.handleSourceOpen = this.onSourceopen.bind(this);
    this.handleMp42Buffer = this.mp4appendBuffer.bind(this);
    this.handleChange = this.onVisibilitychange.bind(this);
    document.removeEventListener("visibilitychange", this.handleChange);
    document.addEventListener("visibilitychange", this.handleChange);
    // console.log(this.video, this.wsUri, this.rtsp);
  }

  start() {
    // console.log("video start");
    this.status = 0;
    this.checkCount = 0;
    clearInterval(this.IntervalReconect);
    clearInterval(this.IntervalKeepAlive);
    if (this.isaudio) {
      this.mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    }
    let MediaSource = window.MediaSource || window.WebKitMediaSource;
    if (MediaSource.isTypeSupported(this.mimeCodec)) {
      if (!this.mediaSource) {
        this.mediaSource = new MediaSource();
      }
      this.video.autoplay = true;
      this.video.src = URL.createObjectURL(this.mediaSource);
      this.video.play();
      this.mediaSource.removeEventListener("sourceopen", this.handleSourceOpen);
      this.mediaSource.addEventListener("sourceopen", this.handleSourceOpen);
      this.mediaSource.onsourceclose = this.onMediaSourceClose.bind(this);
    } else {
      console.error("Unsupported MIME type or codec: ", this.mimeCodec);
    }
  }

  onSourceopen() {
    this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec);
    this.mediaSource.duration = Infinity;
    this.sourceBuffer.removeEventListener("updateend", this.handleMp42Buffer);
    this.sourceBuffer.addEventListener("updateend", this.handleMp42Buffer);
    this.initWebSocket();
  }
  onMediaSourceClose() {
    this.sourceBuffer.removeEventListener("updateend", this.handleMp42Buffer);
  }
  initWebSocket() {
    this.websocket = new WebSocket(this.wsUri);
    this.websocket.binaryType = "arraybuffer";
    this.websocket.onopen = this.onOpen.bind(this);
    this.websocket.onmessage = this.onMessage.bind(this);
    this.websocket.onerror = this.onError.bind(this);
    this.websocket.onclose = this.onClose.bind(this);
  }

  stop(callback) {
    clearInterval(this.IntervalReconect);
    clearInterval(this.IntervalKeepAlive);
    if (this.mediaSource) {
      this.mediaSource.removeEventListener("sourceopen", this.handleSourceOpen);
    }
    if (this.websocket) {
      this.websocket.close(1000);
    }
    typeof callback === "function" && callback();
  }
  unbindEvents() {
    this.mediaSource.removeEventListener("sourceopen", this.handleSourceOpen);
    document.removeEventListener("visibilitychange", this.handleChange);
  }
  destory() {
    this.stop();
    this.unbindEvents();
    this.websocket.onopen = null;
    this.websocket.onmessage = null;
    this.websocket.onerror = null;
    this.websocket.onclose = null;
    this.websocket = null;
    this.sourceBuffer = null;
    this.mediaSource = null;
  }
  onOpen() {
    console.log("websocket CONNECTED");
    this.websocket.send(this.rtsp);
    clearInterval(this.IntervalKeepAlive);
    this.IntervalKeepAlive = setInterval(() => {
      this.sendControlMessgae();
    }, 1000);
  }

  onMessage(msg) {
    console.log("websocket onMessage");
    this.buffer.push(msg.data);
    this.mp4appendBuffer();
    if (this.onPlay && typeof this.onPlay === "function") {
      this.onPlay();
      this.onPlay = null;
    }
  }

  onClose(evt) {
    console.log("websocket DISCONNECTED", this.websocket.readyState);
    clearInterval(this.IntervalReconect);
    clearInterval(this.IntervalKeepAlive);
    this.status = 0;
    this.checkCount = 0;
    try {
      this.mediaSource && this.mediaSource.endOfStream();
      this.video && this.video.pause();
    } catch (e) {
      console.log(e);
    }
    if (evt.code != 1000) {
      clearInterval(this.IntervalReconect);
      this.IntervalReconect = setInterval(() => {
        console.log("start RECONNECTED");
        this.start();
      }, 3000);
    }
  }

  onError() {
    console.log("websocket onError");
    this.onClose.bind(this);
  }

  mp4appendBuffer() {
    if (this.sourceBuffer) {
      if (this.buffer.length > 0 && !this.sourceBuffer.updating) {
        try {
          let t = this.buffer.shift();
          let s = new Uint8Array(t);
          this.sourceBuffer.appendBuffer(s);
        } catch (t) {
          this.websocket.close();
          console.log(t);
        }
      }
    } else {
      console.log(this.sourceBuffer, "sourceBuffer is null or undefined");
    }
  }

  sendControlMessgae() {
    try {
      if (
        this.sourceBuffer &&
        this.sourceBuffer.buffered &&
        this.sourceBuffer.buffered.length <= 0
      ) {
        this.checkCount++;
        if (this.checkCount > 10) {
          console.log("checkSourceBuffer Close");
          this.websocket.close();
        }
      } else {
        this.checkCount = 0;
        let len = this.video.buffered.length;
        if (len < this.buffer.length) {
          len = this.buffer.length;
        }
        if (len < this.sourceBuffer.buffered.length) {
          len = this.sourceBuffer.buffered.length;
        }
        this.sourceBuffer.buffered.start(0);
        let end = this.sourceBuffer.buffered.end(0);
        let len2 = end - this.video.currentTime;
        let s = (len > len2 ? len : len2) * 1000;
        let json = { status: this.status, sleeptime: s };
        // if (s > 5000) {
        //   console.log(json);
        // }
        this.websocket.send(JSON.stringify(json));
      }
    } catch (e) {
      console.error(e);
    }
  }

  onVisibilitychange() {
    /**
     * status 0:online,1:offline;
     */
    // console.log("onVisibilitychange:", this.websocket.readyState);
    if (this.websocket.readyState == 0 || this.websocket.readyState == 1) {
      if (document.visibilityState === "hidden") {
        this.status = 1;
        let json = { status: 1 };
        this.websocket.send(JSON.stringify(json));
      } else {
        if (this.sourceBuffer) {
          let len = this.sourceBuffer.buffered.end(0) - this.video.currentTime;
          if (len > 60) {
            console.log("检测当前浏览器为开启状态 len>60 close");
            this.websocket.close();
            return;
          }
          this.status = 0;
          let json = { status: 0 };
          this.websocket.send(JSON.stringify(json));
        }
      }
    }
  }
}
export default videoTool;
