<template>
    <div class="DangZuZhiPop">
        <!--   <div class="left">
               <div class="top">
                   <div class="topName">
                       <span>党组织导航</span>
                   </div>
               </div>
               <Menu style="width: 314px;" active-key="1-3" :open-names="['1']">

                   <Submenu name="1" active-key="1-3" >
                       <template slot="title">
                           州财政局机关党委
                       </template>
                       <MenuItem name="1-1">第一党支部</MenuItem>
                       <MenuItem name="1-2">第二党支部</MenuItem>
                       <MenuItem name="1-3">第三党支部</MenuItem>
                       <MenuItem name="1-4">第四党支部</MenuItem>
                   </Submenu>
                   <Submenu name="2">
                       <template slot="title">
                           州人民检察机关..
                       </template>
                       &lt;!&ndash;<MenuItem name="2-1">楚雄县党总支</MenuItem>
                       <MenuItem name="2-2">楚雄县党支部</MenuItem>
                       <MenuItem name="2-3">楚雄县党支部</MenuItem>&ndash;&gt;
                   </Submenu>
                   <Submenu name="3">
                       <template slot="title">
                           州人民法院机关..
                       </template>

                   </Submenu>
                   <Submenu name="4">
                       <template slot="title">
                           州文化和旅游局..
                       </template>

                   </Submenu>
                   <Submenu name="5">
                       <template slot="title">
                           州农业农村局机关
                       </template>

                   </Submenu>
                   <Submenu name="6">
                       <template slot="title">
                           州水务局机关党委
                       </template>

                   </Submenu>



               </Menu>
           </div>-->
        <div class="right">
            <div class="title">
                <div>楚雄市东瓜镇电信所党支部<span>中心党组织</span></div>
            </div>
            <div class="rightMiddle">
                <div class="middleLeft" >
                    <div class="top">
                        <div class="topName">
                            <span>基本信息</span>
                        </div>
                    </div>
                    <div class="content">
                        <p>名称：<span>楚雄市东瓜镇电信所党支部</span></p>
                        <p>党支部负责人：<span>张明华</span></p>
                        <p>联系电话：<span>12812415421</span></p>
                        <p>党员人数：<span>32</span></p>
                        <p>所属四级网络 <span>II1III2IV9</span></p>
                        <p>地址: <span>楚雄市鹿城北路117号</span></p>
                    </div>
                </div>
                <div class="middleCenter">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs">三会一课</div>
                        <div class="circhart" ref="circhart"></div>
                    </div>

                </div>
                <div class="middleRight">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs">三会一课开展趋势 <img style="margin-left: 7px;" :src="require('../../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')"></div>
                    </div>
                    <div class="chart" ref="YuanXianchart"></div>
                </div>
            </div>

            <div class="rightFooter">
                <div class="footerLeft">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs">掌上党校<img style="margin-left: 7px;" :src="require('../../../../assets/common/images/ZuZhiJianShe/icon_djyl_xz@2x.png')">
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
                        <div class="abs">党建活动</div>
                    </div>
                    <div class="barchart" ref="barchart"></div>
                </div>
                <div class="footerRight">
                    <div class="top">
                        <div class="topName">
                        </div>
                        <div class="abs">活跃党支部排名</div>
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
    import SharpProgressBar from "./SharpProgressBarTwo.vue";

    export default {
        name: "DangZuZhiPop",
        data() {
            return {
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
                                    return d.replace(/^\W{2}/,(e) => {
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
                let arr = ['3月','4月','5月','6月','7月','8月',]
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
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 18,
                            },
                            margin:15
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
                        x: 'right',
                        y: "middle",
                        data: ['党委大会', '党组小组', '支部委员会','党课'],
                        formatter:function(name){
                            let target;
                            for(let i=0;i<data.length;i++){
                                if(data[i].name===name){
                                    target=data[i].value
                                }
                            }
                            let arr=["{a|"+target+"}","{b|"+name+"}"]
                            return arr.join()

                        },
                        textStyle:{
                            rich:{
                                a:{
                                    fontSize:18,
                                    color:"#FFFFFF",
                                    padding:10
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
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 18,
                            },
                            margin:15
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
                    this.radarValue[0].name=this.getMonthcalc(-2)+'月';
                    this.radarValue[1].name=this.getMonthcalc(-1)+'月';
                    this.muck.carOutOfLine[0].month=this.getMonthcalc(-2);
                    this.muck.carOutOfLine[1].month=this.getMonthcalc(-1);
                    this.muck.dutyFinish[0].month=this.getMonthcalc(-2);
                    this.muck.dutyFinish[1].month=this.getMonthcalc(-1);
                    this.setRadarChart()
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
    .DangZuZhiPop{
        z-index: 100;
        width:1800px;height:901px;padding:10px 60px;display: flex;justify-content: flex-start;
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
    .top{
        margin-bottom: 10px;
    }
    .left{
        width: 350px;
        margin-top: 100px;
        .top{
            width: 476px;
            span {
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
        label{
            padding-left: 24px;
        }

        //宽
        /deep/element.style{
            width: 300px!important;
        }
        .element.style {
            width: 300px;
        }
        //整体背景
        /deep/.ivu-menu-light{
            background: none;
        }
        //字体颜色
        /deep/.ivu-menu{
            color: white;
        }
        //hover
        /deep/.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
            background: none;
        }
        .ivu-menu {
            display: block;
            margin: 0;
            padding: 0;
            outline: 0;
            list-style: none;
            position: relative;
            z-index: 900;
            font-size:28px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(255,255,255,1);
            opacity:0.85;
        }
        .ivu-menu-item {
            display: block;
            outline: 0;
            list-style: none;
            position: relative;
            z-index: 1;
            cursor: pointer;
            transition: all .2s ease-in-out;
            font-size:24px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(255,255,255,1);
            opacity:0.65;
        }
        .ivu-menu-submenu-title {
            padding: 0;

        }
    }
    .right{
        margin-left:30px;
        width: 1800px;height: 100%;
        .title{
            text-align: center;
            div{
                font-size:48px;
                font-family:Microsoft YaHei;
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-shadow: 1px 1px #FF523C;
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
                flex: 1;
                .topName{
                    position: relative;
                }
                .abs {
                    position: absolute;
                    top:127px;
                    margin-left: 53px;
                    width: 350px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }
                .circhart{
                    margin-right: 50px;
                    width: 460px;
                    height: 300px;
                }

            }
            .middleRight{
                flex: 1;
                .topName{
                    position: relative;
                }
                .abs {
                    position: absolute;
                    top:127px;
                    margin-left: 53px;
                    width: 350px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
                }
                .chart{
                    width: 460px;
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
                    bottom:357px;
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
                    bottom:357px;
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
                flex: 1;
                .topName{
                    position: relative;
                }
                .abs {
                    position: absolute;
                    bottom:357px;
                    margin-left: 53px;
                    width: 350px;
                    height: 28px;
                    font-size: 28px;
                    line-height: 28px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: rgba(254, 255, 254, 1);
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
                    width: 460px;
                    height: 260px;
                }

            }
        }
    }
</style>