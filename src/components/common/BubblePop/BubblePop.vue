<template>
    <transition name="pop">
        <div class="pop-box" :style="{'top':position.top + 'px','left':position.left + 'px'}" v-show="show">
            <div class="siJiao siJiao-left-top"></div>
            <div class="siJiao siJiao-left-bottom"></div>
            <div class="siJiao siJiao-right-top"></div>
            <div class="siJiao siJiao-right-bottom"></div>
            <div class="caseNum">{{dataList.caseNum}}</div>
            <div class="listBox">
                <div class="list-item" v-for="(item,i) in dataList.list" :key="i">{{item.name}} {{item.num}} 件</div>
            </div>
            <div class="triangles"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "BubblePop",
        data(){
            return{

            }
        },
        props:{
            position:Object,
            dataList:Object,
            show:Boolean,
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .pop-enter,.pop-leave-to{
        opacity: 0;
        transform: translateY(20px);
    }
    .pop-enter-to,.pop-leave{
        transform: translateY(0);
        opacity: 1;
    }
    .siJiao{
        width: 0;
        height: 0;
        border: 6px solid;
        position: absolute;
        border-color: transparent transparent #ffffff;
    }
    .siJiao-left-top{
        left: -4px;
        top: -4px;
        transform: rotate(-45deg);
    }
    .siJiao-left-bottom{
        left: -4px;
        bottom: -4px;
        transform: rotate(225deg);
    }
    .siJiao-right-top{
        right: -4px;
        top: -4px;
        transform: rotate(45deg);
    }
    .siJiao-right-bottom{
        right: -4px;
        bottom: -4px;
        transform: rotate(135deg);
    }
    .list-item{
        font-size: 24px;
        margin-top: 5px;
    }
    .caseNum{
        font-size: 38px;
        font-weight: bold;
    }
    .pop-box{
        padding: 25px 25px 25px 42px;
        width: 353px;
        background:rgba(26,36,47,0.95);
        border:1px solid #ffffff;
        position: absolute;
        z-index: 2;
        transition: 0.5s;
    }
    .triangles{
        background:rgba(26,36,47,1);
        border-top:1px solid #ffffff;
        border-left:1px solid #ffffff;
        width: 20px;
        height: 20px;
        position: absolute;
        top: -11px;
        left: 40px;
        transform: rotate(45deg);
    }
</style>