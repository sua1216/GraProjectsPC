<template>
    <div class="ZuZhiGaiKuangPop">
        <div class="all">
            <div class="title-header">
                <div class="title-info">
                    <div class="title">
                        <p>党组织政治建设统计详情</p>
                    </div>
                    <div class="main-info">
                        <p>
                            <span>三会一课：</span>
                            <span>23</span>
                        </p>
                        <p>
                            <span>党建活动：</span>
                            <span>23</span>
                        </p>
                        <p>
                            <span>掌上党校学习人数：</span>
                            <span>23</span>
                        </p>
                        <p>
                            <span>掌上党校学习时长：</span>
                            <span>23</span>
                        </p>

                    </div>
                </div>
                <div class="select">
                    <div>
                        <span>党组织性质：</span>
                        <SelectFrame @getValue="getType" :select-frame-style="{fontSize:18,fontColor:'white'}" :width="150" :heigth="10" :lists="area" />
                    </div>
                    <div>
                        <span>党组织类型：</span>
                        <SelectFrame @getValue="getType" :select-frame-style="{fontSize:18,fontColor:'white'}" :width="150" :heigth="10" :lists="type" />
                    </div>
                    <div>
                        <span>地区：</span>
                        <SelectFrame @getValue="getType" :select-frame-style="{fontSize:18,fontColor:'white'}" :width="150" :heigth="10" :lists="diqu" />
                    </div>
                    <div>
                        <span>时间：</span>
                        <SelectFrame @getValue="getType" :select-frame-style="{fontSize:18,fontColor:'white'}" :width="150" :heigth="10" :lists="time" />
                    </div>

                    <div>
                        <input type="text" placeholder="   请输入内容">
                        <button type="button" >搜索</button>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="table">
                    <table>
                        <thead >
                        <tr>
                            <th>党组织名称</th>
                            <th> 党组织性质</th>
                            <th> 三会一课</th>
                            <th> 党建活动</th>
                            <th> 网上党校学习人数</th>
                            <th> 网上党校学习时长</th>
                            <th> 活跃党支部排名</th>
                            <th> 操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(l,i) in arr" :key="i">
                            <td>{{l.name}}</td>
                            <td>{{l.xinzhi}}</td>
                            <td>{{l.sanhui}}</td>
                            <td>{{l.dangjian}}</td>
                            <td>{{l.peoplenum}}</td>
                           <td>{{l.peopletime}}</td>
                            <td>{{l.level}}</td>
                            <td style="cursor:pointer;" @click="dangPop" >{{l.caozuo}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="footer" >
                <div class="total1">共{{total}}条</div>
                <div class="content1">
                    <Page  :total="5"  @on-change="togglePage" prev-text="上一页" next-text="下一页" :page-size="1" />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ZhengJianPopTwo from "./ZhengJianPopTwo.vue";
    import SelectFrame from '@c/common/SelectFrame/SelectFrame.vue'

    export default {
        name: "ZuZhiGaiKuangPop",
        components:{
            SelectFrame,
            ZhengJianPopTwo

        },
        data(){
            return {
                total:12345,
                area:[{"label":"全部","value":""},{"label":"党委","value":""},{"label":"党支部","value":""},{"label":"党总支","value":""},{"label":"联合党支部","value":""}],
                type:[{"label":"全部","value":""},{"label":"机关","value":""},{"label":"国企","value":""},{"label":"事业单位","value":""},{"label":"民营企业","value":""}],
                diqu:[{"label":"全部","value":""},{"label":"楚雄州","value":""},{"label":"楚雄市","value":""},{"label":"东瓜镇","value":""}],
                time:[{"label":"全部","value":""},{"label":"2019","value":""},{"label":"2018","value":""},{"label":"2017","value":""}],
              /*  arr:null,*/
                arr: [
                    {
                        name: '中共共产党楚雄州财政局第三...',
                        xinzhi: '机关',
                        sanhui: '10',
                        dangjian: "15",
                        peoplenum:"30",
                        peopletime:"110",
                        level:"1",
                        caozuo:"查看详情"
                    },
                    {
                        name: '中共楚雄市委办公室支部委员会',
                        xinzhi: '机关',
                        sanhui: '15',
                        dangjian: "21",
                        peoplenum:"43",
                        peopletime:"150",
                        level:"2",
                        caozuo:"查看详情"
                    },

                    {
                        name: '中共楚雄市人民武装部支部委员会',
                        xinzhi: '机关',
                        sanhui: '18',
                        dangjian: "24",
                        peoplenum:"48",
                        peopletime:"123",
                        level:"3",
                        caozuo:"查看详情"
                    },

                    {
                        name: '中共楚雄市农业农村局委员会',
                        xinzhi: '机关',
                        sanhui: '20',
                        dangjian: "17",
                        peoplenum:"33",
                        peopletime:"116",
                        level:"4",
                        caozuo:"查看详情"
                    },

                    {
                        name: '中共楚雄市人民政府办公室总...',
                        xinzhi: '机关',
                        sanhui: '17',
                        dangjian: "16",
                        peoplenum:"46",
                        peopletime:"130",
                        level:"5",
                        caozuo:"查看详情"
                    },
                    {
                        name: '中共楚雄市住房和城乡建设局...',
                        xinzhi: '机关',
                        sanhui: '19',
                        dangjian: "24",
                        peoplenum:"48",
                        peopletime:"137",
                        level:"6",
                        caozuo:"查看详情"
                    },
                    {
                        name: '中共楚雄市图书馆支部委员会',
                        xinzhi: '机关',
                        sanhui: '16',
                        dangjian: "17",
                        peoplenum:"40",
                        peopletime:"135",
                        level:"7",
                        caozuo:"查看详情"
                    },
                ],
                arr1: [
                    {
                        name: '中共共产党楚雄州财政局第三...',
                        xinzhi: '机关',
                        sanhui: '10',
                        dangjian: "15",
                        peoplenum:"30",
                        peopletime:"110",
                        level:"1",
                        caozuo:"查看详情"
                    },
                    {
                        name: '中共楚雄市委办公室支部委员会',
                        xinzhi: '机关',
                        sanhui: '15',
                        dangjian: "21",
                        peoplenum:"43",
                        peopletime:"150",
                        level:"2",
                        caozuo:"查看详情"
                    },

                    {
                        name: '中共楚雄市人民武装部支部委员会',
                        xinzhi: '机关',
                        sanhui: '18',
                        dangjian: "24",
                        peoplenum:"48",
                        peopletime:"123",
                        level:"3",
                        caozuo:"查看详情"
                    },

                    {
                        name: '中共楚雄市农业农村局委员会',
                        xinzhi: '机关',
                        sanhui: '20',
                        dangjian: "17",
                        peoplenum:"33",
                        peopletime:"116",
                        level:"4",
                        caozuo:"查看详情"
                    },

                    {
                        name: '中共楚雄市人民政府办公室总...',
                        xinzhi: '机关',
                        sanhui: '17',
                        dangjian: "16",
                        peoplenum:"46",
                        peopletime:"130",
                        level:"5",
                        caozuo:"查看详情"
                    },
                    {
                        name: '中共楚雄市住房和城乡建设局...',
                        xinzhi: '机关',
                        sanhui: '19',
                        dangjian: "24",
                        peoplenum:"48",
                        peopletime:"137",
                        level:"6",
                        caozuo:"查看详情"
                    },
                    {
                        name: '中共楚雄市图书馆支部委员会',
                        xinzhi: '机关',
                        sanhui: '16',
                        dangjian: "17",
                        peoplenum:"40",
                        peopletime:"135",
                        level:"7",
                        caozuo:"查看详情"
                    },
                ],
            }
        },
        methods:{
            dangPop() {
                this.$Tooltips({
                    render: h => {
                        h(ZhengJianPopTwo)
                    }
                })
            },
            changeDate(date){
             /*   this.startTime = date[0]
                this.endTime = date[1]*/
                let that = this
                that.arr = null
                setTimeout(() => {
                    that.arr = this.arr1
                },200)
            },

            togglePage(){
                //翻页
                let that = this
                that.arr = null
                setTimeout(() => {
                    that.arr = this.arr1
                    console.log(this.arr1);
                },200)
            },
            getArea(){
                // 抖一下
                let that = this
                that.arr = null
                setTimeout(() => {
                    that.arr = this.arr1
                },200)
            },
            getType(){
                // 抖一下

                let that = this
                that.arr = null
                setTimeout(() => {
                    that.arr = this.arr1
                },200)

            },

        },
        mounted(){
          /*  this.arr = new Array*/
        }
    }
</script>

<style lang="scss" scoped>
    .ZuZhiGaiKuangPop {
        width: 1780px;
        height: 835px;
        background: url("../../../../assets/common/images/ZuZhiJianShePop/bg_djyl_zzjs_l@2x.png") no-repeat bottom right;

        .all {
            background: url("../../../../assets/common/images/ZuZhiJianShePop/bg_djyl_zzjs_s@2x.png") no-repeat;
            .title-header {
                padding-left: 64px;
                padding-top: 30px;
                height: 180px;
                .title-info {

                    display: flex;
                    .title {

                        p {
                            text-shadow: 3px 3px 30px rgba(255, 97, 77, 1);
                            font-size:48px;
                            font-family:Microsoft YaHei;
                            font-weight:bold;
                            color:rgba(255,255,255,1);
                        }
                    }

                    .main-info {
                        display: flex;
                        font-size: 30px;
                        font-weight: bold;
                        margin-top: 20px;
                        margin-left: 15px;

                        p {
                            margin: 0 20px;
                            span {
                                font-size:30px;
                                font-family:Microsoft YaHei;
                                font-weight:bold;
                                text-shadow: 3px 3px 30px #FF614D;
                                color:rgba(255,255,255,1);
                                &:nth-child(2) {
                                    color:rgba(255, 57, 57, 1);
                                    text-shadow: none;
                                }
                            }
                        }
                    }
                }

                .select {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-start;
                    font-size: 18px;
                    align-items: center;
                    & > div {
                        display: flex;
                        margin-left: 20px;
                        text-shadow: 3px 3px 30px #FF614D;
                        span {

                            line-height: 40px;
                        }
                        &:nth-child(2){

                        }
                        &:nth-child(5) {
                            margin-left: 140px;
                            input{
                                width: 289px;
                                height: 40px;
                                border: 1px solid #FF614D;
                                border-radius: 3px;
                                background: #471610;
                                margin-left: 10px;
                                color: white;
                                line-height: 50px;
                            }
                            button{
                                margin-left: 20px;
                                width:80px;
                                height:40px;
                                background:rgba(255,80,58,0.95);
                                border:1px solid rgba(255,155,142,1);
                                border-radius:4px;
                                color: white;
                            }
                        }
                    }
                }
            }
            .content {
                height: 500px;
                padding-bottom: 20px;
                margin-top: 20px;
                padding-left: 64px;
                padding-right: 64px;
                font-size: 22px;
                .table {
                    padding-bottom: 20px;
                    border-bottom: 2px solid #FF6551;
                    overflow: auto;
                    &:before {
                        content: none;
                    }
                    table {
                        border-collapse:collapse;
                        border-spacing:0;
                        width: 100%;
                        text-align: left;

                        thead {
                            color: #FF614D;
                            font-size: 22px;
                            font-weight: bold;
                            text-indent: 22px;
                            tr{

                                background:rgba(255,101,81,0.2);
                                height:62px;
                            }
                        }
                        tbody{
                            text-indent: 22px;
                            tr{
                                height:62px;
                            }
                            tr:nth-child(2){
                                background:rgba(255,101,81,0.2);
                            }
                            tr:nth-child(4){
                                background:rgba(255,101,81,0.2);
                            }
                            tr:nth-child(6){
                                background:rgba(255,101,81,0.2);
                            }
                        }

                    }
                }
            }

        }
    }
    .footer {

        display: flex;

        margin-top: 50px;
        font-size: 18px;
        .total1{
            flex: 1;
            margin-left: 60px;
        }
        .content1{
            flex: 1;
            margin-right: 60px;
            text-align: right;
        }
    }


    /deep/.ivu-page-disabled a {
        color: rgba(255,255,255,0.3);
    }
    /* 上一页下一页的设置*/
    /deep/.ivu-page-next,  /deep/.ivu-page-prev {
        background-color: rgba(255,255,255,0.01);
        display: inline-block;
        width: 80px;
        height: 40px;
        border: 1px solid rgba(255,255,255,0.3);
        line-height: 40px;
        color: white;
    }

    /* 上一页下一页的字设置*/
    /deep/.ivu-page-prev a,  /deep/.ivu-page-next a {
        display: inline-block;
        width: 80px;
        height: 40px;
        line-height: 24px;
    }
    /deep/.ivu-page-next:hover,  /deep/.ivu-page-prev:hover {
        border-color: rgba(255,255,255,.7);
    }
    /deep/.ivu-page-next:hover a,  /deep/.ivu-page-prev:hover a {
        color: rgba(255,255,255,.7);
    }
    /*中间页码的设置*/
    /deep/.ivu-page-item {
        background-color: rgba(255,255,255,0.01);
        height: 40px;
        width: 40px;
        line-height: 40px;
    }
    /*点击页码边框颜色*/
    /deep/.ivu-page-item-active {
        border-color: rgba(255, 89, 68, 1);
    }
    /*点击页码填充的大小*/
    /deep/.ivu-page-item-active a,  /deep/.ivu-page-item-active:hover a {
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 4px;
        color: rgba(255, 89, 68, 1);
        border-color: rgba(255, 89, 68, 1);
    }
    /deep/.ivu-page-item:hover {
        border-color: rgba(255, 89, 68, 1);
    }
    /deep/.ivu-page-item:hover a {
        color: rgba(255, 89, 68, 1);
    }

</style>


