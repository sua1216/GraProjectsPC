<template>
    <div class="command-marker" @click="dangPop">
        <img :src="require('../../../../assets/common/images/ZuZhiJianShe/point_zzjs_zxdzz@2x.png')" class="icon_logo" >
        <div class="marker-title">{{d.didian}}</div>
    </div>

</template>

<script>
    import ZhengJianPopTwo from "@cp/Popup/Zhengzhijianshe/ZhengJianPopTwo.vue";
    export default {
        props:['d','path','_vue'],
        name: "XianZhiHuiMarker",
        data(){
            return{

            }
        },
        components:{
            ZhengJianPopTwo
        },
        methods:{
            dangPop() {
                this.$Tooltips({
                    render: h => {
                        h(ZhengJianPopTwo)
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