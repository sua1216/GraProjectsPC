<template>
	<div class="generalSvg" :style="{width:prm.width ? prm.width + 'px':100+'px',height:prm.width ? prm.width + 'px':100 + 'px'}">
		<svg :width="prm.width ? prm.width:100" :height="prm.width ? prm.width:100" class='svg'>
			<!-- 外圈圆 -->
			<circle :cx="prm.width/2" :cy="prm.width/2" :r="(prm.width/2)-(prm.isInequality ? prm.borderWidth:prm.borderWidth)/2" :stroke="prm.bottomBgColor ? prm.bottomBgColor:'#3C3C3C'" :stroke-width="prm.isInequality ? prm.borderWidth:prm.borderWidth" fill="none" />
			<!-- 内圈圆，虚线用于展示进度 -->
			<circle :cx="prm.width/2" :cy="prm.width/2" :r="(prm.width/2)-(prm.isInequality ? prm.borderWidth:prm.borderWidth)/2" :stroke="prm.bgColor ? prm.bgColor:'#FFFC00'" :stroke-width="prm.isInequality ? prm.borderWidth:prm.borderWidthNq" fill="none" :stroke-dasharray='dashArrayWidth.end'>
				<!-- svg动画 -->
				<animate attributeName="stroke-dasharray" :from="dashArrayWidth.start" :to="dashArrayWidth.end" dur="1s"/>
				<!--<animate attributeName="stroke" from="#ff0000" to="#53d74c" dur="1s" />-->
			</circle>
		</svg>
		<div class="svgTitle" v-if="prm.isTitle" :style="{fontSize:(prm.fontSize ? prm.fontSize:27)+ 'px',display:'flex','align-items':'baseline'}"><span style="font-weight: bold;">{{num}}</span><span style="font-size:11px">%</span></div>
	</div>
</template>

<script>
	export default {
		name: "EasySvgCircle",
		props: {
			num:[Number,String],
			prm:Object
		},
		computed: {
			dashArrayWidth: function () {
				//计算半径
				let r = (this.prm.width/2)-(this.prm.isInequality ? this.prm.borderWidth:this.prm.borderWidth)/2;
				//计算周长
				let line = 2 * Math.PI * r;
				return {
					//stork-dasharray有两个参数，第一个代表虚线的宽度，第二个代表虚线两两的间隔
					start: '0,' + line,//开始状态
					end: line * (this.num / 100) + ',' + line * ((100 - this.num) / 100)//结束状态
				}
			}
		}
	}
</script>

<style scoped>
	.generalSvg{
		position: relative;
	}
	.generalSvg .svg{
		transform: rotate(-90deg);
	}
	.generalSvg .svgTitle{
		display: flex;
		position: absolute;
		left: 50%;
		top: 50%;
		font-size: 27px;
		transform: translate(-50%,-50%);
	}
</style>