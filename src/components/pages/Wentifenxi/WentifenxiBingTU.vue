<template>
<!--问题分析饼图-->
    <div id="bingTu" style="width: 500px;height: 220px;"></div>

</template>

<script>
    export default {
        name: "WentifenxiBingTu",
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('bingTu'))
                // 绘制图表
                myChart.setOption({
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b}:</br> {c} ({d}%)"
                    },
                    color:["rgb(172,66,42)","rgb(171,107,55)","rgb(130,74,23)","rgb(171,76,36)","rgb(172,123,52)"],
                    series : [
                        {
                            name:'问题处置分析',
                            type:'pie',
                            radius : [30, 110],
                            center : ['55%', '50%'],
                            roseType : 'area',
                            data:[
                                {value:25, name:'专业网格员处办'},
                                {value:63, name:'党组织任务、活动'},
                                {value:82, name:'各级自行处办'},
                                {value:53, name:'专职网格员处办'},
                                {value:91, name:'自发自处'}
                            ],
                            itemStyle: {
                                borderWidth:1,
                                borderColor:'rgba(254, 162, 90, 1)'
                            },
                            label:{
                                fontSize:20,
                                color: 'rgba(255,255,255,0.8)',
                                // formatter: function (a) {
                                //     console.log(a)
                                //     //return a.name+"\n"+"<div style='font-size:24px;color:white;'"+a.value+"</div>"
                                //     return a.name+"\n"+"<p class='pie'>"+a.value+"</p>"
                                // },
                                formatter: function(a) {
                                    return '{gray|' + a.name +"\n"+'}'+'{none|'+"\n"+'}'+'{white|' + a.value +'}';
                                },
                                rich: {
                                    gray: {
                                        color: 'rgba(255,255,255,0.8)',
                                        fontSize: '22'
                                    },
                                    white: {
                                        color: 'white',
                                        fontSize: '28'
                                    },
                                    none:{

                                    }
                                }
                            }
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped>
    .pie {
        color: white;
    }
</style>