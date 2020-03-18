<template>
    <div class="compare-sharp-progress-bar">
        <div class="top flex">
            <p>{{title&&title.area}}</p>
            <p>
                <span>高发案件：</span>
                <span>{{title&&title.type}}</span>
            </p>
        </div>
        <div class="progress-bar">
            <svg>
                <defs>
                    <linearGradient x1="0" x2="1" id="gradient1">
                        <stop offset="0" style="stop-color:#C7C4C2;stop-opacity:0"></stop>
                        <stop offset="1" style="stop-color:#C7C4C2;stop-opacity:1"></stop>
                    </linearGradient>
                    <linearGradient x1="0" x2="1" id="gradient2">
                        <stop offset="0" style="stop-color:#E27D23;stop-opacity:0"></stop>
                        <stop offset="1" style="stop-color:#E27D23;stop-opacity:1"></stop>
                    </linearGradient>
                </defs>
                <path :d="totalPath" fill="url(#gradient1)"></path>
                <path :d="surface" fill="url(#gradient2)"></path>
            </svg>
        </div>
        <div class="bottom flex" >
            <p>
                <span></span>
                <span class="tit">{{d&&d[0]&&d[0].title}}:</span>
                <span class="val">{{d&&d[0]&&d[0].value}}</span>
            </p>
            <p>
                <span></span>
                <span class="tit">{{d&&d[0]&&d[1].title}}:</span>
                <span class="val">{{d&&d[0]&&d[1].value}}</span>
            </p>
            <p>
                <span></span>
                <span class="tit">{{d&&d[0]&&d[2].title}}:</span>
                <span class="val">{{d&&d[0]&&d[2].value}}</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        name:'compare-sharp-progress-bar',
        props:['max','title','d'],
        computed:{
            total(){
                return this.d&&this.d[2]&&this.d[2].value
            },
            totalPath(){
                //需要绘制的总长度
                //M5,15l440,0l10,10l-450,0l0,-10
                return `
                M5,15
                l${450 * this.total / this.max},0
                l0,10
                l${-450 * this.total / this.max},0
                l0,-10
            `
            },
            surface(){
                return `
                M5,15
                l${450 * (this.total / this.max) * (this.d&&this.d[0]&&this.d[0].value / this.total)},0
                l10,10,
                l${-450 * (this.total / this.max) * (this.d&&this.d[0]&&this.d[0].value / this.total) - 10},0
                l0,-10
            `
            }
        }
    }
</script>
<style lang="scss">
	.tit{
		font-size:20px;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(254,255,254,.47);
		margin-left: 5px;
		word-break: keep-all;

	}
	.val{
		font-size:22px;
		font-family:FuturaStd-Heavy;
		font-weight:800;
		color:rgba(254,255,254,1);
		text-indent: 5px;
	}
    .compare-sharp-progress-bar{
        width:470px;height:100px;padding:0 5px;
        .progress-bar{
            height:40px;width:460px;
            svg{
                height:40px;width:460px;
                path{
                    animation:path .5s linear;
                }
            }
        }
        .flex{
            display: flex;justify-content: space-between;
            &.top{
                p{
                    &:nth-child(1){
                        font-size:24px;
                    }
                }
            }
            p{
                margin:0;color:#FEFFFE;font-size:24px;
                &:nth-child(2){
                    span{
                        &:nth-child(1){
                            font-size:20px;color:rgba(254, 255, 254, .5)
                        }
                        &:nth-child(2){
                            font-size:22px;
                        }
                    }
                }
            }
        }
        .bottom{
            p{
                font-size:20px;display:flex;align-items:center;width:150px;
                span{
                    &:nth-child(1){width:8px;height:8px;display:inline-block;margin:0 2px;}
                    &:nth-child(2){vertical-align:middle}
                }
                &:nth-child(1){
                    span{
                        &:nth-child(1){
                            background:rgba(251, 178, 47, .8);
                        }
                    }
                }
                &:nth-child(2){
                    span{
                        &:nth-child(1){
                            background:rgba(238, 238, 238, .5);
                        }
                    }
                }
            }
        }
    }
    @keyframes path {
        from{transform: scale(0,1)}
        to{transform:scale(1,1)}
    }
</style>