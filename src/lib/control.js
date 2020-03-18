/*
* 这个控制器  解决了
* 1.3d 都需要控制map或者别的业务，  在这里 统一 控制map              （three的On格林华城的点击）
* 2.业务中  需要控制  obj， 通过这里控制 obj          （map的Onzoom模型的消失隐藏）                  (注意函数调用，事件注入的选择)
* 3.不同的业务  的  3d, obj 差别。  不靠业务去定义， 在这里统一控制注入     （obj模型加载哪些）
* 4.control除了 业务的判断，应该没有别的逻辑了。只是为了修改相互羁绊的代码的时候不用改起来那么复杂。也更好找
* */

import threebox from "@/lib/threebox.js";
import threeobj from "@/lib/threeobj.js";
import flyTo from "@/lib/flyTo.js";

export default class Control {


	// static ControlInstance;
	constructor(){
		// if(Control.ControlInstance !== undefined){
		// 	return Control.ControlInstance;
		// }else{
		// 	Control.ControlInstance = this;
		// }

		this.eventFn = {
			zoomFn:{global:[]},
			moveendFn:{global:[]},
			clickFn:{global:[]},
			moveFn:{global:[]}
		};
	}


	init(map,threeDom,cb,vue){
		for (let i in map){
			this[i] = map[i];
		}
		// todo  加载模型的逻辑   加载一个就 上一个。  不等全部了
		// this.model = new XBObjects();
		this.three =  new threebox(threeDom,this.map);
		this.object =  new threeobj(this.three,vue);
		this.flyTo = new flyTo(this);

		this.three.init(this.object);

		if(cb){
			cb()
		}

		this.object.init(() => {
			//再去 加载 不重要的模型
			// this.model.initAllObjects(objArr,() => {
			// 	this.three.initAfterObj();
			// });
		});

	}




	_changeBuiness(Buiness,dom){
		this.buiness = Buiness.replace(/\//g,"_")

		// console.log(dom);

		for(let i in this.eventFn){
			for(let j in this.eventFn[i]){
				if( j !== this.buiness  &&   j !== 'global'){
					this.eventFn[i][j] = [];
				}
			}
		}


		// if( this.buiness === 'zhifa'){
		// 	dom.show();
		// }else if( this.buiness  === 'wggl' ){
		// 	dom.show();
		// }else{
		// 	dom.hide();
		// }

	}


	initDeck(){

		// let xbDeck = new XBDeckGL("deckgl-overlay",this.map);
		// this.xbTripsLayer = new XBTripsLayer();
		// xbDeck.setLayers(this.xbTripsLayer);
		// xbDeck.render();

		// this.gui.addFolder("车流");
		// add(this.xbTripsLayer,"width",0,10).name("一级路宽度");
		// add(this.xbTripsLayer,"speed",0,10).name("速度");
		// add(this.xbTripsLayer,"trailLength",0,600).name("尾巴长度");
		// addColor(this.xbTripsLayer,"lineColor").name("一级路颜色");
		// addColor(this.xbTripsLayer,"lineColor2").name("二级路颜色");
	}


	_zoomend(e){
		this._do('zoomFn',e);
	}

	_move(e){
		this._do('moveFn',e);
	}


	_moveend(e){
		this._do('moveendFn',e);
	}

	_click(e){
		this._do('clickFn',e);

	}

	_do(event,e){
		for(let i in this.eventFn[event]){
			if( i === this.buiness  ||   i === 'global'){
				for(let j in this.eventFn[event][i]){
					(this.eventFn[event][i][j](e,this.map))
				}
			}
		}
	}



	onClick(fn,route){
		this._on('clickFn',fn,route)
	}

	onMove(fn,route){
		this._on('moveFn',fn,route)
	}


	onMoveend(fn,route){
		this._on('moveendFn',fn,route)
	}

	onZoom(fn,route){
		this._on('zoomFn',fn,route)
	}

	_on(event,fn,route){
		if( route ){
			let buiness  = route.replace(/\//g,"_");
			if(!this.eventFn[event][buiness]){
				this.eventFn[event][buiness] = [];
			}
			this.eventFn[event][buiness].push(fn)

		}else{
			this.eventFn[event]['global'].push(fn)
		}
	}



	trackPeople(track){
		this.three.trackPeople(track);
	}

	removeTrack(){
		this.three.removeTrack();
	}

}
