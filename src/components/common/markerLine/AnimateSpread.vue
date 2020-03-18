<template>
    <div class="animate-spread">
        <div class="top">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>
<script>

export default {
    name:'animate-spread',
}

</script>
<style lang="scss">
    .animate-spread{
        width:15px;height:200px;margin-left:100px;
        .top{
            display: flex;justify-content:space-around;
            .line{
                width:2px;height:200px;border-radius: 50%;transform-origin:bottom;
                &:nth-child(1){box-shadow: 1px 1px 10px rgba(213,255,233,1),-1px -1px 10px rgba(213,255,233,1);animation:scale .2s linear .1s alternate infinite;background:radial-gradient(rgba(213,255,233,1),rgba(213,255,233,.1));}
                &:nth-child(2){box-shadow: 1px 1px 10px rgba(213,255,233,1),-1px -1px 10px rgba(213,255,233,1);animation:scale .2s linear .2s alternate infinite;background:radial-gradient(rgba(213,255,233,1),rgba(213,255,233,.3));}
                &:nth-child(3){box-shadow: 1px 1px 10px rgba(213,255,233,1),-1px -1px 10px rgba(213,255,233,1);animation:scale .2s linear .3s alternate infinite;background:radial-gradient(rgba(213,255,233,1),rgba(213,255,233,.5));}
                &:nth-child(4){box-shadow: 1px 1px 10px rgba(213,255,233,1),-1px -1px 10px rgba(213,255,233,1);animation:scale .2s linear .4s alternate infinite;background:radial-gradient(rgba(213,255,233,1),rgba(213,255,233,.3));}
                &:nth-child(5){box-shadow: 1px 1px 10px rgba(213,255,233,1),-1px -1px 10px rgba(213,255,233,1);animation:scale .2s linear .3s alternate infinite;background:radial-gradient(rgba(213,255,233,1),rgba(213,255,233,.1));}
            }
            @keyframes scale {
                0%{transform:matrix(1,0,0,1,0,0);opacity:1}
                100%{transform:matrix(1,0,0,.7,0,0);opacity:.6}
            }
        }
    }
</style>