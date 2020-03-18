<template>
    <div class="pt-lvmaoozi" @mouseenter="isOnHover(true)" @click="showPerson" @mouseleave="isOnHover(false)">
        <transition name="fade">
            <div class="pt-svg" v-if="showLight">
                <svg>
                    <!--<defs>-->
                    <!--<filter id="blur">-->
                    <!--<feGaussianBlur stdDeviation="2"></feGaussianBlur>-->
                    <!--</filter>-->
                    <!--</defs>-->
                    <path d="M10,0l-10,300l20,0" fill="RGBA(44, 170, 121, .5)" filter="">
                    </path>
                </svg>
                <div class="rect-container">
                    <div class="rect"></div>
                    <div class="rect"></div>
                    <div class="rect"></div>
                    <div class="rect"></div>
                    <div class="rect"></div>
                    <div class="rect"></div>
                    <div class="rect"></div>
                    <div class="rect"></div>
                    <div class="rect"></div>
                    <div class="rect"></div>
                </div>
            </div>
        </transition>
        <div class="statusChange"></div>
        <div class="namebox1" :title="d.id"></div>
        <div class="pt-lvcircle"></div>
        <div class="pt-triangle" v-if="showType==3"></div>
        <div class="pt-disk" v-if="showType==3"></div>
    </div>
</template>

<script>
    import mapFun from '../../../../lib/mapFun.js'
    export default {
        name: "WanggezhangMarker2",
        props:['d','path','parent','marker'],
        data:function(){
            return {
                mapZoom:0,
                showLight:false,
                showType:1,
                // isHover:false,
                mapFunObj:null
            }
        },
        watch:{
            mapZoom:{
                handler:function(newval){
                    if(newval<14){
                        this.showType = 1;
                    }else if(newval>14&&newval<16){
                        this.showType = 2;
                    }else if(newval>16){
                        this.showType = 3;
                    }
                },
                immediate:true
            }
        },
        mounted() {
            //this.mapZoom = this.$store.state.baseMap.getZoom();
            //this.fakeStart();
            //this.setMapZoomEnd();
        },
        methods:{
            mapTrack(){
                // this.mapFunObj = new mapFun(this.parent.control);
                // let track = this._makeTrack([118.70409289131328,33.71226162291278]);
                // this.mapFunObj.createTrack(track);
            },
            _makeTrack(begin){
                // let trackArr = [begin];
                // for (let i = 0; i < 20; i++) {
                //     let lastPoint = JSON.parse(JSON.stringify(trackArr[trackArr.length-1]));
                //     let offset = Math.round(Math.random()*10) - Math.round(Math.random()*10);
                //     let offset2 = Math.round(Math.random()*10) -Math.round(Math.random()*10);
                //     lastPoint[0] += offset/2000 ;
                //     lastPoint[1] += offset2/2000 ;
                //     trackArr.push(lastPoint);
                // }
                // let ysRoadData = [
                //     [118.70409289131328,33.71226162291278],
                //     [118.70827954652958,33.7120274167559],
                //     [118.70873119114555,33.71475798900988],
                //     [118.70873119114555,33.71475798900988],
                //     [118.70489739188906,33.715155668216255]
                // ]
                // return [
                //     [begin[0],begin[1]],
                //     ysRoadData
                // ]

            },
            mapFlyTo(){
                // this.parent.control.map.flyTo({
                //     // center:[this.d.lnglat[0],this.d.lnglat[1]],
                //     //暂时设置一个演示用的center
                //     center:[118.70409289131328,33.71226162291278],
                //     zoom:17.5,
                //     bearing:16,
                //     pitch:51,
                //     speed:0.8
                // })
            },

            setPopup(){
                // this.showLight = true;
                // setTimeout(()=>{
                //     this.showLight = false
                // },4000)
            },
            fakeStart(){
                // let timer = setInterval(()=>{
                //     this.setPopup();
                //     clearInterval(timer)
                //     this.fakeStart()
                // },this.$tool.random(4000,20000))
            },
            // setMapZoomEnd(){
            // 	this.$store.state.baseMap.onZoom((e)=>{
            // 		this.mapZoom = e.target.getZoom()
            // 	},this.path)
            // },
            isOnHover(status){
                // this.isHover=status;
                // if(status){
                //     this.marker.getElement().style.zIndex=14;
                // }else{
                //     this.marker.getElement().style.zIndex='unset';
                // }
            },
            showPerson(){
                // this.$Tooltips({
                // 	tooltipOption:{
                // 		type:'nomask',
                // 		styles:{
                // 			'tooltips-holder':{
                // 				'pointer-events':'auto'
                // 			}
                // 		}
                // 	},
                // 	props:{
                // 		id:123,
                // 		type:2
                // 	},
                // 	render:(h)=>{
                // 		return h(PersonDetail)
                // 	}
                // })
                // this.mapTrack()
                // this.mapFlyTo()
                // this.parent.goPersonDetail(this.marker,this)
            }
        },
    }
