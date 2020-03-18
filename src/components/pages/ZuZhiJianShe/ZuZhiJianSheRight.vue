<template>
    <div class="MAX">
        <div class="ZuZhiJianSheRight">
            <div class="top">
                <div class="topTitle bloom">
                    <div class="topName ">
                    </div>
                    <span>党组织社会治理概况</span>
                </div>
                <div class="middle ">
                    <div class="bk">
                        <div class="number left-blocks">
                            <p>6,321</p>
                            <p>基层党组织</p>
                        </div>
                    </div>
                    <div class="bk1">
                        <div class="number1 right-blocks">
                            <p>5,731</p>
                            <p>成员党组织</p>
                        </div>
                    </div>
                    <div class="bk2">
                        <div class="number1 right-blocks">
                            <p>35</p>
                            <p>完成任务量</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="all_middle">
                <div class="middleTitle bloom">
                    <div class="middleName ">
                    </div>
                    <span>党组织社会治理工作走势</span>
                </div>

                <div class="content">
                    <div class="example">
                        <div>
                            <div class="rect"></div>
                            <p>分派任务</p>
                        </div>
                        <div>
                            <div class="rect"></div>
                            <p>认领活动</p>
                        </div>
                        <div>
                            <div class="rect"></div>
                            <p>组织申请</p>
                        </div>
                    </div>
                    <div class="charts" ref="lineChart"></div>
                </div>

            </div>


            <div class="all_footer">
                <div class="footerName ">
                </div>
                <div class="title bloom">
                    <span>基层党组织考核</span> <img style="position: relative;top: 5px;left: 5px"
                                              :src="require('../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')">
                </div>
                <KeHeOne/>
            </div>
        </div>
    </div>

</template>

<script>
    import KeHeOne from "./ZuZhiKeHe/KeHeOne.vue";

    export default {
        name: "ZuZhiJianSheRight",
        data() {
            return {
                selected1: 0,
            }

        },
        components: {
            KeHeOne
        },
        mounted: function () {
            this.lineCharts();

        },
        methods: {

            toggle1(e) {
                if (e.target.dataset.index) {
                    this.selected1 = e.target.dataset.index;

                }
            },
            lineCharts() {
                let arr = ['3月', '4月', '5月', '6月', '7月', '8月',]
                let chart = this.$echarts.init(this.$refs.lineChart)
                let option = {
                    tooltip: {
                        show: true
                    },
                    xAxis: {
                        type: 'category',
                        data: arr,
                        axisTick: false,
                        boundaryGap: false,
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 18
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 2,
                                color: 'rgba(255,255,255,0.5)'
                            }
                        }
                    },
                    grid: {
                        left: 60,
                        bottom: 30,
                        top: 20,
                        right: 30
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: false,
                        splitLine: false,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 18,
                            },
                            margin: 15
                        }
                    },
                    series: [
                        {
                            data: [320, 240, 350, 270, 380, 220, 270, 240],
                            name: '工单数',
                            type: 'line',
                            smooth: true,
                            showSymbol: false,
                            itemStyle: {
                                color: 'rgba(255,46,18,0.2)'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(255,46,18,0.5)',
                                    width: 2
                                }
                            },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(255,46,18,0.5)'
                                    }, {
                                        offset: 0.95,
                                        color: 'rgba(255,46,18,0)'
                                    },],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        {
                            data: [310, 230, 330, 370, 180, 240, 280],

                            type: 'line',
                            smooth: true,
                            showSymbol: false,
                            itemStyle: {
                                color: 'rgba(213, 213, 213, .5)'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(213, 213, 213, .5)',
                                    width: 2
                                }
                            },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(213, 213, 213, .5)' // 0% 处的颜色
                                    }, {
                                        offset: 0.95,
                                        color: 'rgba(213, 213, 213, 0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        {
                            data: [220, 170, 230, 270, 160, 220],
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                color: 'rgba(4,130,226,.5)'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(4,130,226,.5)',
                                    width: 2
                                }
                            },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(4,130,226,0.9)' // 0% 处的颜色
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(4,130,226, 0.5)'
                                    }, {
                                        offset: 0.95,
                                        color: 'rgba(4,130,226, 0)'
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                    ]
                };
                chart.setOption(option)
            }
        },
    }


</script>

