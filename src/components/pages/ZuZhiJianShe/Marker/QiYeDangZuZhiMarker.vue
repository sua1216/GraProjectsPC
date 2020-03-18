<template>
    <div class="command-marker" >
        <img :src="require('../../../../assets/common/images/ZuZhiJianShe/point_djyl_s@2x.png')" class="icon_logo">

    </div>

</template>

<script>

    export default {
        props:['d','path','_vue'],
        name: "ChongXiongShiTuMarker",
        data(){
            return{

            }
        },

    }
</script>

<style scoped>
    .command-marker{

    }
    .icon_logo{
        width: 40px;
        height: 40px;
        position: absolute;
        left: 50px;
        top: -40px;
    }


</style>