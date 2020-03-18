<template>
    <div class="MAX">
        <div class="ZhengzhijiansheLeft">
            <div class="Zhengzhijianshe_TOP">
                <div class="top">
                    <div class="topTitle">
                        <div class="topName bloom">
                            <span>组织概况</span> <img style="margin-left: 7px;"
                                                   :src="require('../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')"
                                                   @click="topPop">
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div>
                        <div>
                            <p class="xb_icon ballot-check-li"></p>
                        </div>
                        <div>
                            <p style="color:#FFAD64">1980<span>次</span></p>
                            <p>三会一课</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p class="xb_icon book-reader-li"></p>
                        </div>
                        <div>
                            <p style="color:#FFFFFF">3341<span>次</span></p>
                            <p>党建活动</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p class="xb_icon calculator-alt-li"></p>
                        </div>
                        <div>
                            <p style="color:#FFFFFF">12521<span>h</span></p>
                            <p>掌上党校</p>
                        </div>
                    </div>
                </div>
                <div class="content1"></div>
                <div class="content2"></div>
                <div class="content3"></div>
            </div>
            <div class="Zhengzhijianshe_middle">
                <div class="middleTitle bloom">
                    <div class="middleName">
                    </div>
                    <span>三会一课开展趋势</span>
                </div>
                <div class="middleContent">
                    <div class="content">
                        <div class="example">
                            <div>
                                <div class="rect"></div>
                                <p>党委大会</p>
                            </div>
                            <div>
                                <div class="rect"></div>
                                <p>党课</p>
                            </div>
                            <div>
                                <div class="rect"></div>
                                <p>党小组</p>
                            </div>
                            <div>
                                <div class="rect"></div>
                                <p>支部党委员会</p>
                            </div>
                        </div>
                        <div class="charts" ref="lineChart"></div>
                    </div>
                </div>
            </div>
            <div class="Zhengzhijianshe_footer">
                <div class="footerTitle bloom">
                    <div class="footerName">
                    </div>
                    <span class="title">党建活动开展情况</span>
                </div>
                <div class="footerContent">
                    <div class="barchart" ref="barchart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ZuZhiZhengJianPop from "../Popup/Zhengzhijianshe/ZuZhiZhengJianPop.vue";

    export default {
        name: "ZhengzhijiansheLeft",
        data() {
            return {}
        },
        mounted: function () {
            this.lineCharts();
            this.setBarChart()

        },
        components: {
            ZuZhiZhengJianPop
        },
        methods: {
            topPop() {
                this.$Tooltips({
                    render: h => {
                        h(ZuZhiZhengJianPop)
                    }
                })
            },
            lineCharts() {
                let arr = ['1-5', '6-10', '11-15', '16-20', '21-25', '36-30',]
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
                                color: 'rgba(255,255,255,.7)',
                                fontSize: 18
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 2,
                                color: 'rgba(255,255,255,1)'
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
                            smooth: false,
                            showSymbol: false,
                            itemStyle: {
                                color: '#FF2E12'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(255,46,18,1)',
                                    width: 3
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
                                        color: 'rgba(255,46,18,0.5)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,46,18,0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        {
                            data: [50, 170, 150, 200, 30, 50, 110],

                            type: 'line',
                            smooth: false,
                            showSymbol: false,
                            itemStyle: {
                                color: '#D5D5D5'
                            },
                            lineStyle: {
                                normal: {
                                    color: '#D5D5D5',
                                    width: 3
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
                                        offset: 1,
                                        color: 'rgba(213, 213, 213, 0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        {
                            data: [220, 210, 170, 230, 210, 270, 180, 210, 200],
                            type: 'line',
                            smooth: false,
                            symbol: 'none',  //取消折点圆圈
                            itemStyle: {
                                color: 'rgba(4,130,226,1)'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(4,130,226,1)',
                                    width: 3
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
                                        color: 'rgba(4,130,226,0.5)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(4,130,226, 0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                        {
                            data: [280, 260, 220, 310, 260, 360, 180, 210, 180, 220],
                            type: 'line',
                            symbol: 'none',
                            smooth: false,
                            itemStyle: {
                                color: 'rgba(255,227,43,1)'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(255,227,43,1)',
                                    width: 3
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
                                        color: 'rgba(255,227,43,0.5)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,227,43,0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                    ]
                };
                chart.setOption(option)
            },
            setBarChart: function () {
                let THIS = this;
                let data = [
                    {name: '民生评议党员', score: '95'},
                    {name: '民生生活会', score: '96'},
                    {name: '组织生活会', score: '95'},
                    {name: '主题党日', score: '96'},
                    {name: '创新组织生涯', score: '95'},
                ]
                let chart = this.$echarts.init(this.$refs.barchart);
                let arry = {
                    name: [],
                    value: []
                };
                for (let item of data) {
                    arry.name.push(item.name)
                    arry.value.push(Number(item.score))
                }
                let maxNum = arry.value[0]
                let option = {
                    grid: {
                        left: '10%',
                        top: '10%',
                        right: '5%',

                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: arry.name,
                        axisLabel: {
                            show: true,
                            // interval: 0,
                            textStyle: {
                                color: '#b2b2b2',
                                fontSize: 15,
                                baseline: 'top',
                                width: 10,
                                height: 10,
                                margin: 10,
                            },

                            formatter(d) {
                                if (d.length >= 2) {
                                    return d.replace(/^\W{2}/, (e) => {
                                        return e + '\n'
                                    })
                                } else {
                                    return d
                                }
                            },
                        },
                        axisTick: false,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#81848b',
                                width: 2
                            }
                        },

                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            // interval: 0,
                            textStyle: {
                                color: '#b2b2b2',
                                fontSize: 20,
                                baseline: 'top',
                                width: 2
                            },
                            margin: 13
                        },
                        axisTick: false,
                        // minInterval: 1,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#81848b',
                                width: 2
                            }
                        },
                        splitNumber: 4,
                        splitLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '数量',
                            type: 'bar',
                            data: arry.value,
                            symbol: 'none',
                            barWidth: 13,
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff',
                                fontSize: 20
                            },
                            color: function (params) {
                                if (params.dataIndex % 2) {
                                    return new THIS.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#FFFFFF'},
                                            {offset: .5, color: 'rgba(255, 255, 255,.5)'},
                                            {offset: 1, color: 'rgba(255, 255, 255,.1)'}
                                        ]
                                    )
                                } else {
                                    return new THIS.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#FF0C00'},
                                            {offset: .5, color: 'rgba(255, 12, 0,.5)'},
                                            {offset: 1, color: 'rgba(255, 12, 0,.1)'}
                                        ]
                                    )
                                }
                            }
                        },
                    ]
                };
                chart.setOption(option)
            },
        }

    }
