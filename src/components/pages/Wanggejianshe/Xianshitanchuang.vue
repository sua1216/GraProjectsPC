<template>
    <!--县市弹窗  二级弹窗，点击大地图上面的县市网格进行信息展示-->
    <div class="xian-shi-tan-chuang">
        <div class="border"></div>
        <span class="jiao"></span>
        <span class="jiao"></span>
        <span class="jiao"></span>
        <span class="jiao"></span>
        <div class="title">
            {{BoxNum[0][0].value}}
<!--            (网络编号)-->
            <span class="title2">{{BoxNum[0][1].value}}</span>
            <span class="close" @click="close">×</span>
        </div>

        <div class="content">
            <!--1-->
            <div class="li">
                <div class="liTitle">基础信息</div>
                <div class="jcxx" v-for="(item,index) in BoxNum[0]" :key="index">
                    <div v-if="index>1" :title="item[0].name">{{item[0].name}}:</div>
                    <div v-if="index>1" :title="item[0].value">{{item[0].value}}</div>
                    <div></div>
                    <div v-if="item[1]" :title="item[1].name">{{item[1].name}}:</div>
                    <div v-if="item[1]" :title="item[1].value">{{item[1].value}}</div>
                    <div v-if="!item[1]"></div>
                    <div v-if="!item[1]"></div>
                </div>
            </div>
            <!--2-->
            <div class="li">
                <div class="liTitle">网格人员及工作</div>
                <div class="jcxx" v-for="(item,index) in BoxNum[1]" :key="index">
                    <div :title="item[0].name">{{item[0].name}}:</div>
                    <div :title="item[0].value">{{item[0].value}}</div>
                    <div></div>
                    <div v-if="item[1]" :title="item[1].name">{{item[1].name}}:</div>
                    <div v-if="item[1]" :title="item[1].value">{{item[1].value}}</div>
                    <div v-if="!item[1]"></div>
                    <div v-if="!item[1]"></div>
                </div>
            </div>
            <!--3-->
            <div class="li">
                <div class="liTitle">采集信息</div>
                <div class="jcxx" v-for="(item,index) in BoxNum[2]" :key="index">
                    <div :title="item[0].name">{{item[0].name}}:</div>
                    <div :title="item[0].value">{{item[0].value}}</div>
                    <div></div>
                    <div v-if="item[1]" :title="item[1].name">{{item[1].name}}:</div>
                    <div v-if="item[1]" :title="item[1].value">{{item[1].value}}</div>
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
    import KaohepinjiaEcharts from "./KaohepinjiaEcharts.vue"
    export default {
        name: "Xianshitanchuang",
        data(){
            return {
                shangzhangShow:false
            }
        },
        props:["BoxNum"],
        mounted(){

        },
        methods:{
            close:function () {
                this.$emit('close')
                // this.$emit('closeSanjiTanchuang')
            },
            Showshangzhang(msg){
                this.shangzhangShow = msg
            }
        },
        components:{
            "KaohepinjiaEcharts":KaohepinjiaEcharts
        }
    }
</script>

<style scoped>
    .border {
        position: absolute;
        top: -20px;
        left: -20px;
        display: inline-block;
        width: 1445px;
        height: 782px;
        border: 1px solid rgba(37, 212, 255, 1);
        display: inline-block;

    }
    .jiao {
        position: absolute;
        top: -27px;
        left: -27px;
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: rgba(37, 212, 255, 1);
    }

    .jiao:nth-child(2) {
        top: -27px;
        left: 1417px;
    }

    .jiao:nth-child(3) {
        top: 757px;
        left: 1417px;
    }

    .jiao:nth-child(4) {
        top: 757px;
        left: -27px;
    }

    .xian-shi-tan-chuang {
        position: absolute;
        top: 168px;
        left: 1180px;
        z-index: 99;
        display: inline-block;
        width: 1405px;
        height: 742px;
        /*border: 1px solid #ccc;*/
        background-color: rgba(12,49,70,1);
        font-size: 24px;
    }
    .title {
        font-size: 48px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        text-align: center;
        padding: 20px 20px 0px;
    }
    .title2 {
        font-size: 24px;
        color: #9AE1FF;
        display: inline-block;
        width: 88px;
        height: 37px;
        background-image: url("../../../../public/images/bg_Popup_Title@2x.png");
        background-repeat: no-repeat;
        background-size: 88px 37px;
    }
    .close {
        position: absolute;
        top: 0px;
        left: 1308px;
        display: inline-block;
        width: 94px;
        height: 94px;
        text-align: center;
        line-height: 94px;
        font-size: 64px;
        font-weight: normal;
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
         top: 375px;
         left: 40px;
     }
    .li:nth-child(4) {
        top: 375px;
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
        flex: 3;
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
        margin-left: 20px;
        color: white;
        font-size: 24px;
        border: 1px solid rgba(123,212,252,0.8);
        padding: 2px 15px;
        border-radius: 4px;
        box-shadow: 0 0 2px 2px rgba(123,212,252,0.2);
        background-color: rgba(123,212,252,0.05);
        display: inline-block;
        height: 38px;
    }
    .zhzs span {
        color: #7BD4FC;
    }
    .ssqk {
        display: inline-block;
        height: 28px;
        font-size: 20px;
        color: white;
        border: 1px solid rgba(123,212,252,1);
        padding: 0 10px 0px 15px;
        position: absolute;
        top: 8px;
        left: 390px;
        border-radius: 5px;
        box-shadow: 0 0 2px 2px rgba(123,212,252,0.2);
        line-height: 1.35;
        background-color: rgba(123,212,252,0.1);
    }
</style>