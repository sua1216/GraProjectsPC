<template>
    <!--今日案件概况-->
    <div class="jinrianjiangaikuang">
        <div class="jinrianjaingaikaungTitle">
            今日问题概况
            <span class="line"></span>
            <span class="line2"></span>
        </div>
        <div style="display: flex;justify-content: space-around;margin-top: 20px">
            <div v-for="(item,index) in jinrianjiangaikuangData" :key="item.name" :class="['jrajgkLi',index==3?'czz':'']">
                <div style="text-align: center;font-size: 30px;font-weight: bold;">{{ item.number }}</div>
                <div style="text-align: center;font-size: 20px;color: rgba(255,255,255,0.7)">{{ item.name }}</div>
            </div>
        </div>

        <!--今日案件高发大类-->
        <div class="jrajgfdl">
            今日问题高发大类
            <span class="line line12"></span>
            <span class="line2"></span>
        </div>
        <ul style="margin-top: 40px;">
            <li v-for="(item,index) in jrajgfdlData" class="jrajgfdlLi" :key="item.name">
                <span class="xuHao">{{index+1}}</span>
                <span class="name">{{item.name}}</span>
                <span class="box">
                    <span :style="'left:'+(item.number1)+'%;'+'width:'+(90-item.number1)+'%;'"></span>
                    <span :class="'Line'+index" :style="'width:'+item.number1+'%;'"></span>
                    <span :class="'L'+index" :style="'left:'+(item.number1)+'%;'"></span>
                </span>
                <span style="flex: 1.8;font-size: 18px;text-align: right">
                    <span style="font-size: 22px;color: white;font-weight: bold;">
                        {{item.number1}}
                    </span>
                    ({{item.number2}})
                </span>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        name: "Jinrianjiangaikuang",
        data: function () {
            return {
                jinrianjiangaikuangData: [//今日案件概况  数据
                    {name: "今日新案件", number: "150"},
                    {name: "今日受理", number: "122"},
                    {name: "今日结案", number: "88"},
                    {name: "处置中", number: "45"}
                ],
                jrajgfdlData: [//今日案件高发大类  数据
                    {name: "市容环境", number1: 15, number2: "10%"},
                    {name: "宣传广告", number1: 12, number2: "8%"},
                    {name: "街面秩序", number1: 7, number2: "5%"},
                    {name: "公共设施", number1: 7, number2: "5%"},
                    {name: "市场管理", number1: 7, number2: "5%"}
                ],
                jindutiao:20
            }
        }
    }
</script>

<style scoped>
    .jinrianjiangaikuang {
        width: 500px;
    }

    .jinrianjaingaikaungTitle {
        position: relative;
        top: 0px;
        left: 0px;
        font-size: 28px;
        font-weight: bold;
    }

    .jrajgfdl {
        position: relative;
        top: 20px;
        left: 0px;
        font-weight: bold;
        font-size: 28px;
    }

    .jrajgfdlLi { /*今日案件高发大类 列表项*/
        display: flex;
        margin-bottom: 10px;
        line-height: 42px;
        color: rgba(255,255,255,0.7);
        font-size: 22px;
    }

    .xuHao {
        flex: 0.5;
        font-size: 20px;
    }

    .name {
        flex: 1.8;
        font-size: 22px;
    }

    .box {
        flex: 4;
        position: relative;
        top: 0px;
        left: 0px;
    }

    .box span:nth-child(1) {
        position: absolute;
        top: 20px;
        left: 20px;
        display: inline-block;
        /*width: 85%;*/
        height: 1px;
        background-color: rgba(255,255,255,0.05);
    }

    .box span:nth-child(2) {
        position: absolute;
        top: 10px;
        /*left: 20px;*/
        display: inline-block;
        /*width: 60%;*/
        height: 17px;
    }

    .box span:nth-child(3) {
        position: absolute;
        top: 10px;
        display: inline-block;
        height: 17px;
        width: 5px;
    }

    .L0 {
        background-color: RGBA(255, 140, 78, 1);
    }

    .L1 {
        background-color: RGBA(241, 174, 88, 1);
    }

    .L2,.L3,.L4 {
        background-color: RGBA(151, 166, 174, 1);
    }

    .Line0 {
        background: linear-gradient(to right, rgba(195, 143, 71, 0.2), RGBA(228, 96, 24, 1));
        background: -ms-linear-gradient(to right, RGBA(195, 143, 71, 0.2), RGBA(228, 96, 24, 1));
        background: -webkit-linear-gradient(to right, RGBA(195, 143, 71, 0.2), RGBA(228, 96, 24, 1));
        background: -moz-linear-gradient(to right, RGBA(195, 143, 71, 0.2), RGBA(228, 96, 24, 1));
    }

    .Line1 {
        background: linear-gradient(to right, rgba(195, 143, 71, 0.2), RGBA(218, 152, 63, 1));
        background: -ms-linear-gradient(to right, RGBA(195, 143, 71, 0.2), RGBA(218, 152, 63, 1));
        background: -webkit-linear-gradient(to right, RGBA(195, 143, 71, 0.2), RGBA(218, 152, 63, 1));
        background: -moz-linear-gradient(to right, RGBA(195, 143, 71, 0.2), RGBA(218, 152, 63, 1));
    }

    .Line2 {
        background: linear-gradient(to right, rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -ms-linear-gradient(to right,rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -webkit-linear-gradient(to right, rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -moz-linear-gradient(to right, rgba(0,0,0,0.2), rgba(255,255,255,0.5));
    }

    .Line3 {
        background: linear-gradient(to right, rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -ms-linear-gradient(to right,rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -webkit-linear-gradient(to right, rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -moz-linear-gradient(to right, rgba(0,0,0,0.2), rgba(255,255,255,0.5));
    }

    .Line4 {
        background: linear-gradient(to right,rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -ms-linear-gradient(to right,rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -webkit-linear-gradient(to right, rgba(0,0,0,0.2), rgba(255,255,255,0.5));
        background: -moz-linear-gradient(to right, rgba(0,0,0,0.2), rgba(255,255,255,0.5));
    }

    .box:before {
        content: "";
    }

    .line {
        position: absolute;
        top: 20px;
        right: 5px;
        display: inline-block;
        width: 300px;
        height: 2px;
        background-color: rgba(255,255,255,0.2);
    }

    .line12 {
        width: 250px;
    }

    .line2 {
        position: absolute;
        top: 13px;
        right: 5px;
        display: inline-block;
        width: 3px;
        height: 15px;
        background-color: rgba(255,255,255,0.5);
    }

    .czz {
        background: linear-gradient(to top, #FF6112FF, rgba(24, 35, 47, 0));
        background: -ms-linear-gradient(to top, #FF6112FF, rgba(24, 35, 47, 0));
        background: -webkit-linear-gradient(to top, #FF6112FF, rgba(24, 35, 47, 0));
        background: -moz-linear-gradient(to top, #FF6112FF, rgba(24, 35, 47, 0));
    }
    .jrajgkLi {
        padding: 0px 10px;
    }
</style>