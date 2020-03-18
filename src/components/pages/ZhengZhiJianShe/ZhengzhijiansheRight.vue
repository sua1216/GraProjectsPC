<template>
    <div class="MAX">
        <div class="ZhengzhijiansheRight">
            <div class="top">
                <div class="topTitle bloom">
                    <div class="topName">
                    </div>
                    <span>掌上党校概况</span>
                </div>
                <div class="topContent">
                    <div class="topContent-holder">
                        <div class="template-row">
                            <div class="tit-box">学习<br/>人数</div>
                            <SharpProgressBar :width="280" :height="42" :title="getMonthcalc(-1)+'月'"
                                              :d="muck.carOutOfLine"></SharpProgressBar>
                        </div>
                        <div class="template-row">
                            <div class="tit-box">学习<br/>时长</div>
                            <SharpProgressBar :width="280" :height="42" :title="getMonthcalc(-2)+'月'"
                                              :d="muck.dutyFinish"></SharpProgressBar>
                        </div>
                    </div>
                </div>

            </div>

            <div class="footer">
                <div class="topTitle bloom">
                    <div class="topName">
                    </div>
                    <span>云领先锋活跃党支部</span>
                </div>
                <div class="footerContent">
                    <div class="content">
                        <div>
                            <List v-for="(l,i) in JiansheZuoXiaLists" :key="i" :d="l" :index="i"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SharpProgressBar from "../../common/Graphics/SharpProgressBar/SharpProgressBar.vue";
    import List from "./ZhengJianYouXia.vue";

    export default {
        name: "ZhengzhijiansheRight",
        data() {
            return {
                radarValue: [{name: ""}],

                /* radarValue:[{
                     name:'5月',
                     value:[3641,3481,3371,93,95.7]
                 }, {
                     name:'6月',
                     value:[3521,3341,3219,92,97]
                 }],*/
                muck: {},
                chart: null,
                JiansheZuoXiaLists: []
            }
        },
        created: function () {
            this.req()
        },
        components: {
            SharpProgressBar,
            List
        },
        methods: {
            req() {
                this.axios({
                    url: window.baseURL + '/runningStatus'
                }).then(d => {
                    this.digitalCityManager = d.data.digitalCityManager
                    this.enforce = d.data.enforce
                    this.citizenService = d.data.citizenService
                    this.muck = d.data.muck;
                    /*     this.radarValue[0].name=this.getMonthcalc(-2)+'月';
                        this.radarValue[1].name=this.getMonthcalc(-1)+'月';
                        this.muck.carOutOfLine[0].month=this.getMonthcalc(-2);
                        this.muck.carOutOfLine[1].month=this.getMonthcalc(-1);
                        this.muck.dutyFinish[0].month=this.getMonthcalc(-2);
                        this.muck.dutyFinish[1].month=this.getMonthcalc(-1);*/
                    // this.setRadarChart()
                    this.$forceUpdate()
                })
            },
            getMonthcalc(m) {
                let res = Number(this.renderdate) + m;
                if (res == 0) {
                    res = 12
                }
                if (res == -1) {
                    res = 11
                }
                return res
            },


            getJiansheZuoXia() {
                this.axios({
                    url: window.baseURL + '/JiansheZuoXia'
                }).then(d => {
                    for (let i in d.data.lists) {
                        this.JiansheZuoXiaLists.push(d.data.lists[i])
                    }
                    /*  console.log(this.JiansheZuoXiaLists);*/
                })
            },
        },
        mounted() {
            this.getJiansheZuoXia()
        }


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

    .ZhengzhijiansheRight {
        width: 617px;
        height: 913px;
        position: absolute;
        top: 0;
        right: 0px;
        margin-top: -50px;
        background: linear-gradient(90deg, rgba(24, 35, 47, 0) 0%, rgba(36, 41, 48, 5.3) 100%);
        opacity: 0.92;
    }

    .top {
        .topTitle {
            margin-top: 165px;

            .topName {
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
                top: 179px;
                margin-left: 53px;
                font-size: 28px;
                line-height: 28px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(254, 255, 254, 1);
            }
        }

        .topContent {
            height: 317px;

            .topContent-holder {
                padding-top: 40px;
                height: calc(100% - 90px);
                display: grid;
                grid-template-rows: repeat(2, 84px);
                grid-template-columns: 1fr;
                grid-row-gap: 64px;

                .template-row /deep/ g text:nth-child(4) {
                    font-size: 24px;
                }

                .template-row /deep/ g text:nth-child(2) {
                    font-size: 20px;
                }

                .template-row /deep/ .title {
                    display: none;
                }

                .tit-box {
                    background: rgba(255, 255, 255, .1);
                    position: relative;
                    font-size: 24px;
                    font-family: MicrosoftYaHei;
                    font-weight: 400;
                    color: rgba(254, 255, 254, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:before {
                        content: '';
                        height: 4px;
                        width: 4px;
                        position: absolute;
                        background: rgba(255, 255, 255, .6);
                        top: -2px;
                        left: -2px;
                    }

                    &:after {
                        content: '';
                        height: 4px;
                        width: 4px;
                        position: absolute;
                        background: rgba(255, 255, 255, .6);
                        bottom: -2px;
                        left: -2px;
                    }
                }

                .template-row {
                    display: grid;
                    grid-template-rows: 1fr;
                    grid-template-columns: 84px 1fr;
                    grid-column-gap: 24px;
                }
            }
        }
    }

    .footer {
        .topTitle {
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
                top: 558px;
                margin-left: 53px;
                font-size: 28px;
                line-height: 28px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: rgba(254, 255, 254, 1);
            }
        }

        .footerContent {
            height: 455px;
            display: flex;
            justify-content: space-between;
        }
    }

    .bloom {
        text-shadow: 1px 1px 1px #F70028, -1px -1px 1px #F70028;
    }
</style>