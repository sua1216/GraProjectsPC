<template>
    <div class="DangZuZhiPop">
        <div class="left">
            <div class="top">
                <div class="topName">
                    <span class="bloom">党组织导航</span>
                </div>
            </div>
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
                                        <img v-show="show0" :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")' alt="" class="bgImg1">
                                        <div class="changzhu">
                                            <span class="bigPoint"></span>
                                        </div>
                                        <span class="lis">{{daohangData.children[0].name}}</span>
                                    </div>

                                    <!--第一党支部  第三层......................-->
                                    <ul v-show="show0" class="ul2">
                                        <li class="line2"></li>
                                        <span class="line2Bug"></span>
                                        <li class="lis3" v-for="(item,index) in daohangData.children[0].chilren" @click="change(0,index,$event)" :key="index+'---'">
                                            <img :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")' alt="" :class="['bgImg2',index==0?'bgImg2_2':'']">
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
                                        <img v-show="show1" :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")' alt="" class="bgImg1">
                                        <div class="changzhu">
                                            <span class="bigPoint"></span>
                                        </div>
                                        <span class="lis">{{daohangData.children[1].name}}</span>
                                    </div>

                                    <!--第一党支部  第三层  ......................-->
                                    <ul v-show="show1" class="ul2">
                                        <li class="line2"></li>
                                        <span class="line2Bug"></span>
                                        <li class="lis3" v-for="(item,index) in daohangData.children[1].chilren" @click="change(1,index,$event)" :key="index+'---'">
                                            <img :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")' alt="" class="bgImg2">
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
                                        <img v-show="show2" :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")' alt="" class="bgImg1">
                                        <div class="changzhu">
                                            <span class="bigPoint"></span>
                                        </div>
                                        <span class="lis">{{daohangData.children[2].name}}</span>
                                    </div>

                                    <!--第一党支部  第三层......................-->
                                    <ul v-show="show2" class="ul2">
                                        <li class="line2"></li>
                                        <span class="line2Bug"></span>
                                        <li class="lis3" v-for="(item,index) in daohangData.children[2].chilren" @click="change(2,index,$event)" :key="index+'---'">
                                            <img :src='require("../../../../assets/common/images/ZuZhiJianShe/lisimg.png")' alt="" class="bgImg2">
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
        <div class="right">
            <div class="title">
                <div>中国共产党楚雄彝族自治州财政局第三支部委员会</div>
            </div>
            <div class="rightMiddle">
                <div class="middleLeft" >
                    <div class="top">
                        <div class="topName">
                            <span class="bloom">基本信息</span>
                        </div>
                    </div>
                    <div class="content">
                        <p>名称：<span>楚雄彝族自治州财政局第三支部委员会</span></p>
                        <p>党支部负责人：<span>张明华</span></p>
                        <p>联系电话：<span>12812415421</span></p>
                        <p >
                            党员人数：
                            <span>32</span>
                            <img style="margin-left: 7px;position:relative;top:3px;" :src="require('../../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')">
                        </p>
                        <p>所属四级网络 <span>II1III2IV9</span></p>
                        <p>地址: <span>楚雄市鹿城北路117号</span></p>
                    </div>
                </div>
                <div class="middleCenter">
                    <div class="top">
                        <div class="topName">
                            <div class="abs">
                                <span class="bloom">
                                    三会一课
                                    <img style="position:relative;top:3px;" :src="require('../../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')">
                                </span>

                            </div>
                        </div>

                        <div class="circhart" ref="circhart"></div>
                        <div class="info-">
                            <p>3254</p>
                        </div>
                    </div>

                </div>
                <div class="middleRight">
                    <div class="top">
                        <div class="topName">
                            <div class="abs">
                                <span class="bloom">三会一课开展趋势</span>
                            </div>
                        </div>
                    </div>
                    <div class="chart" ref="YuanXianchart"></div>
                </div>
            </div>

            <div class="rightFooter">
                <div class="footerLeft">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs">
                            <span class="bloom">掌上党校</span>
                            <img style=" margin-left: 5px;position:relative;top:3px;" :src="require('../../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')">
                        </div>
                    </div>
                    <div class="topContent-holder">
                        <div class="template-row">
                            <div class="tit-box">学习<br />人数</div>
                            <SharpProgressBar :width="150" :height="30" :title="getMonthcalc(-1)+'月'" :d="muck.carOutOfLine"></SharpProgressBar>
                        </div>
                        <div class="template-row">
                            <div class="tit-box">学习<br />时长</div>
                            <SharpProgressBar :width="150" :height="30" :title="getMonthcalc(-2)+'月'" :d="muck.dutyFinish"></SharpProgressBar>

                    </div>
                    </div>
                </div>
                <div class="footerMiddle">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs">
                            <span class="bloom">党建活动</span>
                        </div>
                    </div>
                    <div class="barchart" ref="barchart"></div>
                </div>
                <div class="footerRight">
                    <div class="top">
                        <div class="topName">
                            <div class="abs">
                                <span class="bloom">活跃党支部排名</span>
                            </div>
                        </div>
                    </div>
                    <div class="charts" ref="lineChart"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import SharpProgressBar from "./SharpProgressBarTwo.vue";

    export default {
        name: "DangZuZhiPop",
        data() {
            return {
                show:false,
                show0:true,
                show1:false,
                show2:false,

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
                muck:{},
                selected:true,
                radarValue:[{
                    name:'5月',
                    value:[3641,3481,3371,93,95.7]
                }],
            }
        },
        components:{
            SharpProgressBar
        },
        created:function(){
              this.req()
        },
        mounted: function (){
            let that  = this;
            setTimeout(function (){
                that.setCirChart();
                that.setlineCharts();
                that.setLineChart();
                that.setBarChart();

            },0)
        },
        methods: {
            change2(index,e) {
                var imgs = document.getElementsByClassName("bgImg2")
                for(var i=0;i<imgs.length;i++){
                    document.getElementsByClassName("bgImg2")[i].classList.add("bgImg2_1")
                    document.getElementsByClassName("bgImg2")[i].classList.remove("bgImg2_2")
                }
                e.target.nextSibling.childNodes[2].childNodes[0].classList.add("bgImg2_2")
                e.target.nextSibling.childNodes[2].childNodes[0].classList.remove("bgImg2_1")
                //console.log(e.target.nextSibling.childNodes[2].childNodes[0])
                if(index==0){
                    this.show0=!this.show0
                    if(this.show1==true){
                        this.show1=!this.show1
                    }
                    if(this.show2==true){
                        this.show2=!this.show2
                    }

                }else if(index==1){
                    this.show1 = !this.show1
                    if(this.show0==true){
                        this.show0=!this.show0
                    }
                    if(this.show2==true){
                        this.show2=!this.show2
                    }
                }else if(index==2){
                    this.show2 = !this.show2
                    if(this.show0==true){
                        this.show0=!this.show0
                    }
                    if(this.show1==true){
                        this.show1=!this.show1
                    }
                }
            },
            change(index,index2,index3) {//一层index  二层index  当前dom元素
                //console.log(index)
                if(index3){
                    var imgs = document.getElementsByClassName("bgImg2")
                    for(var i=0;i<imgs.length;i++){
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
            setBarChart:function(){
                let THIS = this;
                let data = [
                    {name:'民生评议党员',score:'95'},
                    {name:'民生生活会',score:'96'},
                    {name:'组织生活会',score:'95'},
                    {name:'主题党日',score:'96'},
                    {name:'创新组织生涯',score:'95'},
                ]
                let chart = this.$echarts.init(this.$refs.barchart);
                let arry = {
                    name : [],
                    value: []
                };
                for(let item of data){
                    arry.name.push(item.name)
                    arry.value.push(Number(item.score))
                }
                let maxNum = arry.value[0]
                let option = {
                    grid:{
                        left:'10%',
                        top:'10%',
                        right:'5%',
                        bottom:50
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: true,
                        data:  arry.name,
                        axisLabel: {
                            show: true,
                            // interval: 0,
                            textStyle: {
                                color: '#b2b2b2',
                                fontSize: 15,
                                baseline: 'top',
                                width:10,
                                height:10,
                                margin:10,
                            },

                            formatter(d){
                                if(d.length >= 2){
                                    return d.replace(/^\W{3}/,(e) => {
                                        return e + '\n'
                                    })
                                }else{
                                    return d
                                }
                            },
                        },
                        axisTick:false,
                        axisLine: {
                            show:true,
                            lineStyle:{
                                color:'#81848b',
                                width:2
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
                                width:2
                            },
                            margin:13
                        },
                        axisTick:false,
                        // minInterval: 1,
                        axisLine: {
                            show:false,
                            lineStyle:{
                                color:'#81848b',
                                width:2
                            }
                        },
                        splitNumber:4,
                        splitLine:{
                            show:false
                        }
                    },
                    series: [
                        {
                            name:'数量',
                            type:'bar',
                            data:arry.value,
                            symbol:'none',
                            barWidth: 13,
                            label:{
                                show:true,
                                position:'top',
                                color:'#fff',
                                fontSize:20
                            },
                            color:function(params){
                                if(params.dataIndex%2){
                                    return new THIS.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#FFFFFF'},
                                            {offset: .5, color: 'rgba(255, 255, 255,.5)'},
                                            {offset: 1, color: 'rgba(255, 255, 255,.1)'}
                                        ]
                                    )
                                }else{
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
            setLineChart(){
                //绘制折线图
                let arr = ['13月','4月','5月','6月','7月','8月',]
                this.$echarts.dispose(this.$refs.YuanXianchart);
                let chart = this.$echarts.init(this.$refs.YuanXianchart)
                let option = {
                    tooltip:{
                        show:true
                    },
                    xAxis: {
                        type: 'category',
                        data: arr,
                        axisTick: false,
                        boundaryGap:false,
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,.7)',
                                fontSize: 18
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 2,
                                color: 'rgba(255,255,255,.7)'
                            }
                        }
                    },
                    grid:{
                        left:60,
                        bottom:30,
                        top:20,
                        right:30
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: false,
                        splitLine: false,
                        axisLine: {
                            show: false,

                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 18,
                            },
                            margin:15,


                        }
                    },
                    series: [
                        {
                            data: [240, 160,270,230,310,200,],
                            name: '工单数',
                            type: 'line',
                            smooth: true,
                            showSymbol: false,
                            itemStyle: {
                                color: 'rgba(255, 196, 53, .6)'
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(255, 196, 53, 1)',
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
                                        color: 'rgba(255, 196, 53, 0.4)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255, 196, 53, 0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },

                    ]
                };
                chart.setOption(option)

            },
            setCirChart() {
                let color = ['#FFBC3C','#E78035','#3EC6FF','#FF4D36']
                this.$echarts.dispose(this.$refs.circhart);
                let chart = this.$echarts.init(this.$refs.circhart);
                let data=[
                    {value: 98, name: '党委大会'},
                    {value: 98, name: '党组小组'},
                    {value: 98, name: '支部委员会'},
                    {value: 23, name: '党课'},
                ];
                let option = {
                    legend: {
                        orient: 'vertical',
                        right:10,
                        top:50,
                        itemWidth:20,
                        itemHeight:20,
                        icon:'diamond',
                        data: ['党委大会', '党组小组', '支部委员会','党课'],
                        formatter:function(name){
                            let target;
                            for(let i=0;i<data.length;i++){
                                if(data[i].name===name){
                                    target=data[i].value
                                }
                            }
                            let arr=["{a|"+name+"}","{b|"+target+"}"]
                            return arr.join()

                        },
                        textStyle:{
                            rich:{
                                a:{
                                    fontSize:18,
                                    color:"#FFFFFF",
                                    padding:10,
                                    width:90
                                },
                                b:{
                                    fontSize:18,
                                    color:"#FFFFFF"
                                }
                            }
                        }
                    },
                    series: [
                        {
                            center : [ '35%', '50%' ],
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
                            itemStyle:{
                                normal:{
                                    color:(arg) =>{
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

            setlineCharts(){
                let arr = ['3月','4月','5月','6月','7月','8月',]
                let chart = this.$echarts.init(this.$refs.lineChart)
                let option = {
                    tooltip:{
                        show:true
                    },
                    xAxis: {
                        type: 'category',
                        data: arr,
                        axisTick: false,
                        boundaryGap:false,
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,.7)',
                                fontSize: 18
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 2,
                                color: 'rgba(255,255,255,.7)'
                            }
                        }
                    },
                    grid:{
                        right:40,
                        left:60,
                        top:40,
                        bottom:50
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
                            }
                        }
                    },
                    series: [
                        {
                            data: [320,240,270,380,220,240],
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
                                        color: 'rgba(255,46,18,0.5)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,46,18,0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        },
                    ]
                };
                chart.setOption(option)
            },
            req(){
                this.axios({
                    url:window.baseURL + '/runningStatus'
                }).then(d => {
                    this.digitalCityManager = d.data.digitalCityManager
                    this.enforce = d.data.enforce
                    this.citizenService = d.data.citizenService
                    this.muck = d.data.muck;
                   /* this.radarValue[0].name=this.getMonthcalc(-2)+'月';
                    this.radarValue[1].name=this.getMonthcalc(-1)+'月';
                    this.muck.carOutOfLine[0].month=this.getMonthcalc(-2);
                    this.muck.carOutOfLine[1].month=this.getMonthcalc(-1);
                    this.muck.dutyFinish[0].month=this.getMonthcalc(-2);
                    this.muck.dutyFinish[1].month=this.getMonthcalc(-1);*/
                  /*  this.setRadarChart()*/
                    this.$forceUpdate()
                })
            },
            getMonthcalc(m){
                let res = Number(this.renderdate)+m;
                if(res==0){res=12}
                if(res==-1){res=11}
                return res
            },



        }
    }
</script>

<style scoped lang="scss">
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
        border-left: 5px solid rgba(255,255,255,0.2);
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
        border-left: 5px solid rgba(255,255,255,0.2);
        height: 94%;
        z-index: 8;
    }

    .lis3 {
        position: relative;
        top: 0px;
        left: 0px;
        height: 40px;
        background-color: rgba(0,0,0,0.00001);
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
        background-color: rgba(8, 30, 43,0.8);

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
        border: 3px solid rgba(0,0,0,0.5);
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
        border: 3px solid rgba(0,0,0,0.5);
        background-color: #ccc;
        margin: 0px 10px;
    }
    .LeftDaoHang {
        display: inline-block;
        width: 350px;
        height: 680px;
        overflow: auto;
    }


    .DangZuZhiPop{
        z-index: 100;
        width:2079px;height:901px;padding:10px 60px;display: flex;justify-content: flex-start;
        .topName {
            width: 223px;
            height: 61px;

            background: url("../../../../assets/common/images/ZuZhiJianShe/bg_djyl_bt@2x.png") no-repeat center center;
            background-size: 100% 100%;
            border-radius: 0px 0px 0px 20px;
            vertical-align: middle;
            display: flex;
            align-items: center;

        }
    }
    .bloom{
        text-shadow: 1px 1px 5px red,-1px -1px 5px red;
    }
    .top{
        margin-bottom: 10px; 
    }
    .left{
        width: 350px;
        margin-top: 100px;
        .LeftDaoHang{
            height: 680px;
             overflow: auto;
        }
        .top{
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
        label{
            padding-left: 24px;
        }

    }
    .right{
        margin-left:30px;
        width: 1800px;height: 100%;
        .title{
            padding-left: 30px;
            div{
                font-size:48px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-shadow: 1px 1px 5px #FF523C,-1px -1px 5px #FF523C;
                span{
                    margin-left: 15px;
                    font-size:30px;
                    font-weight:bold;
                    text-shadow: none;
                    color:#FF523C;
                }
            }

        }
        .rightMiddle{
            display: flex;margin-top: 30px;
            height: 359px;
            .middleLeft{
                flex:1;
                .top{
                    width: 476px;
                    span {
                        margin-left: 53px;
                        margin-bottom: 3px;
                        width: 150px;
                        height: 28px;
                        font-size: 28px;
                        line-height: 28px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: rgba(254, 255, 254, 1);
                    }
                }
                .content{
                    p{
                        margin-bottom: 25px;
                        font-size:22px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(161,161,161,1);
                        line-height:30px;
                        span{
                            font-size:22px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            color:rgba(254,255,254,1);
                            line-height:30px;
                        }
                    }
                }

            }
            .middleCenter{
                flex: 1;position: relative;
                .topName{
                    .abs {
                        margin-bottom: 3px;width: 350px;font-size: 28px;font-weight: bold;color: rgba(254, 255, 254, 1);margin-left:50px;
                    }
                }
                .circhart{
                    margin-right: 50px;margin-top:10px;width: 460px;height: 300px;
                }
                .info-{
                    width:100px;height:40px;position:absolute;top:200px;left:112px;
                    p{
                        font-size:32px;text-align: center;font-weight: bold;line-height: 40px;height:40px;
                    }
                }

            }
            .middleRight{
                flex: 1;
                .topName{
                    position: relative;
                    .abs {
                        margin-bottom: 3px; margin-left: 50px;font-weight: bold;color: rgba(254, 255, 254, 1);font-size:28px;word-break: keep-all;
                    }
                }

                .chart{
                    width: 100%;
                    height: 300px;
                }
            }
        }
        .rightFooter{
            display: flex;margin-top: 30px;
            height: 350px;
            .footerLeft{
                flex: 1;
                .top{
                    display: flex;justify-content: space-between;align-items: center;
                    .topName {
                        position: relative;
                    }
                }
                .abs {
                    position: absolute;
                    bottom:359px;
                    margin-left: 53px;
                    width: 500px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }
                .topContent-holder{
                    padding-top: 40px;
                    height: calc(100% - 90px);
                    display: grid;
                    grid-template-rows: repeat(2,50px);
                    grid-template-columns: 1fr;
                    grid-row-gap: 64px;
                    .template-row/deep/g text:nth-child(4){
                        font-size: 24px;
                    }
                    .template-row/deep/g text:nth-child(2){
                        font-size: 20px;
                    }
                    .template-row/deep/.title{
                        display: none;
                    }
                    .tit-box{
                        background:rgba(255,255,255,.1);
                        position: relative;
                        font-size:24px;
                        font-family:MicrosoftYaHei;
                        font-weight:400;
                        color:rgba(254,255,254,1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:before{
                            content: '';
                            height: 4px;width: 4px;position: absolute;background: rgba(255,255,255,.6);top: -2px;left: -2px;
                        }
                        &:after{
                            content: '';
                            height: 4px;width: 4px;position: absolute;background: rgba(255,255,255,.6);bottom: -2px;left: -2px;
                        }
                    }

                    .template-row{
                        display: grid;
                        grid-template-rows: 1fr;
                        grid-template-columns: 84px 1fr;
                        grid-column-gap: 24px;
                    }
                }

            }
            .footerMiddle{
                flex: 1;
                .topName{
                    position: relative;
                }
                .abs {
                    position: absolute;
                    bottom:359px;
                    margin-left: 53px;
                    width: 350px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }
                .barchart{
                    width: 460px;
                    height: 300px;
                }

            }
            .footerRight{
                flex: 1;height:380px;
                .topName{

                    .abs {
                        width: 400px;height: 28px;font-size: 28px;line-height: 28px;font-weight: bold;color: rgba(254, 255, 254, 1);margin-left:50px;white-space: nowrap;
                    }

                }

                .example{
                    height:40px;display:flex;align-items: center;justify-content: flex-end;margin-right:20px;
                    &>div{
                        font-size:20px;
                        &:nth-child(1){
                            display:flex;align-items: center;margin:0 10px;
                            .rect{
                                width:20px;height:10px;margin:0 5px;
                                &:nth-child(1){
                                    background:#FF2E12;
                                }
                            }
                        }&:nth-child(2){
                             display:flex;align-items: center;margin:0 10px;
                             .rect{
                                 width:20px;height:10px;margin:0 5px;background:#D5D5D5;
                             }
                         }
                        &:nth-child(3){
                            display:flex;align-items: center;margin:0 10px;
                            .rect{
                                width:20px;height:10px;margin:0 5px;background:#3992ED;
                            }
                        }

                    }
                }
                .charts{
                    height: 300px;width:100%;
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

    }

    .ThreeCeng {
        position: relative;
        margin-left: 79px;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        opacity: 0.65;
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