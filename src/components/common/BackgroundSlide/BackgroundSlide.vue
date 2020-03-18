<template>
    <div class="grid-wave-box">
        <img :src="require('@image/wave.png')" class="grid-wave-1">
        <img :src="require('@image/wave.png')" class="grid-wave-2">
    </div>
</template>

<script>
    export default {
        name: "BackgroundSlide"
    }
</script>

<style scoped>
    .grid-wave-box{
        width: 100%;
        height: 93px;
        overflow: hidden;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: -1;
    }
    .grid-wave-box img {
        position: absolute;
        vertical-align: middle;
    }
    .grid-wave-1 {
        left: 0;
        top: 0;
        animation: waveTranslate 8s linear infinite;
    }
    .grid-wave-2 {
        left: 0;
        top: 0;
        transform: translateX(-100%);
        animation: waveTranslate_2 8s linear infinite;
    }
    @keyframes waveTranslate {
        0%{
            transition: linear;
        }
        100%{
            transform: translateX(100%);
        }
    }
    @keyframes waveTranslate_2 {
        0%{
            transition: linear;
        }
        100%{
            transform: translateX(0);
        }
    }
</style>