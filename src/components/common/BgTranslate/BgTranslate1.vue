<template>
    <div class="bg-translate">
        <div class="Rank-bg">
            <img src="../../../assets/common/images/navimg/wave2.png">
            <img src="../../../assets/common/images/navimg/wave2.png">
        </div>
    </div>
</template>

<!--这个背景图大小可能有变化，具体根据图片来，大小不一致时需要更改动画距离-->
<script>
    export default {
        name: "BgTranslate1"
    }
</script>

<style scoped>
    .bg-translate{
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .Rank-bg{
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        animation: wave_2 10s linear infinite;
        z-index: -1;
    }
    @keyframes wave_2
    {
        0% {
            left: 0;
        }
        100% {
            left: -1180px;
        }
    }
</style>