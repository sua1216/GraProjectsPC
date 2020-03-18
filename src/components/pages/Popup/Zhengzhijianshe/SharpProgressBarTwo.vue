<template>
    <div  class="sharp-progress-bar">
        <div class="title">
            <h1>{{title}}</h1>
        </div>
        <svg>
            <g>
                <defs>
                    <linearGradient id="gradient1" x1="0%" x2="100%">
                        <stop offset="0" style="stop-color:#F70028;stop-opacity:.3"></stop>
                        <stop offset="1" style="stop-color:#F70028;stop-opacity:1"></stop>
                    </linearGradient>
                </defs>
                <text x="30" y="20" text-anchor="middle" dominant-baseline="middle" fill="white"><!--{{d&&d[0].month}}-->6月</text>
                <path :d="top" fill="url(#gradient1)"></path>
                <text x="270" y="20" text-anchor="middle" dominant-baseline="middle" fill="white">5236</text>
            </g>
            <g>
                <defs>
                    <linearGradient id="gradient2" x1="0%" x2="100%">
                        <stop offset="0" style="stop-color:#FFFFFF;stop-opacity:.3"></stop>
                        <stop offset="1" style="stop-color:#FFFFFF;stop-opacity:1"></stop>
                    </linearGradient>
                </defs>
                <text x="30" y="60" text-anchor="middle" dominant-baseline="middle" fill="white"><!--{{d&&d[1].month}}-->5月</text>
                <path :d="bottom" fill="url(#gradient2)"></path>
                <text x="270" y="60" text-anchor="middle" dominant-baseline="middle" fill="white">163131</text>
            </g>
        </svg>
    </div>
</template>
<script>
    export default {
        name:'sharp-progress-bar',
        props:{
            width:Number,
            height:Number,
            title:String,
            d:Array
        },
        //计算路径
        //最长的路径为
        computed:{
            max(){
                if(this.d){
		            return this.d[0].num - this.d[1].num > 0 ? this.d[0].num : this.d[1].num
				}else{
            		return false
				}
            },
            top(){
            	if(this.d){
		            return `
						M60,15
						l${this.width * this.d[0].num / this.max},0
						l10,10,
						l${-this.width * this.d[0].num / this.max - 10} ,0
					`
				}else{
            		return false
				}
            },
            bottom(){
            	if(this.d){
		            return `
						M60,55
						l${this.width * this.d[1].num / this.max},0
						l10,10,
						l${-this.width * this.d[1].num / this.max - 10} ,0
					`
				}else{
            		return false
				}

            }
        }
    }
</script>
<style lang="scss" scoped>
    .sharp-progress-bar{
        display: flex;height:85px;
        div.title{
            width:85px;height:85px;color:white;
            h1{margin:0;font-size:24px;text-align: center;width:50px;margin:0 auto;display: flex;margin-top:8px;}
        }
        svg{
            height:85px;width:310px;
            path{
                animation: sharp-path .5s linear;
            }
            text{font-weight: bold;}
        }
    }
    @keyframes sharp-path {
        from{transform: scale(0,1)}
        to{transform:scale(1,1)}
    }

</style>