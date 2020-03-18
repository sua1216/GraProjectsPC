<template>
	<div v-if="cengji < 4">
	<div class="listbtns" :style="'grid-template-rows:repeat('+data.length+',40px);'+setStyles()">
		<cornerImg size="6" color="rgba(248, 24, 13, .7)" class="corner"></cornerImg>
		<div class="lines" v-for="(val,key) in data" @click="emitClick(key)" v-bind:key="'btnline'+key" :class="val.hideCheckbox ? 'hideCheckbox' : ''">
			<div class="fakecheckbox" :class="{checked:val.isChecked}"></div>
			<div class="namebox" :class="val.icon ? val.icon + '-icon icon' : ''">{{val.name}}</div>
			<div class="wordbox" v-if="val.word">{{val.word}}</div>
		</div>
	</div>
	</div>
</template>

<script>
	import Cornerimg from "../../common/CornerImg/Cornerimg.vue";
	export default {
		name: "MapListBtn",
		props:['data','position','cengji'],
		components:{
			cornerImg:Cornerimg,
		},
		methods:{
			emitClick(key){
				this.$emit('listBtn',key)
			},
			setStyles(){
				if(this.position){
					let sty = '';
					for(let i in this.position){
						sty += i+':'+this.position[i]+';';
					}
					return sty
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.corner{
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 0;
}
.listbtns{
	display: grid;
	width:290px;
	position: absolute;
	bottom: 50px;
	right: 700px;
	padding: 10px;
	padding-right: 20px;
	background:rgba(199,199,199,0.2);
	transition: all 1s;
}
.lines{
	height: 30px;
	align-items: center;
	align-self: center;
	display: grid;
	cursor: pointer;
	grid-template-rows: 100%;
	grid-template-columns: 40px 1fr auto;
	grid-column-gap: 15px;
	&.hideCheckbox{
		padding-left: 15px;
		.fakecheckbox{
			display: none;
		}
	}
}
.fakecheckbox{
	width: 17px;
	height: 17px;
	background: rgba(62,39,4,0.65);
	border: 1px solid rgba(248, 24, 13, 1);
	border-radius: 2px;
	align-self: center;
	justify-self: center;
	position: relative;
	z-index: 1;
}
.checked{
	background: url("../../../assets/common/images/ZuZhiJianShe/Hook.png") center no-repeat;
}
.namebox,.wordbox{
	font-size:20px;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(254,255,254,1);
	line-height:30px;
	opacity:0.7;
	text-shadow: 0 0 10px #000;
	word-break: keep-all;
}
.icon{
	padding-left: 12px;
	position: relative;
	&:after{
		content: "";
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		left: -8px;
		top: 12px;
	}
	&.blue-icon:after{
		background-color: #2FA9B6;
		box-shadow: 0 0 6px 2px #2FA9B6;
	}
	&.yellow-icon:after{
		background-color: #F8FF31;
		box-shadow: 0 0 6px 2px #F8FF31;
	}
	&.red-icon:after{
		background-color: #FF4031;
		box-shadow: 0 0 6px 2px #FF4031;
	}
	&.green-icon:after{
		background-color: #31FF8D;
		box-shadow: 0 0 6px 2px #31FF8D;
	}
	&.pink-icon:after{
		background-color: #da1a5c;
		box-shadow: 0 0 6px 2px #da1a5c;
	}
}
	</style>