</script>

<style scoped>
    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
    .fade-enter-to,fade-leave{
        opacity: 1;
    }
    .fade-enter-active,.fade-leave-active{
        transition: all 1s;
    }

    .pt-lvmaoozi .titlebox{
        position: absolute;
        height: 300px;
        width: 180px;
        display: none;
        flex-direction: column-reverse;
        justify-content: flex-start;
        top: -300px;
        transform: translateX(-50%);
        left: 50%;
    }
    .pt-lvmaoozi{
        /*width: 180px;*/
    }

    .numbox1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 50px;
        text-align: center;
        position: relative;
        top: 0px;
        padding: 0 5px;
    }

    .pt-lvmaoozi .namebox1,.pt-lvmaoozi .namebox2,.pt-lvmaoozi .namebox3,.pt-lvmaoozi .namebox5,.pt-lvmaoozi .namebox8{
        height: 40px;
        /*background:rgba(10,45,27,0.9);*/
        /*border:1px solid rgba(39,235,132,1);*/
        /*border-radius:6px;*/
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:20px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(255,233,222,1);
        margin: 5px auto;
        width: 100%;
    }
    .pt-lvmaoozi .namebox1{
        position: relative;
        top: 76px;
        width: 0;
        height: 50px;
        border-width: 50px 4px 0px 4px;
        border-style: solid;
        border-color: #D9D33C transparent transparent transparent;
    }
    .pt-lvmaoozi .namebox4,.pt-lvmaoozi .namebox7,.pt-lvmaoozi .namebox9,.pt-lvmaoozi .namebox6{
        height: 50px;
        background: rgba(38,10,1,0.9);
        border:1px solid rgba(236,71,31,1);
        border-radius:6px;
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:20px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(255,233,222,1);
        margin: 5px auto;
        width: 100%;
    }
    .pt-lvmaoozi .pt-triangle {
        margin: 0 auto;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 40px 2px 0 2px;
        border-color: rgba(38,240,133,.7) transparent transparent transparent;
    }
    .pt-lvmaoozi .pt-lvcircle{
        cursor: pointer;
        width: 20px;
        height: 20px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(38,240,133,.7);
        background: url("../../../../../public/images/yishouli.png") no-repeat center;
        background-size: 20px 20px;
    }

    .pt-lvmaoozi .pt-disk{
        width: 68px;
        height: 68px;
        margin: 0 auto;
        margin-top: -30px;
        border-radius: 34px;
        transform: rotateX(60deg);
        background: rgba(38,240,133,.1);
        border: 1px dotted #26F085;
    }
    .pt-svg{height:300px;width:20px;position:absolute;top:-300px;left:50%;margin-left:-10px;}
    .pt-svg svg{width:20px;height:300px;animation: svg 1s linear infinite alternate;transform-origin:50% 100%;}
    @keyframes svg {
        from{transform:scale(.5,.5)}
        to{transform:scale(1,1)}
    }
    .pt-svg .rect-container{display:flex;justify-content: space-around;width:20px;}
    .pt-svg .rect-container .rect{width:2px;height:2px;background:#8fffc6;opacity:.2;transform:skew(50deg, 50deg)}
    .pt-svg .rect-container .rect:nth-child(1){animation:one 1.5s linear infinite .1s}
    .pt-svg .rect-container .rect:nth-child(2){animation:two 1.7s linear infinite .2s}
    .pt-svg .rect-container .rect:nth-child(3){animation:three 1.8s linear infinite .3s}
    .pt-svg .rect-container .rect:nth-child(4){animation:four 1.9s linear infinite .4s}
    .pt-svg .rect-container .rect:nth-child(5){animation:five 1.8s linear infinite .5s}
    .pt-svg .rect-container .rect:nth-child(6){animation:six 1.7s linear infinite .6s}
    .pt-svg .rect-container .rect:nth-child(7){animation:seven 1.6s linear infinite .7s}
    .pt-svg .rect-container .rect:nth-child(8){animation:eight 1.5s linear infinite .8s}
    .pt-svg .rect-container .rect:nth-child(9){animation:nine 1.4s linear infinite .7s}
    .pt-svg .rect-container .rect:nth-child(10){animation:ten 1.3s linear infinite .2s}

    @keyframes one {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(10px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes two {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(10px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes three {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{oapcity:.5}
        100%{transform:translate(8px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes four {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(6px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes five {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(4px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes six {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(2px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes seven {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(0px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes eight {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(-6px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes nine {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(-8px,-200px) scale(1,20);opacity:.2}
    }
    @keyframes ten {
        0%{transform:translate(0px,0px) scale(1,1);opacity:.5}
        50%{opacity:.5}
        100%{transform:translate(-10px,-200px) scale(1,20);opacity:.2}
    }
</style>