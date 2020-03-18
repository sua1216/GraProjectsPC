<template>
    <div :style="{
        width:size + 'px',
        height:size + 'px'
    }" class="single-circle-ring">
        <svg :style="{
           width:size + 'px',
            height:size + 'px'
        }">
            <circle :cx="size / 2" :cy="size / 2" :r="r + lineWidth / 2" fill="none" stroke="gray" :stroke-width="lineWidth"></circle>
            <path :d="innerPath" fill="none" :stroke="o.color" :stroke-width="lineWidth * 2" :stroke-dasharray="Math.PI * 2 * r" :stroke-offset="Math.PI * 2 * r" stroke-linecap="round">
                <animate attributeName="stroke-dashoffset" :from="Math.PI * 2 * r" :to="Math.PI * 2 * r * (1 - o.percent / 100)" dur="1s" fill="freeze" />
            </path>
<!--            <circle :cx="size / 2" :cy="size / 2" :r="r / 2 + 2 * lineWidth" fill="none" stroke="rgba(255, 255, 255, 0.1)" :stroke-width="lineWidth * 2"></circle>-->
            <text :x="size / 2" :y="size / 2"  dominant-baseline="middle" text-anchor="middle" :style="{'font-size':fontSize?fontSize+'px':'32px'}" fill="white">{{o.percent + '%'}}</text>
        </svg>
    </div>
</template>
<script>
    export default {
        name:'',
        props:{
            size:Number,
            o:Object,
            fontSize:Number
        },
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
<style lang="scss">
    .single-circle-ring{

    }
</style>