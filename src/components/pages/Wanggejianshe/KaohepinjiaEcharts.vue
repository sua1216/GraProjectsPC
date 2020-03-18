<template>
    <!--考核评价-->
    <div class="kao-he-pin-jia-echarts">
        <div id="myChart" :style="{width: '500px', height: '300px'}"></div>
    </div>
</template>

<script>

    export default {
        name: "KaohepinjiaEcharts",
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    radar: {
                        shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                fontSize:22
                            }
                        },
                        splitNumber: 4,
                        splitArea: {
                            areaStyle: {
                                color: [
                                    'rgba(255,255,255,0.1)',
                                    'rgba(255,255,255,0.03)',
                                    'rgba(255,255,255,0.1)',
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
                                width:3
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(238,238,238, 0.2)'
                            }
                        },
                        indicator: [
                            { name: '服务指数', max: 100},
                            { name: '活力指数', max: 100},
                            { name: '和谐指数', max: 100},
                            { name: '绩效指数', max: 100},
                            { name: '平安指数', max: 100}
                        ]
                    },
                    tooltip: {
                        formatter: params => {
                            //console.log(params)
                            let str = '服务指数：'+params.value[0]+`<br>`+`<br>`+'活力指数：'+params.value[1]+`<br>`+`<br>`+'和谐指数：'+params.value[2]+`<br>`+`<br>`+'绩效指数：'+params.value[3]+`<br>`+`<br>`+'平安指数：'+params.value[4];
                            // str += `<h6 style="color:#fff;font-size:13px;margin:4px 0">${params[0].name}</h6>`;
                            return str;
                        }
                    },
                    series: [{
                        name: '指数',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data : [
                            {
                                value : [96, 98, 97, 97.2, 95.1],
                                name : '考核评价：'
                            }
                        ],
                        symbolSize:8,
                        itemStyle: {
                            color:'rgba(13,178,255,0.8)',
                            borderColor:'rgba(13,178,255)',
                            borderWidth:4,
                        },
                        areaStyle: {color:'rgba(13,178,255,0.8)'},
                        lineStyle:{color:'rgba(13,178,255,0.8)'},
                    }]
                });
            }
        }
    }
</script>

<style scoped>
    .kao-he-pin-jia-echarts {
        margin-top: 20px;
    }
</style>