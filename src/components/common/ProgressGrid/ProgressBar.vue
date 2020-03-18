<template>
	<div class="progress">
		<div class="colorBar" :zz="style" :style="style"></div>
		<div class="barblocker" :style="{background:this.lighter}"></div>
		<div class="barline"></div>
	</div>
</template>

<script>
	export default {
		name: "ProgressBar",
		data:function(){
		    return {
				rgba0:'',
				rgba1:'',
				lighter:''
		    }
		},
		props:['color','ratio'],
		mounted(){
			this.init()
		},
		computed:{
			style:function(){
			    return this.init()
			}
		},
		methods:{
			init(){
				this.lighter = this.LightenDarkenColor(this.color,20);
				this.rgba0 = this.hexToRgba(this.color,0.04);
				this.rgba1 = this.hexToRgba(this.color,1);
				let res = this.setWidth();
				res += `background: linear-gradient(to right, ${this.rgba0} , ${this.rgba1});`;
				return res
			},
			setWidth(){
				return `min-width:${this.ratio}%;max-width:${this.ratio}%;`
			},
			hexToRgba(hex,ratio) {
				var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                console.log(result);
                return result ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${ratio})` : null;

			},
			LightenDarkenColor(col, amt) {
				var usePound = false;
				if (col[0] == "#") {
					col = col.slice(1);
					usePound = true;
				}
				var num = parseInt(col,16);
				var r = (num >> 16) + amt;
				if (r > 255) r = 255;
				else if (r < 0) r = 0;
				var b = ((num >> 8) & 0x00FF) + amt;
				if (b > 255) b = 255;
				else if (b < 0) b = 0;
				var g = (num & 0x0000FF) + amt;
				if (g > 255) g = 255;
				else if (g < 0) g = 0;
				return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
			}
		},
	}
</script>

<style scoped lang="scss">
.progress{
	width: 100%;
	height: 100%;
	display: flex;
	.barblocker{
		width: 8px;
	}
	.barline{
		height: 2px;
		background: rgba(255,255,255,0.15);
		flex: 1;
		align-self: center;
	}
}
</style>