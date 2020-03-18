<template>
    <div :style="{
        left:position.left - offset.left + 'px',
        top:position.top - offset.top + 'px'
    }" class="float-window" ref="float">
        <span>{{rate > 0 ? '+' : (rate == 0 ? '' : '-')}}{{rate}}%</span>
        <span :style="rate > 0 ? up : down" class="arrow"></span>
    </div>
</template>

<script>
    export default {
        name: "FloatWindow",
        props:{
            rate:Number,        //显示的比例
            arrow:Boolean,      //是否显示箭头,
            position:Object     //表示位置
        },
        data(){
            return {
                up:{
                    'border':'6px solid #97E557',
                    'border-color':'transparent transparent #97E557 transparent',
                    'border-top':'none',
                    'border-bottom':'18px solid #97E557'
                },
                down:{
                    'border':'6px solid #B94030',
                    'border-color':'#B94030 transparent transparent transparent',
                    'border-bottom':'none',
                    'border-top':'18px solid red'
                },
                offset:{left:0,top:0},
            }
        },
        methods:{
            getRoot(dom){
                let top = 0
                let left = 0
                while(dom != null && dom.tagName != 'BODY'){
                    left += dom.offsetLeft
                    top += dom.offsetTop
                    dom = dom.offsetParent
                }
                this.offset = {top,left}
            }
        }
    }
</script>

<style lang="scss">
    .float-window{
        width:90px;height:30px;background:red;border:1px solid rgba(13, 178, 255, 1);background:rgba(10, 42, 71, .5);border-radius:5px;font-size:20px;text-align: center;display:flex;align-items: center;justify-content:center;position:absolute;top:0;left:0;z-index:100;
        span{
            margin:0 2px;
        }
        .arrow{
            content:'';display:inline-block;width:0px;height:0px;
        }
    }
</style>