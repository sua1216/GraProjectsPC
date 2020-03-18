<template>
    <div>
        <div :style="{
        width:size+'px',
        height:size+'px'
    }" class="single-circle-ring">
            <svg :style="{
           width:size+'px',
            height:size+'px'
        }">
                <circle :cx="size / 2" :cy="size / 2" :r="r" fill="none" stroke="gray" :stroke-width="lineWidth*2"></circle>
                <path :d="innerPath" fill="none" :stroke="o.color" :stroke-width="lineWidth * 2" :stroke-dasharray="Math.PI * 2 * r" :stroke-offset="Math.PI * 2 * r" stroke-linecap="round">
                    <animate attributeName="stroke-dashoffset" :from="Math.PI * 2 * r" :to="Math.PI * 2 * r * (1 - o.percent / 100)" dur="1s" fill="freeze" />
                </path>
                <text :x="size / 2-8" :y="size / 2" dominant-baseline="middle" text-anchor="middle" :style="{'font-size':fontSize?fontSize+'px':'30px','font-weight':'bold'}" fill="white">
                    {{o.percent}}
                </text>
                <text :x="size / 2+10" :y="size / 2+8" fill="white" style="font-size: 20px">%</text>
            </svg>
        </div>
        <div style="text-align: center;font-size: 24px;line-height: 1;margin-top: 5px;color: rgba(255,255,255,0.7)">{{ p.number }}</div>
        <div style="text-align: center;font-size: 20px;line-height: 1.5;color: rgba(255,255,255,0.7)">{{ p.name }}</div>
    </div>
</template>

<script>
    export default {
        name: "SvgCircle",
        data() {
            return {
                data:[],
                // o: {value:230,percent:96,color:'#e6322c'},
                // size:160,
                // fontSize:40
            }
        },
        props:["size","fontSize","o","p"],//o记录圆环数据   p记录圆环下方的数据
        computed:{
            lineWidth(){
                return this.size / 30
            },
            r(){
                return (this.size - this.lineWidth * 2) / 2
            },
            innerPath(){
                return `
                M${this.size / 2},${this.size / 2}
                m${0},${-this.r},
                a${this.r},${this.r},0,1,1,0,${2 * this.r}
                a${this.r},${this.r},0,1,1,0,${-2 * this.r}
            `
            }
        }
    }
</script>

<style scoped>
    .number {
        font-weight: bolder;
    }
</style>