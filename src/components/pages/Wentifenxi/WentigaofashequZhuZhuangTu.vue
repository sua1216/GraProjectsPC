<template>
    <!--问题高发社区柱状图-->
    <div ref="wentigaofashequ" style="width:600px;height:300px;"></div>
</template>

<script>
    export default {
        name: "WentigaofashequZhuZhuangTu",
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                var _this = this;
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.wentigaofashequ)

                let data = [
                    {name:'富民社区',score:'100'},
                    {name:'彝人古镇社区',score:'69'},
                    {name:'车坪社区',score:'60'},
                    {name:'紫溪社区',score:'57'},
                    {name:'米市街社区',score:'38'}
                ]
                let arry = {
                    name : [],
                    value: []
                };
                for(let item of data){
                    arry.name.push(item.name)
                    arry.value.push(Number(item.score))
                }
                let maxNum = arry.value[0]

                // 绘制图表
                myChart.setOption({
                    grid:{
                        left:'10%',
                        top:'10%',
                        right:'5%',
                        bottom:'30'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: true,
                        data: arry.name,
                        axisLabel: {
                            show: true,
                            interval: 0,
                            textStyle: {
                                color: '#b2b2b2',
                                fontSize: 20,
                                baseline: 'top',
                                width:2
                            },
                            margin:10
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
                                fontSize: 18,
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
                                // formatter:function(params){
                                //     if(params.value == maxNum){
                                //         return params.value = 'TOP1'
                                //     }
                                // },
                                color:'#fff',
                                fontSize:20
                            },
                            color:function(params){
                                if(params.dataIndex%2){
                                    return new _this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#52FCF7'},
                                            {offset: .5, color: 'rgba(82, 252, 247,.5)'},
                                            {offset: 1, color: 'rgba(192, 247, 255,.1)'}
                                        ]
                                    )
                                }else{
                                    return new _this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#239DFA'},
                                            {offset: .5, color: 'rgba(35,157,250,.5)'},
                                            {offset: 1, color: 'rgba(82, 252, 247,.1)'}
                                        ]
                                    )
                                }
                            }
                        },
                    ]
                });
            }
        }
    }
</script>

<style scoped>

</style>