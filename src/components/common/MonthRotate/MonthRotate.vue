<template>
    <div class="month-kh">
        <div class="month-title">
            <span>{{month}}</span><span>月</span>
        </div>
        <img src="../../../assets/common/image/Tc_icon_5.png">
    </div>
</template>

<script>
    export default {
        name: "MonthRotate",
        props:{
            month:Number
        }
    }
</script>

<style scoped>
    .month-title{
        color: #00D4FF;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 2;
    }
    .month-title span:first-child{
        font-size: 47px;
        font-weight: bold;
    }
    .month-title span:last-child{
        font-size: 20px;
    }
    .month-kh{
        /*position: absolute;*/
        /*top: -40px;*/
        /*right: 5px;*/
        width: 124px;
        height: 124px;
    }
    .month-kh img{
        width: 100%;
        height: 100%;
        animation: rotatrMonth 2s linear infinite;
    }
    @keyframes rotatrMonth{
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>