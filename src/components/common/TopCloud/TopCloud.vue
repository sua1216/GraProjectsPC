<template>
    <div class="grid-header-shade">
        <img :src="require('@image/TopCloud/bg_title_l.4c9d4449.png')">
        <img :src="require('@image/TopCloud/bg_title_m.ab50e15e.png')">
        <img :src="require('@image/TopCloud/bg_title_r.d9b06d5b.png')">
    </div>
</template>

<script>
    export default {
        name: "TopCloud"
    }
</script>

<style scoped>
    .grid-header-shade {
        position: absolute;
        top: -80px;
        left: -600px;
        z-index: 1;
        background: url(../../../assets/common/images/TopCloud/bg_title_d.407f9627.png) no-repeat;
        width: 3840px;
        height: 250px;
        overflow: hidden;
		pointer-events: none;
    }
    .grid-header-shade img:first-child {
        left: 0;
        animation: cloudTransFrom_1 40s linear infinite;
    }
    .grid-header-shade img:nth-child(2) {
        left: 200px;
        animation: cloudTransFrom_2 15s linear infinite;
    }
    .grid-header-shade img:last-child {
        left: 620px;
        animation: cloudTransFrom_3 40s linear infinite;
    }
    .grid-header-shade img {
        position: absolute;
        top: 0;
    }
    @keyframes cloudTransFrom_1{
        0%{
            left: -500px;
        }50%{
             left: 2000px;
         }
        100%{
            left: -500px;
        }
    }
    @keyframes cloudTransFrom_2{
        0%{
            left: 200px;
        }50%{
             left: 1000px;
         }
        100%{
            left: 200px;
        }
    }
    @keyframes cloudTransFrom_3{
        0%{
            left: 620px;
        }50%{
             left: -2000px;
         }
        100%{
            right: 620px;
        }
    }
</style>