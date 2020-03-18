<template>
    <div class="keyArea">
        <div class="info-block">
            <cornerimg size="20" color="red" type="sharp"></cornerimg>
            <div class="line1">
                <div class="title" v-if="CengJi===1">{{d.name}}</div>
                <div class="title" v-if="CengJi===2">{{d.name1}}</div>
                <div class="ratio">TOP<span>{{d.ratio}}</span></div>
            </div>
            <div class="gridlist">
                <div class="gdlist1">
                    <div class="dot-gry"></div>
                    <div class="name">三会一课：</div>
                    <div class="value">{{d.sanhuiyike}}次</div>
                </div>
                <div class="gdlist2">
                    <div class="dot-red"></div>
                    <div class="name">党建活动：</div>
                    <div class="value">{{d.dangjianhuodong}}次</div>
                </div>
                <div class="gdlist1">
                    <div class="dot-gry"></div>
                    <div class="name">党建活动：</div>
                    <div class="value">{{d.dangjianhuodong2}}次</div>
                </div>
                <div class="gdlist2">
                    <div class="dot-red"></div>
                    <div class="name">党建活动：</div>
                    <div class="value">{{d.dangjianhuodong3}}次</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cornerimg from '@c/common/CornerImg/Cornerimg.vue'
    export default {
        name: "keyArea",
        props:['d','parent'],
        components:{
            cornerimg
        },
        computed:{
            CengJi:function () {
                return this.parent.CengJi;
            }
        }
    }
</script>

<style scoped lang="scss">
.keyArea{
    height: 71px;
    width: 60px;
/*    background: url("../../../assets/common/images/ZuZhiJianShe/point_zzjs_zxdzz@2x.png") no-repeat center;*/
 /*   background-size: 100% 100%;*/
    position: relative;
    .info-block{
        width: 341px;
        height: 141px;
        background:rgba(35,11,11,0.9);
        position: absolute;
        top: -171px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px;
        .line1{
            height: 40px;
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            .title{
                text-align: center;
                font-size:24px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .ratio{
                font-size:18px;
                font-family:Microsoft YaHei;
                font-weight:300;
                color:rgba(255,233,222,1);
                span{
                    font-weight: bold;
                }
            }
        }
        .gridlist{
            height: 70px;
            width: 100%;
            display: grid;
            grid-template-rows: repeat(2,1fr);
            grid-template-columns: repeat(2,1fr);
            grid-column-gap: 0px;
            .dot-gry{
                width: 6px;
                height: 6px;
                background: rgba(255,255,255,.5);
                align-self: center;
                justify-self: center;
            }
            .dot-red{
                width: 6px;
                height: 6px;
                background: rgba(255, 97, 18,.5);
                align-self: center;
                justify-self: center;
            }
            .gdlist1{
                display: grid;
                align-items: center;
                grid-template-rows: 1fr;
                grid-template-columns: 20px 90px 50px;
            }
            .gdlist2{
                display: grid;
                align-items: center;
                grid-template-rows: 1fr;
                grid-template-columns: 20px 90px 50px;
            }
            .name{
                font-size:20px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(255,255,255,.7);
                height: 20px;
                line-height: 20px;
                word-break: keep-all;
            }
            .value{
                height:20px;
                font-size:18px;
                font-family:FuturaStd-Heavy;
                font-weight:800;
                color:rgba(255,255,255,1);
                line-height:20px;
            }
        }
    }
}
</style>