</script>
<style scoped lang="scss">
    .MAX {
        position: absolute;
        top: 0;
        left: 0;
        width: 930px;
        height: 1023px;
        background: linear-gradient(90deg, rgba(23, 34, 50, .99) 0%, rgba(23, 34, 50, .5) 80%, rgba(23, 34, 50, 0) 100%);
        /* background-color: ;*/
    }

    .ZhengzhijiansheLeft {
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 110px;
        padding-left: 48px;
        width: 610px;
        height: 913px;
        /*  background: linear-gradient(90deg,rgba(23,34,50,1) 0%,rgba(27,37,50,.5) 80%,rgba(27,37,50,0) 100%);*/
    }

    .Zhengzhijianshe_TOP {
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 500px;

            .topTitle {
                .topName {
                    width: 223px;
                    height: 61px;
                    background: url("../../../assets/common/images/ZuZhiJianShe/bg_djyl_bt@2x.png") no-repeat center center;
                    background-size: 100% 100%;
                    border-radius: 0px 0px 0px 20px;
                    vertical-align: middle;
                    display: flex;
                    align-items: center;

                    span {
                        margin-left: 53px;
                        margin-bottom: 5px;
                        font-size: 28px;
                        line-height: 28px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(254, 255, 254, 1);
                    }
                }
            }
        }

        .content {

            display: flex;
            height: 60px;
            width: 514px;
            justify-content: space-between;

            & > div {
                display: flex;

                & > div {
                    &:nth-child(1) {
                        line-height: 110px;
                        margin-right: 2px;

                        p {

                            font-size: 42px;
                            color: rgba(255, 255, 255, .5);
                            height: 34px;
                        }
                    }

                    &:nth-child(2) {

                        p {
                            &:nth-child(1) {
                                font-size: 42px;
                                font-weight: bold;
                                margin-left: 5px;
                                height: 54px;

                                span {
                                    font-weight: normal;
                                }
                            }

                            &:nth-child(2) {
                                margin-left: 5px;
                                font-size: 24px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: rgba(255, 255, 255, 1);
                                opacity: 0.7;
                            }
                        }
                    }

                    span {
                        font-size: 22px;
                        color: rgba(255, 255, 255, 1);
                    }
                }
            }
        }

        .content1 {
            width: 514px;
            height: 58px;
            background: url('../../../assets/common/images/ZuZhiJianShe/bg_djyl_bl@2x.png') repeat-x;
            animation: amin 5s linear infinite;

        }

        .content2 {
            position: absolute;
            top: 240px;
            left: 50px;
            width: 514px;
            height: 58px;
            background: url('../../../assets/common/images/ZuZhiJianShe/bg_djyl_bl@2x.png') repeat-x;
            animation: amin1 3s linear infinite;

        }

        .content3 {
            position: absolute;
            top: 240px;
            left: 50px;
            width: 514px;
            height: 58px;
            background: url('../../../assets/common/images/ZuZhiJianShe/bg_djyl_bl@2x.png') repeat-x;
            animation: amin1 6s linear infinite;

        }
    }

    .Zhengzhijianshe_middle {
        .middleTitle {
            margin-top: 28px;

            .middleName {
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
                top: 331px;
                margin-left: 53px;
                margin-bottom: 5px;
                font-size: 28px;
                line-height: 28px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(254, 255, 254, 1);
            }
        }

        .middleContent {
            width: 514px;
            height: 306px;

            .content {
                height: 306px;
                width: 550px;

                .example {
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-right: 20px;
                    margin-top: 10px;

                    & > div {

                        font-size: 20px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        opacity: 0.8;

                        &:nth-child(1) {
                            display: flex;
                            align-items: center;
                            margin: 0 5px;

                            .rect {
                                width: 20px;
                                height: 10px;
                                margin: 0 5px;

                                &:nth-child(1) {
                                    background: #FF2E12;
                                }
                            }
                        }

                        &:nth-child(2) {
                            display: flex;
                            align-items: center;
                            margin: 0 5px;

                            .rect {
                                width: 20px;
                                height: 10px;
                                margin: 0 5px;
                                background: #FFE32B;
                            }
                        }

                        &:nth-child(3) {
                            display: flex;
                            align-items: center;
                            margin: 0 5px;

                            .rect {
                                width: 20px;
                                height: 10px;
                                margin: 0 5px;
                                background: #D5D5D5;
                            }
                        }

                        &:nth-child(4) {
                            display: flex;
                            align-items: center;
                            margin: 0 5px;

                            .rect {
                                width: 20px;
                                height: 10px;
                                margin: 0 5px;
                                background: #3992ED;
                            }
                        }

                    }
                }

                .charts {
                    width: 540px;
                    height: 260px;
                }
            }
        }

    }

    .Zhengzhijianshe_footer {
        .footerTitle {
            .footerName {
                width: 223px;
                height: 61px;
                background: url("../../../assets/common/images/ZuZhiJianShe/bg_djyl_bt@2x.png") no-repeat center center;
                background-size: 100% 100%;
                border-radius: 0px 0px 0px 20px;
                vertical-align: middle;
                display: flex;
                align-items: center;
                position: relative;
            }

            .title {
                position: absolute;
                bottom: 177px;
            }

            span {
                margin-left: 53px;

                font-size: 28px;
                line-height: 28px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(254, 255, 254, 1);
            }
        }

        .footerContent {
            .barchart {
                width: 540px;
                height: 260px;
            }
        }
    }

    @keyframes amin {
        0% {
            background-position-x: 0
        }
        100% {
            background-position-x: -977px
        }
    }

    @keyframes amin1 {
        0% {
            background-position-x: 0
        }
        100% {
            background-position-x: -977px
        }
    }

    .bloom {
        text-shadow: 1px 1px 1px #F70028, -1px -1px 1px #F70028;
    }
</style>