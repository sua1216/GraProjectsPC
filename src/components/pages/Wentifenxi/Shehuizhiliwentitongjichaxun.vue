<template>
    <!--社会治理问题统计查询-->
    <div class="shzlwttjcx">
        <div class="border"></div>
        <div class="cantent">
            <div class="content">
                <span class="jiao4_2"></span>
                <span class="jiao4_2"></span>
                <span class="jiao4_2"></span>
                <span class="jiao4_2"></span>
                <div style="width: 100%;font-family: MicrosoftYaHei-Bold;font-size: 48px;color: white;opacity: 1;font-weight: bold;">
                    社会治理问题统计查询
                    <span class="close" @click="close">×</span>
                </div>
                <div style="margin: 0px 20px;">
                    <div style="text-align: right;margin-right: 25px;font-size: 24px">
                        <Button :type="btn1" :ghost="ghost1" @click="quanbu">全部</Button>
                        <Button :type="btn2" :ghost="ghost2" @click="jinri">今日</Button>
                        <Button :type="btn3" :ghost="ghost3" @click="benzhou">本周</Button>
                        <Button :type="btn4" :ghost="ghost4" @click="benyue">本月</Button>

                        <span style="margin-left: 83px;font-size: 18px">
                        <span style="position: relative;top: 5px;">时间：</span>
                        <DatePicker type="date" placeholder="开始时间"></DatePicker>
                        <span style="padding: 0px 10px;position: relative;top: 5px;">至</span>
                        <DatePicker type="date" placeholder="结束时间"></DatePicker>
                    </span>
                    </div>

                    <div style="margin-top: 34px;display: flex;justify-content: space-between;padding-right: 25px">
                        <span>
                             <span style="font-size: 18px;position: relative;top: 4px;">案件来源：</span>
                            <Select v-model="model1" style="width:250px;height: 40px;">
                                <Option v-for="item in ajlyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </span>
                       <span>
                           <span style="margin-left: 60px;font-size: 18px;position: relative;top: 4px;">大类：</span>
                            <Select v-model="model2" style="width:250px;height: 40px;">
                                <Option v-for="item in bigClass" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                       </span>
                        <span>
                            <span style="margin-left: 60px;font-size: 18px;position: relative;top: 4px;">小类：</span>
                            <Select v-model="model3" style="width:250px;height: 40px;">
                                <Option v-for="item in littleClass" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </span>
                        <span>
                            <span style="margin-left: 60px;font-size: 18px;position: relative;top: 4px;">状态：</span>
                            <Select v-model="model4" style="width:150px;height: 40px;">
                                <Option v-for="item in ztList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </span>

                        <span>
                           <span style="margin-left: 60px">
                            <Button type="primary" @click="sousuo">搜索</Button>
                        </span>
                    </span>
                    </div>


                    <div style="margin-top: 20px">
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
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "Shehuizhiliwentitongjichaxun",
        data() {
            return {
                btn1:"default",//筛选按钮的样式
                btn2:"primary",
                btn3:"default",
                btn4:"default",

                ghost1:true,//控制筛选按钮的透明度
                ghost2:false,
                ghost3:true,
                ghost4:true,


                ajlyList: [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '党员上报',
                        label: '党员上报'
                    },
                    {
                        value: '群众上报',
                        label: '群众上报'
                    },
                    {
                        value: '巡查发现',
                        label: '巡查发现'
                    },
                    {
                        value: '其他来源',
                        label: '其他来源'
                    }
                ],//案件来源的下拉可选值
                model1: '全部',//下拉框的初始值
                model2: '全部',
                model3: '全部',
                model4: '全部',
                bigClass:[
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '市容环境',
                        label: '市容环境'
                    },
                    {
                        value: '宣传广告',
                        label: '宣传广告'
                    },
                    {
                        value: '街面秩序',
                        label: '街面秩序'
                    },
                    {
                        value: '施工管理',
                        label: '施工管理'
                    }
                    ,
                    {
                        value: '市场管理',
                        label: '市场管理'
                    }
                ],//大类的下拉可选值
                littleClass:[
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '市容环境',
                        label: '市容环境'
                    },
                    {
                        value: '宣传广告',
                        label: '宣传广告'
                    },
                    {
                        value: '街面秩序',
                        label: '街面秩序'
                    },
                    {
                        value: '施工管理',
                        label: '施工管理'
                    }
                    ,
                    {
                        value: '市场管理',
                        label: '市场管理'
                    }
                ],//小类的下拉可选值
                ztList:[
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '已处理',
                        label: '已处理'
                    },
                    {
                        value: '未处理',
                        label: '未处理'
                    }
                ],//状态的下拉可选值

                zhaungtai:"未结案",//下面这些是表格用到的数据
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
                pageSize:7,
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
        methods: {
            close: function () {//社会治理问题统计查询   关闭按钮事件
                this.$emit('shzlwttjcx');
            },
            quanbu: function () {
                this.btn1="primary"
                this.btn2="default"
                this.btn3="default"
                this.btn4="default"

                this.ghost1=false
                this.ghost2=true
                this.ghost3=true
                this.ghost4=true
            },
            jinri: function () {
                this.btn1="default"
                this.btn2="primary"
                this.btn3="default"
                this.btn4="default"

                this.ghost1=true
                this.ghost2=false
                this.ghost3=true
                this.ghost4=true
            },
            benzhou: function () {
                this.btn1="default"
                this.btn2="default"
                this.btn3="primary"
                this.btn4="default"

                this.ghost1=true
                this.ghost2=true
                this.ghost3=false
                this.ghost4=true
            },
            benyue: function () {
                this.btn1="default"
                this.btn2="default"
                this.btn3="default"
                this.btn4="primary"

                this.ghost1=true
                this.ghost2=true
                this.ghost3=true
                this.ghost4=false
            },
            show:function(index){
                //console.log(index)
                this.$emit('shzlwttjcx');
                this.$emit('ajxq',index);
            },

            sousuo:function() {
                console.log("搜索")
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
                var data2 = this.data2;

                if(zhaungtai=="未结案"){
                    var arr = [];
                    var data1 = this.data1;

                    data1 = data1.concat(data2)

                    for(var i=(current-1)*pageSize;i<pageSize*current;i++){
                        if(data1[i]){
                            arr.push(data1[i])
                        }
                    }
                    this.data = arr;
                }else if(zhaungtai=="已结案"){
                    var arr2 = [];
                    for(var j=(current-1)*pageSize;j<pageSize*current;j++){
                        if(data2[j]){
                            arr2.push(data2[j])
                        }
                    }
                    this.data = arr2;
                }
            }
        },

        mounted() {
            var arr = [];
            var data1 = this.data1;
            var data2 = this.data2;

            this.total = data1.length+data2.length

            var pageSize = this.pageSize;
            for (let i = 0; i < pageSize; i++) {
                arr.push(data1[i])
            }
            this.data = arr;
        }
    }
