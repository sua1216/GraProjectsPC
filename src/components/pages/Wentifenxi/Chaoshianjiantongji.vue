<template>
    <!--超时案件统计-->
    <div class="chaoshianjiantongji">
        <div class="border"></div>

        <div class="content">
            <span class="jiao4_2"></span>
            <span class="jiao4_2"></span>
            <span class="jiao4_2"></span>
            <span class="jiao4_2"></span>

            <div style="width: 100%;font-size: 48px;font-weight: bold;margin-bottom: 20px;font-family: MicrosoftYaHei-Bold;color: white">
                超时案件统计
                <span class="zt">
                <span>状态：</span>

                <Dropdown   @on-click="changeZhaungtai">
                    <a href="javascript:void(0)" class="change">
                        {{zhaungtai}}
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem :selected="selected" name="未结案">未结案</DropdownItem>
                        <DropdownItem :selected="!selected" name="已结案">已结案</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </span>


                <span class="close" @click="close">×</span>
            </div>

            <Table :disabled-hover="disabledHover" :columns="columns1" :data="data">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" @click="show(index)">查看详情</Button>
                </template>
            </Table>

            <div class="fyq">
                <div class="total">共{{total}}条</div>
                <div class="pageNum">
                    <Page @on-change="changePage" :current="current" :total="total" :page-size="pageSize" prev-text="上一页" next-text="下一页" :class-name="pageLi"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Chaoshianjiantongji",
        data(){
            return {
                zhaungtai:"未结案",
                disabledHover:true,//控制图表鼠标移动上去不高亮显示
                selected:true,
                pageLi:"pageLi",
                columns1: [
                    {
                        title: '任务号',
                        width:150,
                        key: 'num'
                    },
                    {
                        title: '派遣次数',
                        width:150,
                        key: 'pqcs'
                    },
                    {
                        title: '专业部门',
                        width:150,
                        key: 'zybm'
                    },
                    {
                        title: '问题描述',
                        key: 'wtms'
                    },
                    {
                        title: '问题类型',
                        width:250,
                        key: 'wtlx'
                    },
                    {
                        title: '所属区域',
                        width:240,
                        key: 'ssqy'
                    },
                    {
                        title: '状态',
                        width:120,
                        key: 'zt'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width:150,
                        align: 'center'
                    }
                ],
                data:[],
                total:22,
                pageSize:10,
                current:1,
                data1: [
                    {
                        num: '1234569',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234568',
                        pqcs: 2,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234567',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234566',
                        pqcs: 2,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234565',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234564',
                        pqcs: 4,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234563',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                    ,
                    {
                        num: '1234562',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                    ,
                    {
                        num: '1234561',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                    ,
                    {
                        num: '1234560',
                        pqcs: 5,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                    ,
                    {
                        num: '1234565',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234566',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234561',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234563',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234562',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234569',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234565',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    },
                    {
                        num: '1234567',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                    ,
                    {
                        num: '1234563',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                    ,
                    {
                        num: '1234561',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                    ,
                    {
                        num: '1234560',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                    ,
                    {
                        num: '1234567',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"未结案"
                    }
                ],
                data2: [
                    {
                        num: '1234560',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234561',
                        pqcs: 4,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234562',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234563',
                        pqcs: 5,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234564',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234565',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234566',
                        pqcs: 9,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                    ,
                    {
                        num: '1234563',
                        pqcs: 4,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                    ,
                    {
                        num: '1234560',
                        pqcs: 3,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                    ,
                    {
                        num: '1234569',
                        pqcs: 8,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                    ,
                    {
                        num: '1234561',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234568',
                        pqcs: 3,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234563',
                        pqcs: 8,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234562',
                        pqcs: 7,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234562',
                        pqcs: 7,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234566',
                        pqcs: 4,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234564',
                        pqcs: 6,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    },
                    {
                        num: '1234563',
                        pqcs: 5,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                    ,
                    {
                        num: '1234563',
                        pqcs: 5,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                    ,
                    {
                        num: '1234562',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                    ,
                    {
                        num: '1234561',
                        pqcs: 2,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                    ,
                    {
                        num: '1234567',
                        pqcs: 1,
                        zybm: '城管大队',
                        wtms: '万诚御景园南门50米占道广告牌xxxxx',
                        wtlx: '街面秩序-户外经营',
                        ssqy: "东瓜镇-车坪社区",
                        zt:"已结案"
                    }
                ],
            }
        },
        methods:{
            close:function () {
                this.$emit('csajtj');
            },
            changeZhaungtai:function (e) {//改变是否结案进行筛选
                this.zhaungtai=e
                var pageSize = this.pageSize;
                var arr = [];

                if(e=="未结案"){
                    this.selected = true

                    this.current=1;
                    var data1 = this.data1;
                    for(var i=0;i<pageSize*1;i++){
                        if(data1[i]){
                            arr.push(data1[i])
                        }
                    }
                    this.data = arr;

                }else{
                    this.selected = false
                    this.current=1;
                    var data2 = this.data2;
                    for(var j=0;j<pageSize*1;j++){
                        if(data2[j]){
                            arr.push(data2[j])
                        }
                    }
                    this.data = arr;
                }
            },
            changePage:function (e) {//改变页码
                this.current=e
                var zhaungtai = this.zhaungtai;
                var current = this.current;//当前页码
                var pageSize = this.pageSize;//每页装多少条

                if(zhaungtai=="未结案"){
                    var arr = [];
                    var data1 = this.data1;
                    for(var i=(current-1)*pageSize;i<pageSize*current;i++){
                        if(data1[i]){
                            arr.push(data1[i])
                        }
                    }
                    this.data = arr;
                }else if(zhaungtai=="已结案"){
                    var arr2 = [];
                    var data2 = this.data2;
                    for(var j=(current-1)*pageSize;j<pageSize*current;j++){
                        if(data2[j]){
                            arr2.push(data2[j])
                        }
                    }
                    this.data = arr2;
                }
            },
            show (index) {//查看详情按钮
                console.log(index)
                this.$emit('csajtj');
                this.$emit('ajxq');
            },
        },
        mounted() {
            var arr = [];
            var data1 = this.data1;
            var pageSize = this.pageSize;
            for (let i = 0; i < pageSize; i++) {
                arr.push(data1[i])
            }
            this.data = arr;
        }
    }
</script>

<style scoped>
    .pageNum a {
        font-size: 20px;
    }

    .chaoshianjiantongji /deep/ .ivu-dropdown-item {
        font-size: 18px !important;
    }


    .chaoshianjiantongji /deep/ td .ivu-btn-primary {
        background: none !important;
        border: none !important;
        font-size: 22px;
    }
    .chaoshianjiantongji /deep/ .ivu-dropdown-rel {
        font-size: 18px;
    }

    .chaoshianjiantongji /deep/ .ivu-table-wrapper {
        border: none;
    }

    .chaoshianjiantongji /deep/ .ivu-table th span {
        height: 60px;
        /*background-color: #0B202D;*/
        /*opacity: 0.9;*/
        color: RGBA(42, 206, 255, 1);
        font-weight: bold;
        font-family: MicrosoftYaHei-Bold;
        font-size: 22px;
    }

    .chaoshianjiantongji /deep/ .ivu-table {
        background-color: #0B202D;
        opacity: 0.9;
    }

    .chaoshianjiantongji /deep/ .ivu-table td,
    .chaoshianjiantongji /deep/ .ivu-table th {
        border-bottom: none;
    }

    .chaoshianjiantongji /deep/ .ivu-table td {
        background-color: #0B202D;
        opacity: 0.9;
        color: white;
        transition: background-color .2s ease-in-out;
    }

    .chaoshianjiantongji /deep/ tr {
        height: 60px;
    }

    .chaoshianjiantongji /deep/ .ivu-table-cell {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .chaoshianjiantongji /deep/ .pageLi li a {
        background-color: rgba(255,255,255,0.01);
    }

    .chaoshianjiantongji /deep/ .ivu-page-item {
        background-color: rgba(255,255,255,0.01);
    }

    .chaoshianjiantongji /deep/ .pageLi li {
        display: inline-block;
        height: 50px;
        font-size: 20px;
    }


    .chaoshianjiantongji /deep/ .ivu-page-next,
    .chaoshianjiantongji /deep/ .ivu-page-prev {
        background-color: rgba(255,255,255,0.2);
        display: inline-block;
        width: 92px;
        height: 50px;
        border: 1px solid rgba(255,255,255,0.7);
    }


    .chaoshianjiantongji /deep/ .ivu-page-next a,
    .chaoshianjiantongji /deep/ .ivu-page-prev a {
        display: inline-block;
        width: 92px;
        height: 50px;
    }

    .chaoshianjiantongji /deep/ .pageLi a {
        padding: 10px;
        display: inline-block;
        color: white;
        font-size: 20px;
    }

    .chaoshianjiantongji /deep/ .ivu-page-disabled {
        border-color: rgba(255,255,255,0.3);
    }

    .chaoshianjiantongji /deep/ .ivu-page-disabled a {
        color: rgba(255,255,255,0.3);
    }

    .chaoshianjiantongji /deep/ .ivu-page-item-active a,
    .chaoshianjiantongji /deep/ .ivu-page-item-active:hover a {
        display: inline-block;
        width: 49px;
        margin: 0px;
        color: #2d8cf0;
        border-color: #2d8cf0;
        font-size: 20px;
        box-shadow: rgba(45,140,240,0.5) 0px 0px 10px 3px inset;
    }
    .chaoshianjiantongji /deep/ .ivu-table:after {
        width: 1px;
        background-color: #0B202D;
    }

    .chaoshianjiantongji /deep/ th {
        background-color: rgba(0,0,0,0);
    }

    .chaoshianjiantongji /deep/ td {
        font-size: 22px;
    }
</style>


<style scoped>
    .chaoshianjiantongji {
        position: fixed;
        z-index: 99;
        top: 0px;
        left: 0px;
        width: 3840px;
        height: 1023px;
        background-color: rgba(0,0,0,0.8);
    }

    .jiao4_2:nth-child(1) {
        position: absolute;
        top: -27px;
        left: -27px;
        z-index: 99;
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: RGBA(37, 212, 255, 1);
    }
    /*1820 912*/
    .jiao4_2:nth-child(2) {
        position: absolute;
        top: -27px;
        left: 1793px;
        z-index: 99;
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: RGBA(37, 212, 255, 1);
    }

    .jiao4_2:nth-child(3) {
        position: absolute;
        top: 905px;
        left: 1793px;
        z-index: 99;
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: RGBA(37, 212, 255, 1);
    }

    .jiao4_2:nth-child(4) {
        position: absolute;
        top: 905px;
        left: -27px;
        z-index: 99;
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: RGBA(37, 212, 255, 1);
    }

    .border {
        position: relative;
        top: 0px;
        left: 0px;
        margin: 80px auto;
        width: 1820px;
        height: 932px;
        border: 1px solid RGBA(61, 168, 229, 1);
        background-color: #090B0E;
        opacity: 0.8;
    }
    .content {
        position: relative;
        top: -1002px;
        left: 0px;
        margin: 90px auto;
        width: 1780px;
        height: 892px;
        background-color: #0B202D;
        opacity: 0.9;
        padding: 42px 65px;
    }
    .close {
        position: absolute;
        right: 0px;
        top: 0px;
        display: inline-block;
        width: 94px;
        height: 94px;
        font-size: 64px;
        font-weight: normal;
        text-align: center;
        line-height: 94px;
        /*border: 1px dashed rgba(255,255,255,0.5);*/
        cursor: pointer;
        text-shadow: 0.05rem 0rem .5rem rgba(255,255,255,0.2),-0.05rem 0rem .5rem rgba(255,255,255,0.2),0rem 0.05rem .5rem rgba(255,255,255,0.2),0rem 0.05rem .5rem rgba(255,255,255,0.2);
    }

    .zt {
        position: absolute;
        top: 50px;
        left: 1400px;
        display: inline-block;
        height: 72px;
        font-size: 18px;
        font-family: "微软雅黑";
    }

    .change {
        border: 1px solid #7BD4FC;
        background-color: rgba(123,212,252,0.2);
        padding: 10px 10px;
        color: rgba(255,255,255,0.8);
        border-radius: 5px;
    }

    .ivu-icon-ios-arrow-down {
        margin-left: 15px;
        color: white;
    }

    .fyq {
        display: flex;
        padding-top: 20px;
        padding-left: 10px;
        /*border-top: 2px solid RGBA(132, 142, 148, 1);*/
    }

    .total {
        flex: 1;
        font-size: 20px;
    }

    .pageNum {
        flex: 1;
        text-align: right;
    }

</style>