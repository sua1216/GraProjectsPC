<template>
	<div class="rollingNum" :num="nowNum">
		<div class="numbox" :class="{upToCenterHide:startAni}" style="transform-origin: center bottom;transform: rotateX(0deg);">
			<div class="num" :style="{color:lastNum==0?'rgba(255,255,255,.3)':lastNum>10?'#FF6904':'#62C9F4'}">{{topNowNum}}</div>
		</div>
		<div class="numbox" :class="{downToHide:startAni}" style="transform-origin: center top;">
			<div class="num downNum" :style="{color:lastNum==0?'rgba(255,255,255,.3)':lastNum>10?'#FF6904':'#62C9F4'}">{{bottomNowNum}}</div>
		</div>

		<div class="numbox" :class="{CenterToUpShow:startAni}" style="transform-origin: center top;position: absolute;top: 0;">
			<div class="num" :style="{color:netxNum==0?'rgba(255,255,255,.3)':netxNum>10?'#FF6904':'#62C9F4'}">{{topNextNum}}</div>
		</div>
		<div class="numbox" :class="{CenterToDownShow:startAni}" style="transform-origin: center top;position: absolute;top: 40px;transform: rotateX(-90deg);">
			<div class="num downNum" :style="{color:netxNum==0?'rgba(255,255,255,.3)':netxNum>10?'#FF6904':'#62C9F4'}">{{bottomNextNum}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RollCardStyle",
		props:['nowNum'],
		data:function(){
		    return {
				topNowNum:'',
				bottomNowNum:'',
				topNextNum:'',
				bottomNextNum:'',
				lastBottomNum:'',
				netxNum:'',
				lastNum:'',
				startAni:false,
		    }
		},
		watch:{
			nowNum:function(newval){
				this.netxNum = newval;
				this.topNextNum = newval;
				this.bottomNextNum = newval;
				this.startAni=true;
				setTimeout(()=>{
				    this.startAni=false;
					this.topNowNum = newval;
					this.bottomNowNum = newval;
					this.lastNum = newval;
				},1000)
			}
		},
		mounted:function(){
			this.topNowNum = this.nowNum;
			this.bottomNowNum = this.nowNum;
			this.lastNum = this.nowNum;
		},
		methods:{

		}
	}
</script>

<style scoped lang="scss">
.rollingNum{
	width: 135px;
	height: 80px;
	position: relative;
}
.numbox{
	width: 100%;
	height: 40px;
	overflow: hidden;
	position: relative;


}
.num{
	height: 80px;
	width: 100%;
	text-align: center;
	font-size:50px;
	font-family:FuturaBT-Medium;
	font-weight:bold;
	color:rgba(98,201,244,1);
	position: absolute;
	&:after{
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: url("../../../assets/common/images/ZongHeTaiShi/bg_bg_realtime.png") center no-repeat;
		background-size: 100%;
		filter:blur(1px);
	}
}
.downNum{
	top: -40px;
}

.upToCenterHide{
	animation: upToCenterHide .5s linear;
	animation-fill-mode: forwards;
}
.CenterToDownShow{
	animation: CenterToDownShow .5s linear .5s;
	animation-fill-mode: forwards;
}
.CenterToUpShow{
	animation: CenterToUpShow .5s linear;
	animation-fill-mode: forwards;
}
.downToHide{
	animation: downToHide .5s linear .5s;
	animation-fill-mode: forwards;
}
@keyframes upToCenterHide {
	0% {
		transform:perspective(250px) rotateX(0deg);
	}
	100%{
		transform:perspective(250px) rotateX(-90deg);
	}
}

@keyframes CenterToDownShow {
	0% {
		transform:perspective(250px) rotateX(-270deg);
	}
	100%{
		transform:perspective(250px) rotateX(-360deg);
	}
}

@keyframes CenterToUpShow {
	0% {
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

@keyframes downToHide {
	0% {
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}


*{}
</style>