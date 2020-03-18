<template>
	<div class="KeyAreaPointer" @mouseenter="isHover=true" @click="goCloser" @mouseleave="isHover=false">
		<div class="p" :class="{popup:popup}">上报 +1</div>
		<div class="blocks" v-show="showType!=3||isHover" :style="{background:normalbg}">
			<cornerimg :size="12" type="sharp" :color="normalcolor"></cornerimg>
			<div class="title">{{d.name}}</div>
			<div class="caseHigh" v-if="mode==3">
				<span class="tit">高发类型</span>
				<span class="val">{{d.highCase}}</span>
			</div>
			<div class="gridlist">
				<div class="gdlist1">
					<div class="dot-gry"></div>
					<div class="name">案件量：</div>
					<div class="value">{{d.case}}</div>
				</div>
				<div class="gdlist2">
					<div class="dot-red"></div>
					<div class="name">未结案：</div>
					<div class="value">{{d.noEndCase}}</div>
				</div>
				<div class="gdlist1">
					<div class="dot-gry"></div>
					<div class="name">市民投诉： </div>
					<div class="value">{{d.CitizenComplaints}}</div>
				</div>
				<div class="gdlist2">
					<div class="dot-red"></div>
					<div class="name">未结案：</div>
					<div class="value">{{d.noEndCase2}}</div>
				</div>
			</div>
		</div>
		<div class="titlelarge" :class="{
						'titlelarge-red':showType==3&&mode==2,
						'titlelarge-green':showType==3&&mode==1
					}" v-show="showType==3&&!isHover">{{d.name}}</div>
		<div class="bodys">
			<div class="icons" :class="{'icons-red':isRed}">
				<div class="icons"
					 :class="{'icons-red':isRed,'icons-warn':mode==3,'icon-build':mode==2,'icon-bdreverse':mode==1}"></div>
			</div>
			<div class="triangles" :class="{'triangle-red':isRed}"></div>
			<div class="circle" :zoom="mapZoom" v-show="mapZoom>16"
				 :class="{'circle-red':isRed,'ani-spread':popup}"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "KeyAreaPointer",
		props:['d','path','parent','marker'],
		data:function(){
		    return {
		        popup:false,
				mode:1,
			    normalcolor:null,
				normalbg:null,
				normalicon:'',
			    isRed:false,
				mapZoom:0,
				showType:1,
				isHover:false,
		    }
		},
		watch:{
			mode:{
				handler:function(newval){
				    switch (newval){
						case 1:
							this.normalcolor = '#1FD489';
							this.normalbg = 'rgba(25,25,25,.9)';
							this.isRed = false;
							break;
						case 2:
							this.normalcolor = '#FF2C2B';
							this.normalbg = 'rgba(25,25,25,.9)';
							this.isRed = true;
							break;
						case 3:
							this.normalcolor = '#FF2C2B';
							this.normalbg = 'rgba(35,11,11,0.9)';
							this.isRed = true;
							break;
					}
				},
				immediate:true
			},
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
		components:{
			cornerimg:()=>import('@c/common/CornerImg/Cornerimg.vue')
		},
		mounted() {
			this.mode = this.d.mode;
			this.mapZoom = this.control.map.getZoom();
			this.fakeStart();
			this.setMapZoomEnd();
			this.marker.getElement().style.zIndex=10;
		},
		methods:{
		    setPopup(){
				this.popup = true;
				setTimeout(()=>{
				    this.popup = false
				},4000)
			},
			fakeStart(){
				let timer = setInterval(()=>{
					this.setPopup();
					clearInterval(timer)
					this.fakeStart()
				},this.$tool.random(4000,20000))
			},
			setMapZoomEnd(){
				this.control.onZoom((e)=>{
					this.mapZoom = e.target.getZoom()
				},this.path)
			},
			goCloser(){
				if(this.mode!=3){
					let index = 0;
					switch (this.d.name){
						case '泗阳县政府':
							index=1;
							break;
						case '开元名都大酒店':
							index=2;
							break;
						case '中央商场':
							index=3;
							break;
						case '众东城市之家':
							index=4;
							break
					}
					this.parent.target.btnOn=index
				}else{
					// if(!this.parent.isGanZhi){
					// 	return
					// }
					let center = this.marker._lngLat;
					this.parent.goToGFDW(this.d.name)
					this.control.map.flyTo({
						center,
						speed:0.8,
						zoom:16
					})
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.ani-spread{
		display: block!important;
		animation: spreading 4s linear forwards;
	}
	@keyframes spreading {
		0%{
			opacity: 0;
			transform: rotateX(15deg) scale(0.5);
		}
		25%{
			opacity: 1;
			transform: rotateX(15deg) scale(1);
		}
		75%{
			opacity: 1;
			transform: rotateX(15deg) scale(1.5);
		}
		100%{
			opacity: 0;
			transform: rotateX(15deg) scale(1.7);
		}
	}
.KeyAreaPointer{
	position: relative;
	cursor: pointer;
	.icons-warn{
		background: url("../../../../assets/common/images/TieMarker/z_icon_5.png") no-repeat center!important;
	}
	.icon-build{
		background: url("../../../../assets/common/images/TieMarker/z_icon_6.png") no-repeat center!important;
	}
	.icon-bdreverse{
		background: url("../../../../assets/common/images/TieMarker/z_icon_6.png") no-repeat center!important;
		transform: rotateY(180deg);
	}
	.titlelarge{
		padding: 10px 20px;
		background:rgba(10,45,27,0.9);
		border:1px solid rgba(39,235,132,1);
		border-radius:6px;
	}
	.titlelarge-red{
		background:rgba(38,11,1,0.8);
		border:1px solid rgba(236, 71, 31, 0.88);
		border-radius:6px;
	}
	.titlelarge-green{
		background:rgba(10,45,27,0.9);
		border:1px solid rgba(39,235,132,1);
		border-radius:6px;
	}
	.caseHigh{
		height: 15px;
		width: 100%;
		line-height: 40px;
		text-align: center;
		.tit{
			font-size:20px;
			font-family:MicrosoftYaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
			margin-right: 10px;
		}
		.val{
			font-size:20px;
			font-family:MicrosoftYaHei;
			font-weight:bold;
			color:rgba(255,255,255,1);
		}
	}
	.blocks{
		width: 320px;
		height: 150px;
		background:rgba(25,25,25,.9);
		padding-top: 24px;
		position: relative;
		.title{
			font-size:24px;
			font-family:MicrosoftYaHei-Bold;
			font-weight:bold;
			color:rgba(255,255,255,1);
			width: 100%;
			height: 24px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.gridlist{
			margin-top: 17px;
			height: 70px;
			width: 100%;
			display: grid;
			grid-template-rows: repeat(2,1fr);
			grid-template-columns: repeat(2,1fr);
			grid-column-gap: 10px;
			.dot-gry{
				width: 6px;
				height: 6px;
				background: rgba(255,255,255,.5);
				align-self: center;
				justify-self: center;
			}
			.dot-red{
				width: 6px;
				height: 6px;
				background: rgba(255, 97, 18,.5);
				align-self: center;
				justify-self: center;
			}
			.gdlist1{
				display: grid;
				align-items: center;
				grid-template-rows: 1fr;
				grid-template-columns: 20px 115px 30px;
			}
			.gdlist2{
				display: grid;
				align-items: center;
				grid-template-rows: 1fr;
				grid-template-columns: 20px 90px 30px;
			}
			.name{
				font-size:20px;
				font-family:MicrosoftYaHei;
				font-weight:400;
				color:rgba(255,255,255,.7);
				height: 20px;
				line-height: 20px;
				word-break: keep-all;
			}
			.value{
				height:20px;
				font-size:18px;
				font-family:FuturaStd-Heavy;
				font-weight:800;
				color:rgba(255,255,255,1);
				line-height:20px;
			}
		}
	}
	.bodys{
		width: 77px;
		height: 100px;
		margin: 0 auto;
		margin-top: 5px;
		position: relative;
		.icons{
			height: 42px;
			width: 42px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(6, 148, 75,0.8);
			border:1px solid rgba(42,255,143,1);
			border-radius:50%;
			margin: 0 auto;
			position: relative;
			z-index: 2;
		}
		.icons-red{
			border:1px solid #FF3F02;
			background: rgba(204, 52, 66,.8);
		}
		.triangles {
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 52px 3px 0 3px;
			border-color: #26EE84 transparent transparent transparent;
			margin: 0 auto;
			margin-top: -5px;
			position: relative;
			z-index: 1;
		}
		.triangle-red{
			border-color: #FF3202 transparent transparent transparent;
		}
		.circle{
			height: 42px;
			width: 84px;
			border: 1px solid #26EE84;
			border-radius: 50%;
			position: absolute;
			left: 50%;
			margin-left: -42px;
			bottom: -10px;
			transform: rotateX(15deg);
		}
		.circle-red{
			border: 1px solid #FF3202;
		}
	}
	.p{
		width:100%;
		height:30px;
		text-align: center;
		font-size:18px;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,233,222,1);
		position: absolute;
		top: 0;
		opacity: 0;
	}
	.popup{
		animation: popup 4s linear;
	}
	@keyframes popup {
		0%{
			transform: translateY(0);
			opacity: 0;
		}
		20%{
			transform: translateY(-100%);
			opacity: 1;
		}
		80%{
			transform: translateY(-100%);
			opacity: 1;
		}
		100%{
			transform: translateY(0);
			opacity: 0;
		}
	}
}
</style>