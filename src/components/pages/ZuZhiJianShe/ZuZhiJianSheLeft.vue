<template>
    <div class="MAX">
        <div class="ZuZhiJianSheLeft">
            <div class="ZuZhiGaiKuang_TOP">
                <div class="top">
                    <div class="topTitle">
                        <div class="topName bloom">
                            <span>组织概况</span> <img style="margin-left: 7px;"
                                                   :src="require('../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')"
                                                   @click="allPop">
                        </div>
                    </div>
                    <div class="select" @click="toggleSelect($event)">
                        <p data-ac="zuzhi" :class="{selected:selected}">党组织</p>
                        <p data-ac="people" :class="{selected:!selected}">党员</p>
                    </div>
                </div>
                <div class="middle ">
                    <div class="bk">
                        <div class="number left-blocks">
                            <p>12,150</p>
                            <p>党组织</p>
                        </div>
                    </div>
                    <div class="bk1">
                        <div class="number1 right-blocks">
                            <p>158,853</p>
                            <p>党员</p>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div v-if="isTrue" class="ringchart3">
                        <SingleCircleRing :size="74" :o="ringdata[0]" :fontSize="20"></SingleCircleRing>
                        <SingleCircleRing :size="74" :o="ringdata[1]" :fontSize="20"></SingleCircleRing>
                        <SingleCircleRing :size="74" :o="ringdata[2]" :fontSize="20"></SingleCircleRing>
                    </div>
                    <div v-if="isTrue" class="footer_title">
                        <div class="ring-title">党委数</div>
                        <div class="ring-title">党总支</div>
                        <div class="ring-title">党支部</div>
                    </div>
                    <div v-if="isTrue1" class="ringchart3">
                        <SingleCircleRing :size="74" :o="ringdata1[0]" :fontSize="20"></SingleCircleRing>
                        <SingleCircleRing :size="74" :o="ringdata1[1]" :fontSize="20"></SingleCircleRing>
                        <SingleCircleRing :size="74" :o="ringdata1[2]" :fontSize="20"></SingleCircleRing>
                    </div>
                    <div v-if="isTrue1" class="footer_title">
                        <div class="ring-title">正式党员</div>
                        <div class="ring-title">预备党员</div>
                        <div class="ring-title">失联党员</div>
                    </div>

                </div>
            </div>
            <div class="ZuZhiGaiKuang_Middle">
                <div class="top">
                    <div class="topTitle">
                        <div class="topName bloom">
                            <span>组织发展</span>
                        </div>
                    </div>
                    <div class="select" @click="toggleSelect1($event)">
                        <p data-bc="zuzhi" :class="{selected1:selected1}">党组织</p>
                        <p data-bc="people" :class="{selected1:!selected1}">党员</p>
                    </div>
                </div>
                <div class="barchart" ref="barchart"></div>
            </div>
            <div class="ZuZhiGaiKuang_Footer">
                <div class="top">
                    <div class="topTitle">
                        <div class="topName bloom">
                            <span>党组织类型</span>
                        </div>
                        <div class="topName bloom">
                            <span>党员学历</span>
                        </div>
                    </div>
                </div>
                <div class="tubiao">
                    <div class="circhart" ref="circhart"></div>
                    <div class="circhart1" ref="circhart1"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import SingleCircleRing from '@c/common/Graphics/CircleRing/SingleCircleRing.vue'
    import ZuZhiGaiKuangPop from "../Popup/ZuZhiJianShe/ZuZhiGaiKuangPop.vue";

    export default {
        name: "ZuZhiJianSheLeft",
        data() {
            return {
                selected: true,
                selected1: true,
                isTrue: true,
                isTrue1: false,
                ringdata: [
                    {value: 230, percent: 12, color: '#FF5D5D'},
                    {value: 230, percent: 27, color: '#FF5D5D'},
                    {value: 230, percent: 61, color: '#FF5D5D'}
                ],
                ringdata1: [
                    {value: 230, percent: 56, color: '#FF5D5D'},
                    {value: 230, percent: 32, color: '#FF5D5D'},
                    {value: 230, percent: 22, color: '#FF5D5D'}
                ],
            }
        },
        components: {
            SingleCircleRing,
        },
        mounted: function () {
            this.setBarChart();
            this.setCirChart();
            this.setCirChart1();
        },
        methods: {
            setBarChart() {
                this.$echarts.dispose(this.$refs.barchart);
                let chart = this.$echarts.init(this.$refs.barchart);
                let option = {
                    title: {
                        textStyle: {
                            align: 'center',
                            color: '#fff',
                            fontSize: 20,
                        },
                        top: '3%',
                        left: '10%',
                    },
                    grid: {
                        top: "10%",
                        bottom: "10%"
                    },

                    xAxis: {
                        data: [
                            "2016",
                            "",
                            "",
                            "",
                            "2017",
                            "",
                            "",
                            "",
                            "2018",
                            "",
                            "",
                            "",
                            "2019",
                        ],
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,0.7)',
                                fontSize: 18
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 2,
                                color: 'rgba(255,255,255,0.3)'
                            }
                        }

                    },
                    yAxis: [{
                        type: "value",
                        nameTextStyle: {
                            color: "#FFFFFF"
                        },
                        splitLine: {
                            show: false
                        },

                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "rgba(255,255,255,0.7)",
                                fontSize: 18

                            }
                        },

                    },
                        {
                            type: "value",
                            nameTextStyle: {
                                color: "#FFFFFF"
                            },
                            position: "right",
                            splitLine: {
                                show: false
                            },

                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                formatter: "{value}", //右侧Y轴文字显示
                                textStyle: {
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: 18
                                }
                            }
                        },
                        {
                            type: "value",
                            gridIndex: 0,
                            min: 50,
                            max: 100,
                            splitNumber: 8,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            splitArea: {
                                show: false,
                                areaStyle: {
                                    color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
                                }
                            }
                        }
                    ],
                    series: [{
                        type: "line",
                        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                        smooth: false, //平滑曲线显示
                        showAllSymbol: true, //显示所有图形。
                        itemStyle: {
                            //折线拐点标志的样式
                            color: "#058cff",
                            opacity: 0
                        },
                        lineStyle: {
                            color: "#058cff"
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0, color: 'rgba(66, 166, 228,.8)' // 0% 处的颜色
                                    },
                                    {
                                        offset: .5, color: 'rgba(66, 166, 228,.2)' // 100% 处的颜色
                                    },
                                    {
                                        offset: 1, color: 'rgba(66, 166, 228,0)' // 100% 处的颜色
                                    }
                                ],
                                global: false // 缺省为 false
                            }
                        },
                        data: [40, 28, 35, 80, 70, 60, 70, 60, 80, 45, 50, 60, 40]
                        /*data:[80,80,80,80,80,80,80,80,80,80,80,80,80,80,]*/
                    },
                        {
                            type: "bar",
                            barWidth: 10,
                            itemStyle: {
                                barBorderRadius: [4, 4, 0, 0],
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0, color: 'rgba(255, 69, 69, 1)' // 0% 处的颜色
                                        },
                                        {
                                            offset: .7, color: 'rgba(255, 69, 69,.3)' // 100% 处的颜色
                                        },
                                        {
                                            offset: 1, color: 'rgba(255, 69, 69,.3)' // 100% 处的颜色
                                        }
                                    ],
                                    global: false // 缺省为 false
                                }
                            },
                            data: [2500, 1500, 1750, 1800, 1200, 1550, 1000, 1200, 1400, 1600, 1200, 1550, 1600,]
                        }
                    ]
                };
                chart.setOption(option)
            },
            setCirChart() {
                let chart = this.$echarts.init(this.$refs.circhart);
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    /*legend: {
                        x: 'center',
                        y: 'bottom',
                        data: ['rose1', 'rose2', 'rose3',"rose4"]
                    },*/
                    // calculable : true,
                    series: [{
                        name: '案件来源',
                        type: 'pie',
                        radius: ['20%', '70%'],
                        roseType: 'area',
                        data: [
                            {
                                value: 89,
                                name: '国企\n149'
                            },
                            {
                                value: 149,
                                name: '事业\n单位\n149'
                            },
                            {
                                value: 89,
                                name: '民营\n企业\n89'
                            },
                            {
                                value: 149,
                                name: '机关\n 149'
                            },


                        ],
                        label: {
                            show: true,
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: 18,
                            formatter: function (params) {
                                return [
                                    `{a|${params.name}}`
                                ].join('\n')
                            },
                            rich: {
                                a: {
                                    fontSize: 18,
                                    fontWeight: '550',
                                    fontFamily: 'Microsoft YaHei',
                                    color: 'rgba(255,255,255,1)',
                                    lineHeight: 20
                                },
                                b: {
                                    fontSize: 22,
                                    fontWeight: '550',
                                    fontFamily: 'FuturaStd-Heavy',
                                    color: 'rgba(255,255,255,1)',
                                    lineHeight: 30
                                }
                            }
                        },
                        itemStyle: {
                            color: function (params) {
                                let color = [
                                    'rgba(255, 171, 52, 0.64)',
                                    'rgba(255, 98, 29, 0.64)',
                                    'rgba(255,80,39,0.64)',
                                    'rgba(237, 42, 46, 0.64)',
                                ]
                                let index = params.dataIndex;
                                return color[index]
                            },
                            borderColor: '#FFA25A'
                        }
                    }]
                };
                chart.setOption(option)
            },
            setCirChart1() {
                let chart = this.$echarts.init(this.$refs.circhart1);
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    /*legend: {
                        x: 'center',
                        y: 'bottom',
                        data: ['rose1', 'rose2', 'rose3',"rose4"]
                    },*/
                    // calculable : true,
                    series: [{
                        name: '案件来源',
                        type: 'pie',
                        radius: ['20%', '70%'],
                        roseType: 'area',
                        data: [
                            {
                                value: 89,
                                name: '本科\n2,549'
                            },
                            {
                                value: 149,
                                name: '硕士\n279'
                            },
                            {
                                value: 89,
                                name: '博士\n89'
                            },
                            {
                                value: 149,
                                name: '专科\n 1,789'
                            },


                        ],
                        label: {
                            show: true,
                            color: 'rgba(255,255,255,1)',
                            fontSize: 20,
                            formatter: function (params) {
                                return [
                                    `{a|${params.name}}`
                                ].join('\n')
                            },
                            rich: {
                                a: {
                                    fontSize: 18,
                                    fontWeight: '550',
                                    fontFamily: 'Microsoft YaHei',
                                    color: 'rgba(255,255,255,1)',
                                    lineHeight: 20
                                },
                                b: {
                                    fontSize: 50,
                                    fontWeight: '550',
                                    fontFamily: 'FuturaStd-Heavy',
                                    color: 'rgba(255,255,255,1)',
                                    lineHeight: 30
                                }
                            }
                        },
                        itemStyle: {
                            color: function (params) {
                                let color = [
                                    'rgba(255, 171, 52, 0.64)',
                                    'rgba(255, 98, 29, 0.64)',
                                    'rgba(255,80,39,0.64)',
                                    'rgba(237, 42, 46, 0.64)',
                                ]
                                let index = params.dataIndex;
                                return color[index]
                            },
                            borderColor: '#FFA25A'
                        }
                    }]
                };
                chart.setOption(option)
            },

            toggleSelect(e) {
                if (e.target.dataset.ac) {
                    if (e.target.dataset.ac == 'zuzhi') {
                        this.selected = true
                        this.isTrue1 = false
                        this.isTrue = true
                    } else {
                        this.selected = false
                        this.isTrue1 = true
                        this.isTrue = false

                    }

                }
            },
            toggleSelect1(e) {
                if (e.target.dataset.bc) {
                    if (e.target.dataset.bc == 'zuzhi') {
                        this.selected1 = true
                    } else {
                        this.selected1 = false
                    }
                    this.setBarChart()
                }
            },
            allPop() {
                this.$Tooltips({
                    render: h => {
                        h(ZuZhiGaiKuangPop)
                    }
                })
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

    .ZuZhiJianSheLeft {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 110px;
        padding-left: 48px;
        width: 610px;
        height: 913px;

    }

    .left-blocks {
        &:before {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: rgba(255, 255, 255, .6);
            top: 67px;
            left: 51px;

        }

        &:after {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: rgba(255, 255, 255, .6);
            top: 168px;
            left: 51px;
        }
    }

    .right-blocks {
        &:before {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: rgba(255, 255, 255, .6);
            top: 67px;
            right: 45px;
        }

        &:after {
            content: '';
            height: 6px;
            width: 6px;
            position: absolute;
            background: rgba(255, 255, 255, .6);
            top: 168px;
            right: 45px;
        }
    }

    .ZuZhiGaiKuang_TOP {
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
                        margin-top: -5px;
                        margin-left: 53px;
                        font-size: 28px;
                        line-height: 28px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(254, 255, 254, 1);
                    }
                }
            }

            .select {
                display: flex;
                justify-content: flex-start;

                p {
                    padding-left: 13px;
                    padding-right: 11px;
                    margin-right: 10px;
                    margin-left: 10px;
                    text-align: center;
                    font-size: 20px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                    line-height: 30px;
                    opacity: 0.65;

                    &.selected {
                        height: 32px;
                        background: rgba(255, 66, 41, 0.4);
                        border-radius: 4px 4px 0px 0px;
                        border-bottom: 2px solid rgba(255, 46, 18, 1);
                        font-weight: bold;
                        color: rgba(254, 255, 254, 1);
                        line-height: 30px;
                        opacity: 1;

                    }
                }
            }
        }

        .middle {
            margin-top: 6px;
            margin-left: 3px;
            display: flex;
            justify-content: space-between;
            width: 514px;
            height: 108px;

            .bk {
                background: rgba(255, 255, 255, 0.08);

                .number {
                    width: 250px;
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
                            margin-right: 14px;
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
                    width: 250px;
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
        }

        .footer {
            width: 514px;
            height: 160px;

            .ringchart3 {
                padding-top: 25px;
                padding-bottom: 6px;
                display: flex;
                justify-content: space-around;
            }

            .footer_title {
                display: flex;
                justify-content: space-around;
                align-items: center;
                text-align: center;
                padding-bottom: 28px;

                .ring-title {
                    width: 80px;
                    height: 20px;
                    font-size: 20px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    line-height: 36px;
                    opacity: 0.7;
                }
            }


        }
    }

    .ZuZhiGaiKuang_Middle {
        width: 514px;
        height: 280px;

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

            .select {
                display: flex;
                justify-content: flex-start;

                p {
                    padding-left: 13px;
                    padding-right: 11px;
                    margin-right: 10px;
                    margin-left: 10px;
                    text-align: center;
                    font-size: 20px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                    line-height: 30px;
                    opacity: 0.65;

                    &.selected1 {
                        height: 32px;
                        background: rgba(255, 66, 41, 0.4);
                        color: rgba(254, 255, 254, 1);
                        opacity: 1;
                        border-radius: 4px 4px 0px 0px;
                        border-bottom: 2px solid rgba(255, 46, 18, 1);
                    }
                }
            }
        }

        .barchart {

            width: 536px;
            height: 240px;

        }
    }

    .ZuZhiGaiKuang_Footer {
        width: 514px;

        .topTitle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 25px;

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

        .tubiao {
            display: flex;
            justify-content: space-between;
            width: 514px;

            .circhart {
                width: 270px;
                height: 200px;
            }

            .circhart1 {
                width: 270px;
                height: 200px;

            }
        }
    }

    .bloom {
        text-shadow: 1px 1px 1px #F70028, -1px -1px 1px #F70028;
    }

</style>