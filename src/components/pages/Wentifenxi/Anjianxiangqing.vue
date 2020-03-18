<template>
    <!--案件详情-->
    <div class="anjianxiangqing">
        <div class="content">
            <div class="border"></div>
            <span class="jiaos">
                <div class="jiao"></div>
            <div class="jiao"></div>
            <div class="jiao"></div>
            <div class="jiao"></div>
            </span>

            <span style="font-size: 48px;font-family: MicrosoftYaHei-Bold;font-weight: bold;">案件详情</span>
            <span class="close" @click="close">×</span>
            <div class="content2">
                <div style="font-size: 28px;font-weight: bold;margin-bottom: 10px;">问题综述：</div>
                <div class="part1">
                    <div class="part1-content">
                        <div class="part1-left">
                            <div>
                                <span class="name">问题编号：</span>
                                <span class="value">{{part1.wtbh}}</span>
                            </div>
                            <div>
                                <span class="name">问题来源：</span>
                                <span class="value">{{part1.wtly}}</span>
                            </div>
                            <div>
                                <span class="name">总环节状态：</span>
                                <span class="value">{{part1.zhjzt}}</span>
                            </div>
                            <div>
                                <span class="name">当前环节状态：</span>
                                <span class="value">{{part1.dqhjzt}}</span>
                            </div>
                            <div>
                                <span class="name">责任网格：</span>
                                <span class="value">{{part1.zrwg}}</span>
                            </div>

                        </div>
                        <div class="part1-right">
                            <div>
                                <span class="name">上报位置：</span>
                                <span class="value">{{part1.sbwz}}</span>
                            </div>
                            <div>
                                <span class="name">上报时间：</span>
                                <span class="value">{{part1.sbsj}}</span>
                            </div>
                            <div>
                                <span class="name">问题大类：</span>
                                <span class="value">{{part1.wtdl}}</span>
                            </div>
                            <div>
                                <span class="name">问题小类：</span>
                                <span class="value">{{part1.wtxl}}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <span class="name">问题描述：</span>
                        <span class="value">{{part1.wtms}}</span>
                    </div>
                    <div class="name">问题图片：</div>
                    <img :src="part1.wttp" alt="">

                </div>

                <div style="font-size: 28px;font-weight: bold;margin-bottom: 10px;">处办结果：</div>
                <div class="part2">

                    <div>
                        <div>
                            <span class="name">处办人姓名：</span>
                            <span class="value">{{part2.cbrxm}}</span>
                        </div>
                        <div>
                            <span class="name">处办人单位/部门：</span>
                            <span class="value">{{part2.cbrbmdw}}</span>
                        </div>
                        <div>
                            <span class="name">处办位置：</span>
                            <span class="value">{{part2.cbwz}}</span>
                        </div>
                        <div>
                            <span class="name">处办时间：</span>
                            <span class="value">{{part2.cbsj}}</span>
                        </div>
                    </div>

                </div>
                <div><span class="name">处办描述：</span>{{part2.cbms}}</div>
                <div class="name">处办图片：</div>
                <img :src="part2.cbtp" alt="">

<!--                <div class="part3">-->
<!--                    <div style="font-size: 22px;font-weight: bold;color: white">指挥处置</div>-->
<!--                    <div class="part3-content">-->
<!--                        <div v-for="(item,index) in part3" :key="index">-->
<!--                            <div class="name">{{item[0]}}</div>-->
<!--                            <div class="value">{{item[1]}}</div>-->
<!--                            <div class="value">{{item[2]}}</div>-->
<!--                        </div>-->

<!--                        <div class="jiao1"></div>-->
<!--                        <div class="jiao2"></div>-->
<!--                        <div class="jiao3"></div>-->
<!--                        <div class="jiao4"></div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="part4">-->
<!--                    <div style="font-size: 22px;font-weight: bold;margin-bottom: 20px;">核查结案</div>-->
<!--                    <div class="part4-content">-->
<!--                        <div>-->
<!--                            <div>-->
<!--                                <span class="name">结案人员：</span>-->
<!--                                <span class="value">{{part4.jary}}</span>-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                <span class="name">结案评判：</span>-->
<!--                                <span class="value">{{part4.japp}}</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <div>-->
<!--                                <span class="name">结案部门：</span>-->
<!--                                <span class="value">{{part4.jabm}}</span>-->
<!--                            </div>-->
<!--                            <div>-->
<!--                                <span class="name">结案意见：</span>-->
<!--                                <span class="value">{{part4.jayj}}</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <div>-->
<!--                                <span class="name">结案时间：</span>-->
<!--                                <span class="value">{{part4.jasj}}</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="part5">-->
<!--                    <div style="font-size: 22px;font-weight: bold;margin-bottom: 0px;">上报图片</div>-->
<!--                    <img class="sbtp" v-for="(item,index) in part5" :src="item.src" alt="" :key="index">-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Anjianxiangqing",
        data(){
            return {
                part1: {
                    wtbh: "CXZ201909240001",
                    wtly:"微信上报",
                    zhjzt:"绿灯",
                    dqhjzt:"橙灯",
                    zrwg:"彝人古镇社区第七网格",
                    sbwz:"云南省楚雄彝族自治州楚雄市德运东路与德远北街交叉口东北100米。",
                    sbsj:"2019/9/23  10:35:13",
                    wtdl:"市容市貌",
                    wtxl:"雨水井盖",
                    wtms:"雨水井盖有破损，已经设立围挡很多天了，希望有关部门尽快解决此问题，解决出行安全隐患。",
                    wttp:require("../../../../public/images/0.png"),
                },
                part2:{
                    cbrxm:"李允",
                    cbrbmdw:"楚雄市市政设置管理中心",
                    cbwz:"云南省楚雄彝族自治州楚雄市德运东路与德远北街交叉口东北100米。",
                    cbsj:"2019/9/24  11:56:23",
                    cbms:"相关单位已安排到场进行维护，现已解决井盖破损问题。",
                    cbtp:require("../../../../public/images/1.png")
                },
                part3:[
                    ["操作","移动处置派遣","催办"],
                    ["人员","32844572","刘晓龙"],
                    ["所属部门","楚雄市东瓜镇","楚雄市东瓜镇"],
                    ["意见","请及时处理","已处理"],
                    ["时间","2018-03-06 09:07","2018-03-06 09:07"],

                ],
                part4:{
                    jary:"刘晓龙",
                    jabm:"楚雄市东瓜镇",
                    jasj:"2018-03-06 09:07",
                    japp:"正常结案",
                    jayj:"已处理",
                },
                part5:[
                    {src:require("../../../../public/images/0.png")},
                    {src:require("../../../../public/images/1.png")},
                ]
            }
        },
        methods:{
            close:function () {//关闭详情弹窗
                this.$emit('ajxq');
            }
        }
    }
