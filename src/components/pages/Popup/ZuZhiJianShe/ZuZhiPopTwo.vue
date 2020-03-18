<template>
    <div class="DangZuZhiPop">

        <div class="left">
            <div class="top">
                <div class="topName">
                    <span class="bloom">党组织导航</span>
                </div>
            </div>
            <div class="LeftDaoHang">
                <div class="LeftDaoHang">
                    <ul>
                        <li>
                            <!--楚雄州州直机关党委  最外面-->
                            <div class="change OneCeng">
                                {{daohangData.name}}
                            </div>

                            <ul class="ul">
                                <li class="line1"></li>
                                <span class="line1Bug"></span>
                                <li>
                                    <!--州财政机关党委  第二层  1-->
                                    <div class="dinWei TwoCeng" @click="change2(0,$event)">
                                        <img v-show="show0"
                                             :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")'
                                             alt="" class="bgImg1">
                                        <div class="changzhu">
                                            <span :class="['bigPoint',pointStyle1?'pointStyle':'']"></span>
                                        </div>
                                        <span class="lis">{{daohangData.children[0].name}}</span>
                                    </div>

                                    <!--第一党支部  第三层......................-->
                                    <ul v-show="show0" class="ul2">
                                        <li class="line2"></li>
                                        <span class="line2Bug"></span>
                                        <li class="lis3" v-for="(item,index) in daohangData.children[0].chilren"
                                            @click="change(0,index,$event)" :key="index+'---'">
                                            <img :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")'
                                                 alt="" :class="['bgImg2',index==0?'bgImg2_2':'']">
                                            <div class="ThreeCeng">
                                                <div class="changzhuThree">
                                                    <span class="littlePoint"></span>
                                                </div>
                                                <span class="lis2">{{item.name}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <!--州财政机关党委  第二层  2-->
                                    <div class="dinWei TwoCeng" @click="change2(1,$event)">
                                        <img v-show="show1"
                                             :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")'
                                             alt="" class="bgImg1">
                                        <div class="changzhu">
                                            <span :class="['bigPoint',pointStyle2?'pointStyle':'']"></span>
                                        </div>
                                        <span class="lis">{{daohangData.children[1].name}}</span>
                                    </div>

                                    <!--第一党支部  第三层  ......................-->
                                    <ul v-show="show1" class="ul2">
                                        <li class="line2"></li>
                                        <span class="line2Bug"></span>
                                        <li class="lis3" v-for="(item,index) in daohangData.children[1].chilren"
                                            @click="change(1,index,$event)" :key="index+'---'">
                                            <img :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")'
                                                 alt="" class="bgImg2">
                                            <div class="ThreeCeng">
                                                <div class="changzhuThree">
                                                    <span class="littlePoint"></span>
                                                </div>
                                                <span class="lis2">{{item.name}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <!--州财政机关党委  第二层  3-->
                                    <div class="dinWei TwoCeng" @click="change2(2,$event)">
                                        <img v-show="show2"
                                             :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")'
                                             alt="" class="bgImg1">
                                        <div class="changzhu">
                                            <span :class="['bigPoint',pointStyle3?'pointStyle':'']"></span>
                                        </div>
                                        <span class="lis">{{daohangData.children[2].name}}</span>
                                    </div>

                                    <!--第一党支部  第三层......................-->
                                    <ul v-show="show2" class="ul2">
                                        <li class="line2"></li>
                                        <span class="line2Bug"></span>
                                        <li class="lis3" v-for="(item,index) in daohangData.children[2].chilren"
                                            @click="change(2,index,$event)" :key="index+'---'">
                                            <img :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")'
                                                 alt="" class="bgImg2">
                                            <div class="ThreeCeng">
                                                <div class="changzhuThree">
                                                    <span class="littlePoint"></span>
                                                </div>
                                                <span class="lis2">{{item.name}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </li>


                                <li>
                                    <div class="dinWei TwoCeng">
                                        <div class="changzhu">
                                            <span class="bigPoint"></span>
                                        </div>
                                        <span class="lis">州文化和旅游局机关</span>
                                    </div>
                                </li>

                                <li>
                                    <div class="dinWei TwoCeng">
                                        <div class="changzhu">
                                            <span class="bigPoint"></span>
                                        </div>
                                        <span class="lis">州农业农村局机关</span>
                                    </div>
                                </li>

                                <li>
                                    <div class="dinWei TwoCeng">
                                        <div class="changzhu">
                                            <span class="bigPoint"></span>
                                        </div>
                                        <span class="lis">州水务局机关党委</span>
                                    </div>
                                </li>

                                <li>
                                    <div class="dinWei TwoCeng">
                                        <div class="changzhu">
                                            <span class="bigPoint"></span>
                                        </div>
                                        <span class="lis">州统战部机关党委</span>
                                    </div>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="title bloom">
                <div>楚雄市东瓜邮政所党支部<!--<span>成员党组织</span>--></div>
            </div>
            <div class="rightMiddle">
                <div class="middleLeft">
                    <div class="top">
                        <div class="topName">
                            <span class="bloom">基本信息</span>
                        </div>
                    </div>
                    <div class="content">
                        <p>名称：<span>楚雄市东瓜邮政所党支部</span></p>
                        <p>党支部负责人：<span>张明华</span></p>
                        <p>联系电话：<span>12812415421</span></p>
                        <p>党员人数：<span>32</span></p>
                        <p>地址: <span>云南省楚雄彝族自治州东方镇214省道</span></p>
                        <p>所属四级网络 <span>II1III2IV3-1,II1III2IV10V4-1</span></p>

                    </div>
                </div>
                <div class="middleCenter">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs bloom">党员流入流出</div>
                        <div class="example">
                            <div>
                                <div class="rect"></div>
                                <p>流入</p>
                            </div>
                            <div>
                                <div class="rect"></div>
                                <p>流出</p>
                            </div>
                            <div>
                                <div class="rect"></div>
                                <p>党员数量</p>
                            </div>
                        </div>
                        <div class="barchart" ref="barchart"></div>
                    </div>

                </div>
                <div class="middleRight">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs bloom">基层社会治理 <img style=" margin-left: 3px;position:relative;top:3px;"
                                                           :src="require('../../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')">
                        </div>
                    </div>

                    <div class="circhart" ref="circhart"></div>
                    <div class="info-">
                        <p>3254</p>
                    </div>
                </div>
            </div>

            <div class="rightFooter">
                <div class="footerLeft">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <img :src="require('../../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')">
                        <div class="abs bloom">党员分析</div>
                        <div class="select" @click="toggleSelect($event)">
                            <p data-bc="zuzhi" :class="{selected:selected}">党组织</p>
                            <p data-bc="people" :class="{selected:!selected}">党员</p>
                        </div>
                    </div>
                    <div class="circhart1" ref="circhart1"></div>
                </div>
                <div class="footerMiddle">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs bloom">党组织考核</div>
                    </div>
                    <div class="radar" ref="radarchart"></div>
                    <div class="info-hege">
                        <p>合格</p>
                    </div>
                </div>
                <div class="footerRight">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs bloom">基层社会治理工作考核</div>
                    </div>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "DangZuZhiPop",
        data() {
            return {
                show: false,
                show0: true,
                show1: false,
                show2: false,

                pointStyle1: false,
                pointStyle2: false,
                pointStyle3: false,

                index: 0,
                current: 0,
                daohangData: {
                    name: "楚雄州州直机关党委",
                    id: 1,
                    children: [
                        {
                            name: "州财政机关党委",
                            id: 3,
                            chilren: [{name: "第一党支部"},
                                {name: "第一党支部"},
                                {name: "第二党支部"},
                                {name: "第三党支部"},
                                {name: "第四党支部"},]
                        },
                        {
                            name: "州人民检察机关...",
                            id: 4,
                            chilren: [{name: "党支部2"},
                                {name: "党支部2"},
                                {name: "党支部2"},
                                {name: "党支部2"},
                                {name: "党支部2"},]
                        },
                        {
                            name: "州人民法院机关党委",
                            id: 5,
                            chilren: [{name: "党支部3"},
                                {name: "党支部3"},
                                {name: "党支部3"},
                                {name: "党支部3"},
                                {name: "党支部3"},]
                        },
                        {name: "州文化和旅游局机关"},
                        {name: "州农业农村局机关"},
                        {name: "州水务局机关党委"},
                        {name: "州统战部机关党委"},

                    ]
                },
                selected: true,
                radarValue: [{
                    name: '5月',
                    value: [3641, 3481, 3371, 93, 95.7]
                }],
            }
        },
        mounted: function () {
            var arr = [];
            arr.push(this.flag1)
            arr.push(this.flag2)
            arr.push(this.flag2)

            this.shows = arr;

            let that = this;
            setTimeout(function () {
                that.setBarChart();
                that.setCirChart();
                that.setCirChart1();
                that.setRadarChart();
                that.setlineCharts();
            }, 0)
        },
        methods: {
            change2(index, e) {
                var imgs = document.getElementsByClassName("bgImg2")
                for (var i = 0; i < imgs.length; i++) {
                    document.getElementsByClassName("bgImg2")[i].classList.add("bgImg2_1")
                    document.getElementsByClassName("bgImg2")[i].classList.remove("bgImg2_2")
                }
                e.target.nextSibling.childNodes[2].childNodes[0].classList.add("bgImg2_2")
                e.target.nextSibling.childNodes[2].childNodes[0].classList.remove("bgImg2_1")
                //console.log(e.target.nextSibling.childNodes[2].childNodes[0])
                if (index == 0) {
                    this.show0 = !this.show0
                    if (this.show1 == true) {
                        this.show1 = !this.show1
                    }
                    if (this.show2 == true) {
                        this.show2 = !this.show2
                    }

                } else if (index == 1) {
                    this.show1 = !this.show1
                    if (this.show0 == true) {
                        this.show0 = !this.show0
                    }
                    if (this.show2 == true) {
                        this.show2 = !this.show2
                    }
                } else if (index == 2) {
                    this.show2 = !this.show2
                    if (this.show0 == true) {
                        this.show0 = !this.show0
                    }
                    if (this.show1 == true) {
                        this.show1 = !this.show1
                    }
                }
            },
            change(index, index2, index3) {//一层index  二层index  当前dom元素
                //console.log(index)
                if (index3) {
                    var imgs = document.getElementsByClassName("bgImg2")
                    for (var i = 0; i < imgs.length; i++) {
                        document.getElementsByClassName("bgImg2")[i].classList.add("bgImg2_1")
                        document.getElementsByClassName("bgImg2")[i].classList.remove("bgImg2_2")
                    }
                    //
                    index3.target.children[0].classList.remove("bgImg2_1")
                    index3.target.children[0].classList.add("bgImg2_2")
                }
                //console.log(index,index2,index3)

                // if (level == 1) {
                //     //
                //     if (this.show1 == item.id) {
                //         this.show1 = 0
                //     } else {
                //         this.show1 = item.id
                //     }
                // } else {
                //     //
                //     if (this.show2 == item.id) {
                //         this.show2 = 0
                //     } else {
                //         this.show2 = item.id
                //     }
                // }
            },
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
                        /*  axisLine: {
                              show: true //隐藏X轴轴线
                          },
                          axisTick: {
                              show: true //隐藏X轴刻度
                          },
                          axisLabel: {
                              show: true,
                              textStyle: {
                                  color: "#ebf8ac" //X轴文字颜色
                              }
                          },*/
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,0.3)',
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
                                color: "rgba(255,255,255,0.3)"
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
                                    color: "rgba(255,255,255,0.3)"
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
                        symbol: 'none',  //取消折点圆圈
                        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                        smooth: false, //平滑曲线显示
                        showAllSymbol: true, //显示所有图形。
                        itemStyle: {
                            //折线拐点标志的样式
                            color: "rgba(62, 176, 255, 1)"
                        },
                        lineStyle: {
                            color: "rgba(62, 176, 255, 1)"
                        },
                        areaStyle: {
                            color: "rgba(5,140,255, 0.1)"
                        },
                        data: [70, 80, 70, 80, 70, 60, 70, 60, 80, 60, 50, 60, 70]
                    },
                        {
                            type: "line",
                            symbol: 'none',  //取消折点圆圈
                            yAxisIndex: 2, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                            smooth: false, //平滑曲线显示

                            showAllSymbol: true, //显示所有图形。
                            itemStyle: {
                                //折线拐点标志的样式
                                color: "rgba(255, 154, 55, 1)"
                            },
                            lineStyle: {
                                color: "rgba(255, 154, 55, 1)"
                            },
                            areaStyle: {
                                color: "rgba(255, 154, 55, .1)"
                            },
                            data: [90, 95, 93, 89, 85, 94, 100, 92, 94, 90, 87, 89, 98]
                        },
                        {
                            type: "bar",
                            barWidth: 10,
                            itemStyle: {
                                normal: {}
                            },
                            data: [2500, 1500, 1750, 1800, 1200, 1550, 1000, 1200, 1400, 1600, 1200, 1550, 1600,]
                        }
                    ]
                };
                chart.setOption(option)
            },
            setCirChart() {
                let color = ['#FFBC3C', '#E78035', '#3EC6FF', '#FF4D36']
                this.$echarts.dispose(this.$refs.circhart);
                let chart = this.$echarts.init(this.$refs.circhart);
                let data = [
                    {value: 98, name: '党委大会'},
                    {value: 98, name: '党组小组'},
                    {value: 98, name: '支部委员会'},
                    {value: 23, name: '党课'},
                ];
                let option = {
                    legend: {
                        orient: 'vertical',
                        right: 10,
                        top: 50,
                        itemWidth: 20,
                        itemHeight: 20,
                        icon: 'diamond',
                        data: ['党委大会', '党组小组', '支部委员会', '党课'],
                        formatter: function (name) {
                            let target;
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].name === name) {
                                    target = data[i].value
                                }
                            }
                            let arr = ["{a|" + name + "}", "{b|" + target + "}"]
                            return arr.join();
                        },
                        textStyle: {
                            rich: {
                                a: {
                                    fontSize: 18,
                                    color: "#FFFFFF",
                                    padding: 10,
                                    width: 90
                                },
                                b: {
                                    fontSize: 18,
                                    color: "#FFFFFF"
                                }
                            }
                        }
                    },
                    series: [
                        {
                            center: ['35%', '50%'],
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'left'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: (arg) => {
                                        return color[arg.dataIndex]
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 335, name: '党委大会'},
                                {value: 310, name: '党组小组'},
                                {value: 234, name: '支部委员会'},
                                {value: 234, name: '党课'}]
                        }
                    ]
                };
                chart.setOption(option)

            },

            setCirChart1() {
                this.$echarts.dispose(this.$refs.circhart1);
                let chart = this.$echarts.init(this.$refs.circhart1);
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    series: [{
                        name: '案件来源',
                        type: 'pie',
                        radius: ['20%', '70%'],
                        roseType: 'area',
                        data: [
                            {
                                value: 89,
                                name: '35岁以下\n17.33%'
                            },
                            {
                                value: 123,
                                name: '60岁以上\n9.45%'
                            },
                            {
                                value: 189,
                                name: '35岁-36岁\n73.22%'
                            },


                        ],
                        label: {
                            show: true,
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: 20,
                            formatter: function (params) {
                                return [
                                    `{a|${params.name}}`
                                ].join('\n')
                            },
                            rich: {
                                a: {
                                    fontSize: 18,
                                    fontWeight: '400',
                                    fontFamily: 'Microsoft YaHei',
                                    color: 'rgba(255,255,255,.7)',
                                    lineHeight: 20,
                                },
                                b: {
                                    fontSize: 50,
                                    fontWeight: '400',
                                    fontFamily: 'FuturaStd-Heavy',
                                    color: 'rgba(255,255,255,1)',
                                    lineHeight: 30,
                                }
                            }
                        },
                        itemStyle: {
                            color: function (params) {
                                let color = [
                                    'rgba(255, 138, 52, 0.64)',
                                    'rgba(255, 72, 29, 0.64)',
                                    'rgba(255, 54, 39, .64)',
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
                if (e.target.dataset.bc) {
                    if (e.target.dataset.bc == 'zuzhi') {
                        this.selected = true
                        console.log(e.target.dataset.index)
                    } else {
                        this.selected = false
                    }
                    this.setCirChart1()
                }
            },
            setRadarChart() {
                this.$echarts.dispose(this.$refs.radarchart);
                this.chart = this.$echarts.init(this.$refs.radarchart);
                //把线颜色和区域颜色先用变量存起来
                let lineStyle_this = '';
                let areaStyle_this = '';
                let lineStyle_last = '';
                let areaStyle_last = '';
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        show: true,
                        formatter: function (params) {
                            let res = `${params.seriesName}:<br />
										组织建设:${params.data[0]}<br />
										制度建设:${params.data[1]}<br />
										作风建设:${params.data[2]}<br />
										反腐倡廉建设:${params.data[3]}<br />
										思想建设:${params.data[4]}<br />`
                            return res
                        }
                    },
                    radar: {
                        indicator: [
                            {name: '组织建设', max: 5000},
                            {name: '制度建设', max: 5000},
                            {name: '作风建设', max: 5000},
                            {name: '反腐倡廉建设', max: 100},
                            {name: '思想建设', max: 100},
                        ],
                        radius: '70%',
                        center: ['50%', '50%'],
                        shape: 'circle',
                        splitNumber: 4,
                        name: {
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 22
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['rgba(255,255,255,0.1)',
                                    'rgba(255,255,255,0.03)', 'rgba(255,255,255,0.1)',
                                    'rgba(255,255,255,0.03)']
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: [
                                    '#6b6b6b', '#6b6b6b',
                                    '#6b6b6b', '#6b6b6b',
                                    '#6b6b6b', '#6b6b6b'
                                ].reverse(),
                                width: 3
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(238,238,238, 0.2)'
                            }
                        }
                    },
                    series: [{
                        name: this.radarValue[0].name,
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        data: [this.radarValue[0].value],
                        symbol: 'circle',
                        symbolSize: 12,
                        itemStyle: {
                            color: 'rgba(255, 54, 39, .64)',
                            borderColor: 'rgba(255, 51, 4, 0.5)',
                            borderWidth: 3,
                        },
                        areaStyle: areaStyle_last,
                        lineStyle: lineStyle_last,

                    },/*{
                        name:this.radarValue[1].name,
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        data: [this.radarValue[1].value],
                        symbol: 'circle',
                        symbolSize:12,
                        itemStyle: {
                            color:'rgba(87,201,255,0.8)',
                            borderColor:'rgba(87,201,255,0.2)',
                            borderWidth:12,
                        },
                        areaStyle:areaStyle_this,
                        lineStyle:lineStyle_this,

                    }*/]
                };
                this.chart.setOption(option)
            },

            setlineCharts() {
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
                                color: 'rgba(255,255,255,1)',
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
                            smooth: true,
                            showSymbol: false,
                            itemStyle: {
                                color: '#FF2E12'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(255,46,18,1)',
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
                                        color: 'rgba(255,46,18,.9)' // 0% 处的颜色
                                    }, {
                                        offset: 0.9,
                                        color: 'rgba(255,46,18,0)' // 100% 处的颜色
                                    }],
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
                                color: '#D5D5D5'
                            },
                            lineStyle: {
                                normal: {
                                    color: '#D5D5D5',
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
                                        offset: 0.9,
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
                                color: 'rgba(4,130,226,1)'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(4,130,226,1)',
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
                                        offset: 0.9,
                                        color: 'rgba(4,130,226, 0)' // 100% 处的颜色
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
    .pointStyle {
        border-color: rgba(255, 255, 0, 0.2) !important;
        background-color: rgba(255, 255, 0, 0.8) !important;
    }

    .bgImg1 {
        position: absolute;
        top: -4px;
        left: -40px;
        display: inline-block;
        width: 223px;
        height: 61px;
        opacity: 0.8;
    }

    .bgImg2 {
        position: absolute;
        top: 1px;
        left: 45px;
        z-index: 9;
        display: none;
        width: 223px;
        height: 40px;
        opacity: 0.5;
    }

    .bgImg2_1 {
        position: absolute;
        top: 1px;
        left: 45px;
        z-index: 9;
        display: none;
        width: 223px;
        height: 40px;
        opacity: 0.5;
    }

    .bgImg2_2 {
        position: absolute;
        top: 1px;
        left: 45px;
        z-index: 9;
        display: inline-block;
        width: 223px;
        height: 40px;
        opacity: 0.5;
    }

    /*background: url(/img/bg_djyl_bt@2x.166da6a3.png) no-repeat center center;*/
    .ul {
        position: relative;
        top: 0px;
        left: 0px;
        overflow: hidden;
    }

    .line1 {
        position: absolute;
        top: 20px;
        left: 32.5px;
        display: inline-block;
        width: 0px;
        border-left: 5px solid rgba(255, 255, 255, 0.2);
        height: 94%;
        z-index: 8;
    }

    .line1Bug {
        position: absolute;
        bottom: 8px;
        left: 0px;
        z-index: 9;
        display: inline-block;
        width: 50px;
        height: 10px;
        /* background-color: rgb(12,49,70);*/

    }

    .ul2 {
        position: relative;
        top: 0px;
        left: 0px;
        overflow: hidden;
    }

    .line2 {
        position: absolute;
        top: 20px;
        left: 64px;
        display: inline-block;
        width: 0px;
        border-left: 5px solid rgba(255, 255, 255, 0.2);
        height: 94%;
        z-index: 8;
    }

    .lis3 {
        position: relative;
        top: 0px;
        left: 0px;
        height: 40px;
        background-color: rgba(0, 0, 0, 0.00001);

        * {
            pointer-events: none;
        }
    }

    .line2Bug {
        position: absolute;
        bottom: 0px;
        left: 50px;
        z-index: 9;
        display: inline-block;
        width: 30px;
        height: 14px;
        background-color: rgba(8, 30, 43, 0.8);

    }

    .bgImg1 {

    }

    .lis {
        margin-left: 10px;
        line-height: 50px;
    }

    .lis2 {
        margin-left: 10px;
        line-height: 40px;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 10;
    }

    .bigPoint {
        position: relative;
        top: 24px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid rgba(0, 0, 0, 0.5);
        background-color: #ccc;
        margin: 0px 10px;
    }

    .littlePoint {
        position: relative;
        top: 24px;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 3px solid rgba(0, 0, 0, 0.5);
        background-color: #ccc;
        margin: 0px 10px;
    }

    .LeftDaoHang {
        display: inline-block;
        width: 350px;
        height: 680px;
        overflow: auto;
    }

    .bloom {
        text-shadow: 1px 1px 5px red, -1px -1px 5px red;
    }

    .DangZuZhiPop {
        z-index: 100;
        width: 2079px;
        height: 901px;
        padding: 10px 60px;
        display: flex;
        justify-content: flex-start;

        .topName {
            width: 223px;
            height: 61px;
            background: url("../../../../assets/common/images/ZuZhiJianShe/bg_djyl_bt@2x.png") no-repeat center center;
            background-size: 100% 100%;
            border-radius: 0px 0px 0px 20px;
            display: flex;
            align-items: center;
        }
    }

    .top {
        margin-bottom: 10px;
    }

    .left {
        .LeftDaoHang {
            overflow: auto;
            height: 680px;
        }

        width: 350px;
        margin-top: 100px;

        .top {
            width: 476px;

            span {
                margin-left: 53px;
                margin-bottom: 5px;
                width: 150px;
                height: 28px;
                font-size: 28px;
                line-height: 28px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(254, 255, 254, 1);
            }
        }

        label {
            padding-left: 24px;
        }

    }

    .right {
        margin-left: 30px;
        width: 1800px;
        height: 100%;

        .title {
            margin-left: 300px;

            div {
                font-size: 48px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);

                span {
                    margin-left: 15px;
                    font-size: 30px;
                    font-weight: bold;
                    color: #FF523C;
                }
            }

        }

        .rightMiddle {
            display: flex;
            margin-top: 30px;
            height: 359px;

            .middleLeft {
                flex: 1;

                .top {
                    width: 462px;

                    span {
                        margin-bottom: 3px;
                        margin-left: 53px;
                        width: 150px;
                        height: 28px;
                        font-size: 28px;
                        line-height: 28px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(254, 255, 254, 1);
                    }
                }

                .content {
                    p {

                        margin-bottom: 25px;
                        font-size: 22px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: rgba(161, 161, 161, 1);
                        line-height: 30px;

                        span {
                            font-size: 22px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: rgba(254, 255, 254, 1);
                            line-height: 30px;
                        }
                    }
                }

            }

            .middleCenter {
                flex: 1;

                .topName {
                    position: relative;
                }

                .abs {
                    position: absolute;
                    top: 126px;
                    margin-left: 53px;
                    width: 350px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }

                .example {
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-right: 160px;

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
                                    background: rgba(55, 168, 255, 1);
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
                                background: rgba(255, 154, 55, 1);
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
                                background: rgba(244, 79, 80, 1);
                            }
                        }

                    }
                }

                .barchart {
                    width: 507px;
                    height: 300px;

                }

            }

            .middleRight {
                flex: 1;

                .topName {
                    position: relative;
                }

                .abs {
                    position: absolute;
                    top: 126px;
                    margin-left: 53px;
                    width: 350px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }

                .circhart {
                    width: 525px;
                    height: 300px;
                }

                .info- {
                    width: 100px;
                    height: 40px;
                    position: absolute;
                    top: 320px;
                    right: 350px;

                    p {
                        font-size: 32px;
                        text-align: center;
                        font-weight: bold;
                        line-height: 40px;
                        height: 40px;
                    }
                }
            }
        }

        .rightFooter {
            display: flex;
            margin-top: 30px;
            height: 350px;

            .footerLeft {
                flex: 1;

                .top {
                    img {
                        margin-left: -90px;
                    }

                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .topName {
                        position: relative;
                    }

                    .select {
                        display: flex;
                        justify-content: flex-end;
                        margin-right: 90px;

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

                .abs {
                    position: absolute;
                    bottom: 358px;
                    margin-left: 53px;
                    width: 500px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }

                .circhart1 {
                    width: 460px;
                    height: 300px;
                }

            }

            .footerMiddle {
                flex: 1;

                .topName {
                    position: relative;
                }

                .abs {
                    position: absolute;
                    bottom: 358px;
                    margin-left: 53px;
                    width: 350px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }

                .radar {
                    width: 508px;
                    height: 300px;
                }

                .info-hege {
                    width: 100px;
                    height: 40px;
                    position: absolute;
                    top: 705px;
                    right: 790px;

                    p {
                        text-align: center;
                        font-weight: bold;
                        line-height: 29px;;
                        width: 62px;
                        height: 29px;
                        font-size: 30px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                        opacity: 0.8;
                        text-shadow: 1px 1px 2px rgba(228, 37, 37, 1), -1px -1px 2px rgba(228, 37, 37, 1);
                    }
                }

            }

            .footerRight {
                flex: 1;

                .topName {
                    position: relative;
                }

                .abs {
                    position: absolute;
                    bottom: 358px;
                    margin-left: 53px;
                    width: 350px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }

                .example {
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-right: 80px;

                    & > div {
                        font-size: 20px;

                        &:nth-child(1) {
                            display: flex;
                            align-items: center;
                            margin: 0 10px;

                            .rect {
                                width: 15px;
                                height: 9px;
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
                                width: 15px;
                                height: 9px;
                                margin: 0 5px;
                                background: #D5D5D5;
                            }
                        }

                        &:nth-child(3) {
                            display: flex;
                            align-items: center;
                            margin: 0 10px;

                            .rect {
                                width: 15px;
                                height: 9px;
                                margin: 0 5px;
                                background: #3992ED;
                            }
                        }

                    }
                }

                .charts {
                    width: 525px;
                    height: 260px;
                }

            }
        }
    }

    .dinWei {
        position: relative;
    }

    .changzhu {
        position: absolute;
        top: -25px;
        left: -30px;

    }

    .OneCeng {
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        opacity: 0.85;
    }

    .TwoCeng {
        margin-left: 45px;
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        opacity: 0.65;
        background-color: rgba(0, 0, 0, 0.02);

        * {
            pointer-events: none;
        }
    }

    .ThreeCeng {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 9999;
        margin-left: 79px;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        opacity: 0.65;
        width: 250px;
    }

    .changzhuThree {
        position: absolute;
        top: -25px;
        left: -30px;
    }

    .ChangeColor {
        div {
            color: rgba(255, 188, 60, 1)
        }
    }

</style>