</script>

<!--ivew的-->
<style scoped>
    .shzlwttjcx /deep/ .ivu-input {
        display: inline-block;
        width: 160px;
        height: 40px;
        font-size: 18px;
        font-family: MicrosoftYaHei;
    }

    .shzlwttjcx /deep/ .ivu-input-with-suffix {
         padding-right: 0px;
    }

    .shzlwttjcx /deep/ .ivu-btn {
        margin-left: 24px;
    }

    .shzlwttjcx /deep/ .ivu-select-selected-value,
    .shzlwttjcx /deep/ .ivu-select-selection {
        height: 40px !important;
        line-height: 40px !important;
        background-color: rgba(0,0,0,0);
        border-color: #7BD4FC !important;
        color: white;
    }

    .shzlwttjcx /deep/ .ivu-btn-ghost .ivu-btn-dashed,
    .shzlwttjcx /deep/ .ivu-btn-ghost .ivu-btn-default {
        color: #fff;
        border-color: rgba(123, 212, 252, 1) !important;
    }

    .shzlwttjcx /deep/ .ivu-select-item {
        font-size: 18px !important;
    }

    .shzlwttjcx /deep/ .ivu-page-item a {
        color: rgba(255,255,255,0.8);
        font-size: 20px;
    }
</style>

<!--图表的-->
<style scoped>
    .shzlwttjcx /deep/ .ivu-select-selected-value {
        font-size: 18px !important;
    }
    .shzlwttjcx /deep/ .ivu-btn span {
        font-size: 18px;
    }

    .shzlwttjcx /deep/ td .ivu-btn span {
        font-size: 22px;
    }

    .shzlwttjcx /deep/ .ivu-table-wrapper {
        /*border: 1px solid #0B202D;*/
        border: none !important;
        background-color: #0B202D;
    }

    .shzlwttjcx /deep/ .ivu-table th {
        height: 60px;
        background-color: #0B202D;
        opacity: 0.9;
        color: #2ACEFF;
        font-weight: bold;
        font-family: MicrosoftYaHei-Bold;
        font-size: 22px;
    }

    .shzlwttjcx /deep/ .ivu-table {
        background-color: #0B202D;
        opacity: 0.9;
    }

    .shzlwttjcx /deep/ .ivu-table td,
    .shzlwttjcx /deep/ .ivu-table th {
        border-bottom: none;
    }

    .shzlwttjcx /deep/ .ivu-table td {
        background-color: #0B202D;
        opacity: 0.9;
        color: white;
        transition: background-color .2s ease-in-out;
        font-size: 22px;
    }

    .shzlwttjcx /deep/ tr {
        height: 60px;
        font-size: 22px;
    }

    .shzlwttjcx /deep/ .ivu-table-cell {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .pageLi li a {
        background-color: rgba(255,255,255,0.01);
    }

    .shzlwttjcx /deep/ .ivu-page-item {
        background-color: rgba(255,255,255,0.01);
        height: 50px;
        width: 50px;
        line-height: 50px;
    }

    .pageLi li {
        display: inline-block;
        height: 50px;
    }


    .shzlwttjcx /deep/ .ivu-page-next,
    .shzlwttjcx /deep/ .ivu-page-prev {
        background-color: rgba(255,255,255,0.2);
        display: inline-block;
        width: 92px;
        height: 50px;
        line-height: 50px;
        border: 1px solid rgba(255,255,255,0.7);
    }


    .shzlwttjcx /deep/ .ivu-page-next a,
    .shzlwttjcx /deep/ .ivu-page-prev a {
        display: inline-block;
        width: 92px;
        height: 50px;
        font-size: 20px;
        color: rgba(255,255,255,0.8);
    }

    .pageLi a {
        padding: 10px;
        display: inline-block;
        color: white;
    }

    .shzlwttjcx /deep/ .ivu-page-disabled {
        border-color: rgba(255,255,255,0.3);
    }

    .shzlwttjcx /deep/ .ivu-page-disabled a {
        color: rgba(255,255,255,0.3);
    }

    .shzlwttjcx /deep/ .ivu-page-item-active a,
    .shzlwttjcx /deep/ .ivu-page-item-active:hover a {
        display: inline-block;
        height: 50px;
        width: 50px;
        margin: 0px;
        color: #2d8cf0;
        border-color: #2d8cf0;
        box-shadow: rgba(45,140,240,0.5) 0px 0px 10px 3px inset;
    }


    .shzlwttjcx /deep/ .ivu-table:after {
        width: 1px;
        background-color: #0B202D;
    }
    .shzlwttjcx /deep/ .ivu-table:before {
        height: 2px;
        background-color: RGBA(132, 142, 148, 1);
    }

    .shzlwttjcx /deep/ .ivu-table td {
        background-color: #0B202D;
        border-bottom: none;
    }

    .shzlwttjcx /deep/ td .ivu-btn-primary {
        background-color: rgba(0,0,0,0);
        border: none;
    }

</style>



<style scoped>
    .fyq {
        margin-top: 10px;
        /*border-top: 1px solid rgba(255,255,255,0.5);*/
        display: flex;
        padding-top: 20px;
        padding-left: 10px;
    }

    .total {
        flex: 1;
        font-size: 20px;
    }

    .pageNum {
        flex: 1;
        text-align: right;
    }

    .shzlwttjcx {
        position: fixed;
        z-index: 99;
        top: 0px;
        left: 0px;
        width: 3840px;
        height: 1023px;
        background-color: rgba(0,0,0,0.8);
        /*opacity: 0.8;*/
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
        left: 1794px;
        z-index: 99;
        display: inline-block;
        width: 14px;
        height: 14px;
        background-color: RGBA(37, 212, 255, 1);
    }

    .jiao4_2:nth-child(3) {
        position: absolute;
        top: 905px;
        left: 1794px;
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
        top: -23px;
        left: 0px;
        margin: 80px auto;
        width: 1820px;
        height: 932px;
        border: 1px solid rgba(61, 169, 229, 1);
        background-color: #090B0E;
        opacity: 0.8;
    }

    .content {
        position: relative;
        top: -1026px;
        left: 0px;
        margin: 90px auto;
        width: 1784px;
        height: 892px;
        background-color: #0B202D;
        opacity: 1;
        /*background-color: rgba(12,49,70,1);*/
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
</style>