</script>

<style scoped>
    img {
        display: inline-block;
        width: 180px;
        height: 160px;
    }
    .jiao {
        position: absolute;
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: RGBA(37, 212, 255, 1);
    }
    .jiaos div:nth-child(1) {
        top: -27px;
        left: -27px;
    }
    .jiaos div:nth-child(2) {
        top: -27px;
        left: 1296px;
    }
    .jiaos div:nth-child(3) {
        top: 953px;
        left: -27px;
    }
    .jiaos div:nth-child(4) {
        top: 953px;
        left: 1296px;
    }
    .anjianxiangqing {
        position: fixed;
        z-index: 99;
        top: 0px;
        left: 0px;
        width: 3840px;
        height: 1023px;
        background-color: rgba(0,0,0,0.8);
    }
    .border {
        position: absolute;
        top: -20px;
        left: -20px;
        z-index: 2;
        width: 1323px;
        height: 982px;
        border: 1px solid RGBA(61, 168, 229, 1);
    }

    .content {
        position: absolute;
        top: 20px;
        left: 1220px;
        z-index: 99;
        margin: 17px auto;
        width: 1283px;
        height: 940px;
        background-color: #0B202D;
        opacity: 0.9;
        padding: 42px 35px 42px 65px;
    }

    .close {
        position: absolute;
        right: 0px;
        top: 0px;
        z-index: 99;
        display: inline-block;
        width: 94px;
        height: 94px;
        font-size: 64px;
        font-weight: normal;
        text-align: center;
        line-height: 94px;
        /*border: 1px dashed rgba(255,255,255,0.5);*/
        cursor: pointer;
        text-shadow: 0.05rem 0rem .5rem rgba(255,255,255,0.2),-0.05rem 0rem .5rem rgba(255,255,255,0.2),0rem 0.05rem .5rem rgba(255,255,255,0.2),0rem 0.05rem .5rem rgba(255,255,255,0.2);

    }

    .content2 {
        position: absolute;
        top: 120px;
        left: 0px;
        z-index: 99;
        overflow: auto;
        height: 820px;
        width: 100%;
        padding: 30px;
    }

    .part1 {
        padding-bottom: 20px;
        border-bottom: 1px dashed #92C3FF;
        margin-bottom: 20px;
    }

    .part1-content {
        display: flex;
    }

    .part1-left,.part1-right {
        flex: 1;
    }

    /*.part2 {*/
    /*    display: flex;*/
    /*    justify-content: space-around;*/
    /*}*/

    .part3 {
        margin: 20px 0px;
    }

    .part3-content {
        position: relative;
        top: 0px;
        left: 0px;
        margin: 20px 0px;
        padding: 20px 0px;
        display: flex;
        justify-content: space-around;
        background-image: url("../../../../public/images/beijingshange.jpg");
    }

    .part4-content {
        display: flex;
        justify-content: space-around;
    }

    .part5 {
        margin-top: 20px;
    }

    .sbtp {
        display: inline-block;
        width: 120px;
        height: 100px;
        margin-right: 10px;
        margin-top: 10px;
    }

    .name {
        color: #2BC7FF;
        font-size: 20px;
        line-height: 40px;
    }

    .value {
        line-height: 40px;
        font-size: 20px;
    }

    .jiao1 {
        position: absolute;
        top: 0px;
        left: 0px;
        display: inline-block;
        border-top: 5px solid RGBA(57, 101, 130, 1);
        border-left: 5px solid RGBA(57, 101, 130, 1);
        width: 15px;
        height: 15px;
    }

    .jiao2 {
        position: absolute;
        top: 0px;
        right: 0px;
        display: inline-block;
        border-top: 5px solid RGBA(57, 101, 130, 1);
        border-right: 5px solid RGBA(57, 101, 130, 1);
        width: 15px;
        height: 15px;
    }

    .jiao3 {
        position: absolute;
        bottom: 0px;
        left: 0px;
        display: inline-block;
        border-bottom: 5px solid RGBA(57, 101, 130, 1);
        border-left: 5px solid RGBA(57, 101, 130, 1);
        width: 15px;
        height: 15px;
    }

    .jiao4 {
        position: absolute;
        bottom: 0px;
        right: 0px;
        display: inline-block;
        border-bottom: 5px solid RGBA(57, 101, 130, 1);
        border-right: 5px solid RGBA(57, 101, 130, 1);
        width: 15px;
        height: 15px;
    }

</style>