<style scoped lang="scss">
    .MAX {
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        height: 1023px;
        width: 630px;

        background: linear-gradient(to left, rgba(23, 34, 50, .99) 0%, rgba(23, 34, 50, .5) 80%, rgba(23, 34, 50, 0) 100%);
        /* background-color: ;*/
    }

    .ZuZhiJianSheRight {
        width: 561px;
        position: absolute;
        top: 0;
        right: 0;
        margin-top: -50px;
        box-sizing: border-box;
        margin-right: 47px;
        height: 913px;

    }

    .left-blocks {
        &:before {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: rgba(255, 255, 255, .6);
            top: 253px;
            left: 2px;

        }

        &:after {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: rgba(255, 255, 255, .6);
            top: 354px;
            left: 2px;
        }
    }

    .right-blocks {
        &:before {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: rgba(255, 255, 255, .6);
            top: 253px;
            right: 0px;
        }

        &:after {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: rgba(255, 255, 255, .6);
            top: 354px;
            right: 0px;
        }
    }

    .topTitle {
        margin-top: 177px;
        margin-bottom: 15px;

        .topName {
            width: 212px;
            height: 61px;
            background: url("../../../assets/common/images/ZuZhiJianShe/bg_djyl_bt@2x.png") no-repeat center center;
            background-size: 100% 100%;
            border-radius: 0px 0px 0px 20px;
            vertical-align: middle;
            display: flex;
            align-items: center;
            position: relative;
        }

        span {
            position: absolute;
            top: 191px;
            margin-left: 53px;
            width: 500px;
            height: 28px;
            font-size: 28px;
            line-height: 28px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(254, 255, 254, 1);
        }
    }

    .middle {
        margin-top: 6px;
        margin-left: 3px;
        display: flex;
        justify-content: space-between;
        width: 561px;
        height: 108px;

        .bk {
            background: rgba(255, 255, 255, 0.08);

            .number {
                width: 156px;
                height: 108px;
                background: url("../../../assets/common/images/ZuZhiJianShe/icon_djyl_zzgk_1@2x.png") no-repeat center center;

                p {
                    text-align: center;

                    &:nth-child(1) {
                        padding-top: 24px;
                        font-size: 30px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(254, 255, 254, 1);
                        line-height: 30px;
                    }

                    &:nth-child(2) {
                        padding-top: 10px;
                        font-size: 20px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(254, 255, 254, 1);
                        line-height: 30px;
                    }
                }
            }
        }

        .bk1 {
            background: rgba(255, 255, 255, 0.08);

            .number1 {
                width: 156px;
                height: 108px;
                background: url("../../../assets/common/images/ZuZhiJianShe/djyl_zzgk_2@2x.png") no-repeat center center;

                p {
                    text-align: center;

                    &:nth-child(1) {
                        padding-top: 24px;
                        font-size: 30px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(254, 255, 254, 1);
                        line-height: 30px;
                    }

                    &:nth-child(2) {
                        padding-top: 10px;
                        font-size: 20px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(254, 255, 254, 1);
                        line-height: 30px;
                    }
                }
            }
        }

        .bk2 {
            .number1 {
                width: 156px;
                height: 108px;
                background: url("../../../assets/common/images/ZuZhiJianShe/bg_zzjs_dzzshzlgk_3@2x.png") no-repeat center center;
                background-size: 100% 100%;

                p {
                    text-align: center;

                    &:nth-child(1) {
                        padding-top: 24px;
                        font-size: 30px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(254, 255, 254, 1);
                        line-height: 30px;
                    }

                    &:nth-child(2) {
                        padding-top: 10px;
                        font-size: 20px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(254, 255, 254, 1);
                        line-height: 30px;
                    }
                }
            }
        }
    }

    .all_middle {
        width: 561px;

        .middleTitle {
            margin-top: 28px;

            .middleName {
                width: 212px;
                height: 61px;
                background: url("../../../assets/common/images/ZuZhiJianShe/bg_djyl_bt@2x.png") no-repeat center center;
                background-size: 100% 100%;
                border-radius: 0px 0px 0px 20px;
                display: flex;
                align-items: center;
                position: relative;
            }

            span {
                position: absolute;
                top: 403px;
                margin-left: 53px;
                width: 500px;
                height: 28px;
                font-size: 28px;
                line-height: 28px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(254, 255, 254, 1);
            }
        }

        .content {
            height: 265px;
            width: 514px;

            .example {
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-right: 20px;

                & > div {
                    font-size: 20px;

                    &:nth-child(1) {
                        display: flex;
                        align-items: center;
                        margin: 0 10px;

                        .rect {
                            width: 13px;
                            height: 6px;
                            margin: 0 5px;

                            &:nth-child(1) {
                                background: #FF2E12;
                            }
                        }
                    }

                    &:nth-child(2) {
                        display: flex;
                        align-items: center;
                        margin: 0 10px;

                        .rect {
                            width: 13px;
                            height: 6px;
                            margin: 0 5px;
                            background: #D5D5D5;
                        }
                    }

                    &:nth-child(3) {
                        display: flex;
                        align-items: center;
                        margin: 0 10px;

                        .rect {
                            width: 13px;
                            height: 6px;
                            margin: 0 5px;
                            background: #3992ED;
                        }
                    }

                }
            }

            .charts {
                height: 200px;
                width: 561px;
            }
        }
    }

    .all_footer {
        width: 561px;

        .footerName {
            width: 223px;
            height: 61px;
            background: url("../../../assets/common/images/ZuZhiJianShe/bg_djyl_bt@2x.png") no-repeat center center;
            background-size: 100% 100%;
            border-radius: 0px 0px 0px 20px;
            display: flex;
            align-items: center;
            position: relative;
        }

        .title {
            position: absolute;
            bottom: 154px;
        }

        span {
            margin-left: 53px;
            width: 112px;
            height: 28px;
            font-size: 28px;
            line-height: 28px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(254, 255, 254, 1);
        }
    }

    .bloom {
        text-shadow: 1px 1px 1px #F70028, -1px -1px 1px #F70028;
    }
</style>