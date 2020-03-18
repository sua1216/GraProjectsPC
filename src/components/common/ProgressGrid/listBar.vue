<template>
	<div class="listbar" :style="{border:'2px solid '+bdcolor,boxShadow:'0 0 10px '+bdcolor}">
		<div class="realbars" :style="{minHeight: ratio+'%',maxHeight:ratio+'%',
			background:`linear-gradient(to bottom, ${color} , ${tozero})`,
			boxShadow:'0 0 10px '+shadowcolor}"></div>
		<div class="lines-bar" :style="{background:bdcolor}"></div>
		<div class="bar-fake"></div>
	</div>
</template>

<script>
	export default {
		name: "listBar",
		props:['color','ratio'],
		data:function(){
		    return {
		        bdcolor:'',
				tozero:'',
			    shadowcolor:''
		    }
		},
		mounted() {
			this.init()
		},
		methods:{
		    init(){
			    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.color);
			    this.shadowcolor = result ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},0.4)` : null;
			    this.bdcolor = result ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},0.2)` : null;
			    this.tozero = result ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},0)` : null;
		    }
		},
	}
</script>

<style scoped lang="scss">
.listbar{
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column-reverse;
	.realbars{
		width: 40%;
		align-self: center;
	}
	.lines-bar{
		height: 2px;
		width: 100%;
	}
	.bar-fake{
		width: 40%;
		align-self: center;
		flex: 1;
		background:rgba(255,175,104,1);
		opacity:0.05;
	}
}
</style>