<template>
    <div class="gridProgress">
        <div v-for="n in 30" :style="{backgroundColor:(grid(n) ? bgColor:'')}" v-bind:key="n"></div>
    </div>
</template>

<!--
    percent:Number(传入的百分比)
    bgColor:String(背景颜色)
-->
<script>
    export default {
        name: "ProgressGrid",
        props:{
            percent:Number,
            bgColor:String
        },
        methods:{
            grid(n){
                if((this.percent > 1) && (this.percent < 99)){
                    return n <= Math.round(this.percent/3.33)
                }else if(this.percent <= 1){
                    return n == 1
                }else if((this.percent >= 99) && (this.percent < 100)){
                    return n <= 29
                }else if(this.percent == 100){
                    return n <= 30
                }
            },
        }
    }
</script>

<style scoped>
    .whiteBg{
        background-color: white !important;
    }
    .gridProgress{
        width: 72px;
        height: 56px;
        display: flex;
        flex-wrap: wrap;
        /*justify-content: space-between;*/
    }
    .gridProgress div{
        margin-right: 2px;
        margin-top: 2px;
        width: 10px;
        height: 9px;
        background:rgba(255,255,255,0.2);
    }
</style>