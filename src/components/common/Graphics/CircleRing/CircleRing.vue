<template>
    <div :style="{
        width:size+'px',
        height:size+'px'}" class="circle-ring">
        <svg :style="{
            width:size+'px',
            height:size+'px'
        }">
            <g>
                <path :d="fullPath" fill="none" stroke="#464646" :stroke-width="baseLineWidth"></path>
                <path @mouseup="showFloat($event)" @mousemove="showFloat($event)" @mouseleave="hideFloat()" :data-rate="(1 - leftRate)" :d="leftPath" fill="none" :stroke="color[0]" :stroke-width="baseLineWidth * 2" :stroke-dasharray="Math.PI * r * 2" :stroke-dashoffset="Math.PI * r * 2">
                    <animate attributeName="stroke-dashoffset" :from="Math.PI * r * 2" :to="Math.PI * r * 2 * (1 - leftRate + 0.5)" dur=".5s" fill="freeze"></animate>
                </path>
                <path @mouseup="showFloat($event)" @mousemove="showFloat($event)" @mouseleave="hideFloat()" :data-rate="leftRate" :d="rightPath" fill="none" :stroke="color[1]"  :stroke-width="baseLineWidth * 4" :stroke-dasharray="Math.PI * r * 2" :stroke-dashoffset="Math.PI * r * 2">
                    <animate attributeName="stroke-dashoffset" :from="Math.PI * r * 2" :to="Math.PI * r * 2 * leftRate" dur=".5s" fill="freeze"></animate>
                </path>
            </g>
            <g>
                <text :x="size / 2" :y="size / 2 - 10 " fill="white" text-anchor="middle" style="font-size:40px;">{{d.isNoText ? '':d.totalNum}}</text>
                <text :x="size / 2" :y="size / 2 + 15" fill="white" style="fill-opacity:.8;font-size:22px;" text-anchor="middle">{{title}}</text>
                <text :x="size / 2" :y="size / 2 + 35" fill="white" style="fill-opacity:.8;font-size:18px;" text-anchor="middle">{{unit ? '('+unit+')' : ''}}</text>
            </g>
        </svg>

        <FloatWindow v-show="floatWindowShow" :rate="floatWindowRate" :position="floatWindowPosition"/>
    </div>
</template>
<script>
    import FloatWindow from '@c/common/Tooltips/FloatWindow.vue'
    export default {
        name:'circle-ring',
        props:{
            size:Number,
            num:Number,
            title:String,
            unit:String,
            d:Object,
            color:Array,
        },
        data(){
            return {
                floatWindowShow:false,
                floatWindowPosition:{left:0,top:0},
                floatWindowRate:10,
            }
        },
        components:{
            FloatWindow
        },
        computed:{
            baseLineWidth(){
                return this.size / 50
            },
            r(){
                return this.size / 2 - this.baseLineWidth * 2
            },
            //整个圆
            fullPath(){
                return `
                M${this.size / 2},${this.size / 2}
                m${0},${-this.r},
                a${this.r},${this.r},0,1,0,0,${2 * this.r},
                a${this.r},${this.r},0,1,0,0,${2 * -this.r}
            `
            },
            leftPath(){
                return `
                M${this.size / 2},${this.size / 2}
                m${0},${-this.r},
                a${this.r},${this.r},0,1,0,0,${2 * this.r}
                a${this.r},${this.r},0,1,0,0,${-2 * this.r}
            `
            },
            rightPath(){
                return `
                M${this.size / 2},${this.size / 2}
                m${0},${-this.r},
                a${this.r},${this.r},0,1,1,0,${2 * this.r}
                a${this.r},${this.r},0,1,1,0,${-2 * this.r}
            `
            },
            total(){
                // todo
                //后期真数据需要修改
                return this.d.totalNum * 1 + this.d.lastNum * 1 + this.d.thisNum * 1

            },
            leftRate(){
                //最多保留两位小数
                return (this.d.thisNum / this.total + '').length > 4 ? (this.d.thisNum / this.total).toFixed(2) : (this.d.thisNum / this.total)
            }
        },
        methods:{
            showFloat(e){
                if(e.target.dataset.rate && e.target.dataset.rate * 100 != this.floatWindowRate){
                    this.floatWindowRate = e.target.dataset.rate * 100;
                }
                if(!this.floatWindowShow)
                    this.floatWindowShow = true
                this.floatWindowPosition = {left:e.x-90,top:e.y-60}
            },
            hideFloat(){
                this.floatWindowShow = false
            }
        }
    }
</script>
<style>
</style>