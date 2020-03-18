<template>
    <div class="command-marker" @click="dangPop()">
        <img :src="require('../../../../assets/common/images/ZuZhiJianShe/point_djyl_s@2x.png')" class="icon_logo">
        <div class="marker-title">{{d.didian}}</div>
    </div>

</template>

<script>
    /*import ZuZhiPopTwo from "@cp/Popup/ZuZhiJianShe/ZuZhiPopTwo.vue";*/
    import DangZuZhiPop from "@cp/Popup/ZuZhiJianShe/DangZuZhiPop.vue";
    import SixCengDianjiPop from "@cp/Popup/Zhengzhijianshe/SixCengDianjiPop.vue";

    export default {
        props:['d','path','_vue'],
        name: "ChongXiongShiTuMarker",
        data(){
            return{

            }
        },
        components:{
            SixCengDianjiPop,
            DangZuZhiPop
        },
        methods:{
            dangPop() {
                let that = this
                this.$Tooltips({
                    props:{
                        d:that.d,
                    },
                    render: h => {
                        h(DangZuZhiPop)
                    }
                })
            },
        }
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

    .marker-title{
        font-size: 20px;
        font-weight: bold;
        color: rgba(255,255,255,1);
        text-align: center;
        padding-left: 15px;
        margin-top: 5px;



    }

</style>