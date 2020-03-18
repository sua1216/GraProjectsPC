<template>
    <div class="ZuZhiGaiKuangPop">
        <div class="all">
        <div class="title-header">
            <div class="title-info">
                <div class="title">
                    <p>党组织详细统计</p>
                </div>
                <div class="main-info">
                    <p>
                        <span>党组织数量：</span>
                        <span>23</span>
                    </p>

                </div>
            </div>
            <div class="select">
                <div>
                    <span>党组织性质：</span>
                    <SelectFrame @getValue="getArea" :select-frame-style="{fontSize:18,fontColor:'white'}" :width="150" :heigth="10" :lists="area" />
                </div>
                <div>
                    <span>党组织类型：</span>
                    <SelectFrame @getValue="getType" :select-frame-style="{fontSize:18,fontColor:'white'}" :width="150" :heigth="10" :lists="type" />
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
                    <thead>
                    <tr>
                        <th>党组织名称</th>
                        <th>党组织负责人</th>
                        <th>党组织类型</th>
                        <th>电话</th>
                        <th>党员数量</th>
                        <th>地址</th>
                        <th>所在四级网络</th>
                        <th>考核得分</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(l,i) in arr" :key="i">
                        <td>中共城南花园社区党委</td>
                        <td>潘军</td>
                        <td>机关</td>
                        <td>12472841984</td>
                        <td>1423</td>
                        <td>楚雄市xxxxxxx</td>
                        <td>xxxxxxxx</td>
                        <td>92</td>
                        <td style="cursor:pointer;" @click="dangPop">查看详情</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="footer" >
            <div class="total1">共{{total}}条</div>
            <div class="content1">
                <Page :total="5"  @on-change="togglePage" prev-text="上一页" next-text="下一页" :page-size="1" />

            </div>
        </div>
    </div>
    </div>
</template>

<script>
  import DangZuZhiPop from "@cp/Popup/ZuZhiJianShe/DangZuZhiPop.vue";
   import ZuZhiPopTwo from "@cp/Popup/ZuZhiJianShe/ZuZhiPopTwo.vue";
    import SelectFrame from '@c/common/SelectFrame/SelectFrame.vue'

    export default {
        name: "ZuZhiGaiKuangPop",
        components:{
            SelectFrame,
            ZuZhiPopTwo,
            DangZuZhiPop

        },
        data(){
            return {
                total:"12345",
                area:[{"label":"全部","value":""},{"label":"党委","value":""},{"label":"党支部","value":""},{"label":"党总支","value":""},{"label":"联合党支部","value":""}],
                type:[{"label":"全部","value":""},{"label":"机关","value":""},{"label":"国企","value":""},{"label":"事业单位","value":""},{"label":"民营企业","value":""}],
                arr:null,
            }
        },
        methods:{
            dangPop() {
                this.$Tooltips({
                    render: h => {
                        h(ZuZhiPopTwo)
                    }
                })
            },
            changeDate(date){
                this.startTime = date[0]
                this.endTime = date[1]
                this.arr = null
                setTimeout(() => {
                    this.arr = new Array(7)
                },200)
            },

            togglePage(){
                //翻页
                this.arr = null
                setTimeout(() => {
                    this.arr = new Array(7)
                },200)
            },
            getArea(){
                // 抖一下
                this.arr = null
                setTimeout(() => {
                    this.arr = new Array(7)
                },200)
            },
            getType(){
                // 抖一下
                this.arr = null
                setTimeout(() => {
                    this.arr = new Array(7)
                },200)

            },
          /*  dangPop() {
                this.$Tooltips({
                    render: h => {
                        h(DangZuZhiPop)
                    }
                })
            },*/
        },
        mounted(){
            this.arr = new Array(7)
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
                            text-shadow: 3px 3px 30px #FF614D;
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
                        margin: 10px 155px;

                        p {
                            margin: 0 20px;
                            span {
                                font-size:30px;
                                font-family:Microsoft YaHei;
                                font-weight:bold;
                                text-shadow: 3px 3px 30px #FF614D;
                                color:rgba(255,255,255,1);
                                &:nth-child(2) {
                                    color:#FF3939;
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
                            padding: 0 10px;
                            line-height: 40px;
                        }
                         &:nth-child(2){
                             margin-left: 100px;
                         }
                        &:nth-child(3) {
                            margin-left: 500px;
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
                        tr{
                            text-indent: 22px;
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
    /deep/.ivu-page-next, /deep/.ivu-page-prev {
        background-color: rgba(255,255,255,0.001);
        display: inline-block;
        width: 80px;
        height: 40px;
        border: 1px solid rgba(255,255,255,0.7);
        line-height: 40px;
        color: white;
    }


    /* 上一页下一页的字设置*/
    /deep/.ivu-page-prev a, /deep/.ivu-page-next a {
        display: inline-block;
        width: 80px;
        height: 40px;
        line-height: 24px;
    }
    /deep/.ivu-page-next:hover, /deep/.ivu-page-prev:hover {
        border-color: rgba(255,255,255,.7);
    }
    /deep/.ivu-page-next:hover a, /deep/.ivu-page-prev:hover a {
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
    /deep/.ivu-page-item-active a, /deep/.ivu-page-item-active:hover a {
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

