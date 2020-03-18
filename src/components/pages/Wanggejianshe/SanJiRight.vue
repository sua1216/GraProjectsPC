<template>
    <!--三级网格的右边部分-->
    <div class="san-ji-right">
        <div class="content">
            <!--1-->
            <div class="li">
                <div class="liTitle">基础信息</div>
                <div class="jcxx" v-for="(item,index) in DGdata[0]" :key="index">
                    <div v-if="index>1">{{item[0].name}}:</div>
                    <div v-if="index>1">{{item[0].value}}</div>
                    <div></div>
                    <div v-if="item[1]">{{item[1].name}}:</div>
                    <div v-if="item[1]">{{item[1].value}}</div>
                    <div v-if="!item[1]"></div>
                    <div v-if="!item[1]"></div>
                </div>
            </div>
            <!--2-->
            <div class="li">
                <div class="liTitle">网格人员及工作</div>
                <div class="jcxx" v-for="(item,index) in DGdata[1]" :key="index">
                    <div>{{item[0].name}}:</div>
                    <div>{{item[0].value}}</div>
                    <div></div>
                    <div v-if="item[1]">{{item[1].name}}:</div>
                    <div v-if="item[1]">{{item[1].value}}</div>
                    <div v-if="!item[1]"></div>
                    <div v-if="!item[1]"></div>
                </div>
            </div>
            <!--3-->
            <div class="li">
                <div class="liTitle">采集信息</div>
                <div class="jcxx" v-for="(item,index) in DGdata[2]" :key="index">
                    <div>{{item[0].name}}:</div>
                    <div>{{item[0].value}}</div>
                    <div></div>
                    <div v-if="item[1]">{{item[1].name}}:</div>
                    <div v-if="item[1]">{{item[1].value}}</div>
                    <div v-if="!item[1]"></div>
                    <div v-if="!item[1]"></div>
                </div>
            </div>
            <!--4-->
            <div class="li">
                <div class="liTitle" @mouseleave="Showshangzhang(false)" @mouseenter="Showshangzhang(true)">考核评价(8月)
                    <span class="zhzs">
                        综合指数:
                        <span>97.9</span>
                    </span>
                    <span v-if="shangzhangShow" class="ssqk">+9.6 <img src="../../../../public/images/bg_Popup_Triangle@2x.png" alt=""></span>
                </div>
                <KaohepinjiaEcharts></KaohepinjiaEcharts>
            </div>
        </div>
    </div>
</template>

<script>

    import XiangQing from "@cp/Wanggejianshe/sourse/XiangQing.js";
    import KaohepinjiaEcharts from "./KaohepinjiaEcharts.vue"
    export default {
        name: "SanJiRight",
        data(){
            return {
                shangzhangShow:false,//控制上涨框的显示
            }
        },
        props:["DGdata"],
        components:{
            "KaohepinjiaEcharts":KaohepinjiaEcharts
        },
        mounted() {
            console.log(this.DGdata)
        },
        methods:{
            Showshangzhang(msg){
                this.shangzhangShow = msg
            }
        }
    }
</script>

<style scoped>
    .san-ji-right {
        position: absolute;
        top: 0px;
        left: 200px;
        z-index: 7;
        display: inline-block;
        width: 1269px;
        height: 789px;
        border: 1px dashed rgba(255,255,255,0.5);
        background-image: url("../../../../public/images/bg_wgjs_town_Right@2x.png");
        background-repeat: no-repeat;
        background-size: 1269px 789px;
        font-size: 24px;
    }

    .content {
        width: 100%;
        height: 630px;
    }
    .li {
        position: absolute;
        display: inline-block;
        width: 43%;
    }
    .li:nth-child(1) {
        top: 120px;
        left: 40px;
    }
    .li:nth-child(2) {
        top: 120px;
        right: 40px;
    }.li:nth-child(3) {
         top: 380px;
         left: 40px;
     }
    .li:nth-child(4) {
        top: 380px;
        right: 40px;
    }

    .liTitle {
        color: #FFC569;
        font-size: 28px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
    }
    .jcxx {
        display: flex;
    }
    .jcxx div {
        line-height: 40px;
        white-space:nowrap;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        overflow:hidden;
    }
    .jcxx div:nth-child(1){
        flex: 2.5;
        color: rgba(255,255,255,0.5);
    }
    .jcxx div:nth-child(2){
        flex: 2.5;
    }
    .jcxx div:nth-child(3){
        flex: 0.5;
    }
    .jcxx div:nth-child(4){
        flex: 2.5;
        color: rgba(255,255,255,0.5);
    }
    .jcxx div:nth-child(5){
        flex: 2;
    }
    .liTitle img {
        display: inline-block;
        width: 13px;
        height: 16px;
    }
    .zhzs {
        display: inline-block;
        margin-left: 20px;
        color: white;
        font-size: 24px;
        border: 1px solid rgba(123,212,252,0.8);
        padding: 2px 15px;
        border-radius: 4px;
        box-shadow: 0 0 2px 2px rgba(123,212,252,0.2);
        background-color: rgba(123,212,252,0.05);
    }
    .zhzs span {
        color: #7BD4FC;
    }
    .ssqk {
        display: inline-block;
        font-size: 20px;
        color: white;
        border: 1px solid rgba(123,212,252,1);
        padding: 0 10px 0px 15px;
        position: absolute;
        top: 8px;
        left: 390px;
        border-radius: 5px;
        box-shadow: 0 0 2px 2px rgba(123,212,252,0.2);
        background-color: rgba(123,212,252,0.1);
    }
</style>