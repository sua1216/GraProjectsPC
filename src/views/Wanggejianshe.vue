<template>
    <!--网格建设-->
    <div class="wange-ge-jian-she">
        <div>
            <div class="left">
                <Left @changeCeng="changeCeng" v-if="left"></Left>
                <Left2 @changeCeng2="changeCeng2" @back="back" :num="num" v-if="!left"></Left2>
            </div>

            <div class="right">
                <Wanggehuafenjizhi :right_buttom="right_buttom"></Wanggehuafenjizhi>
            </div>

            <!--指示器-->
            <div :class="['zhishiqi',sijiflag?'sijiflag':'',zhishiqiBGC?'zhishiqiBGC':'']" @mouseleave="leavezhishiqi" @mouseenter="enterzhishiqi">
                <div class="jiao1_2">
                    <div class="jiao1_1">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <ul>
<!--                    <li @click="shaixuan(1)">-->
<!--                        <span>-->
<!--                            <div class="kuang"></div>-->
<!--                            <img v-if="shaixuan1" class="gou" :src="require('../../public/images/gou.png')" alt="">-->
<!--                        </span>-->
<!--                        <img class="zhishiqiimg" :src="require('../../public/images/yishouli.png')" alt="">-->
<!--                        <span>网格长</span>-->
<!--                        <span class="num">800/1000</span>-->
<!--                    </li>-->
                    <li @click="shaixuan(2)">
                        <span>
                            <div class="kuang"></div>
                            <img v-if="shaixuan2" class="gou" :src="require('../../public/images/gou.png')" alt="">
                        </span>
                        <img class="zhishiqiimg" :src="require('../../public/images/yijiean.png')" alt="">
                        <span class="zzwgy">专职网格员</span>
                        <span class="num">30/35</span>
                    </li>
                    <li @click="shaixuan(3)">
                        <span>
                            <div class="kuang"></div>
                            <img v-if="shaixuan3" class="gou" :src="require('../../public/images/gou.png')" alt="">
                        </span>
                        <img class="zhishiqiimg" :src="require('../../public/images/xinanjian.png')" alt="">
                        <span class="zywgy">专业网格员</span>
                        <span class="num">8/10</span>
                    </li>
<!--                    <li @click="shaixuan(4)">-->
<!--                        <span>-->
<!--                            <div class="kuang"></div>-->
<!--                            <img v-if="shaixuan4" class="gou" :src="require('../../public/images/gou.png')" alt="">-->
<!--                        </span>-->
<!--                        <img class="zhishiqiimg" :src="require('../../public/images/dangyuan.png')" alt="">-->
<!--                        <span>党员</span>-->
<!--                        <span class="num">800/1000</span>-->
<!--                    </li>-->
                </ul>
            </div>

            <div class="zheZhao zheZhao1"></div>
            <div class="zheZhao zheZhao2"></div>
        </div>

        <!--县市的弹窗  二级弹窗-->
        <div class="xs" v-if="xstanchaungshow">
            <Xianshitanchuang @close="close" :BoxNum="BoxNum"></Xianshitanchuang>
        </div>

        <!--三级网格-->
        <div class="sanJi" v-if="sanJiShow">
            <div class="sanji-right">
                <SanJiRight :DGdata="DGdata"></SanJiRight>
                <div class="zhezhao3"></div>
            </div>
        </div>

        <!--专员详情弹窗-->
        <div class="ZhuanyuanMsg" v-if="ZhuanyuanMsgShow" :style="'top:'+[(XQposition[1]/1-470)>0?(XQposition[1]/1-470):(470-XQposition[1]/1)]+'px;'+'left:'+XQposition[0]+'px'">
            <div class="MSGtitleBox">
                <span class="MSGtitle">{{ZhuanyuanMsg.name}}</span>
                <span class="job">{{ZhuanyuanMsg.job}}</span>
            </div>
            <span @click="closeZhuanYuanMSG" class="closeZhuanYuanMSG">×</span>

            <div class="ZhuanyuanMsgContent">
                <div class="ZhuanyuanMsgLeft">
                    <div>当前位置：</div>
                    <div>联系方式：</div>
                    <div>所属县市：</div>
                    <div>所属乡镇：</div>
                    <div>所属社区：</div>
                    <div>所属村小组：</div>
                    <div>所属基础网格：</div>
                </div>
                <div class="ZhuanyuanMsgRight">
                    <div>{{ZhuanyuanMsg.position}}</div>
                    <div>{{ZhuanyuanMsg.phone}}</div>
                    <div>{{ZhuanyuanMsg.ssxs}}</div>
                    <div>{{ZhuanyuanMsg.ssxz}}</div>
                    <div>{{ZhuanyuanMsg.sssq}}</div>
                    <div>{{ZhuanyuanMsg.sscxz}}</div>
                    <div>{{ZhuanyuanMsg.ssjcwg}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    //创建和销毁maker的js文件
    import vueMarkerMixin from '@c/base/map/mixin/marker.js'

    import Left from "../components/pages/Wanggejianshe/Left.vue"
    import Left2 from "../components/pages/Wanggejianshe/Left2.vue"
    import Wanggehuafenjizhi from "../components/pages/Wanggejianshe/Wanggehuafenjizhi.vue"
    import Xianshitanchuang from "../components/pages/Wanggejianshe/Xianshitanchuang.vue"
    import SanJiRight from "../components/pages/Wanggejianshe/SanJiRight.vue"


    //引入marker
    //一级
    import ZhouMarker from "@cp/Wanggejianshe/marker/ZhouMarker.vue";
    import WanggezhangMarker from "@cp/Wanggejianshe/marker/WanggezhangMarker.vue";
    import ZhuanzhiwanggeyuanMarker from "@cp/Wanggejianshe/marker/ZhuanzhiwanggeyuanMarker.vue";
    import ZhuanyewanggeyuanMarker from "@cp/Wanggejianshe/marker/ZhuanyewanggeyuanMarker.vue";
    import DangyuanMarker from "@cp/Wanggejianshe/marker/DangyuanMarker.vue";

    //二级
    import ShixianMarker from "@cp/Wanggejianshe/marker/ShixianMarker.vue";
    import WanggezhangMarker2 from "@cp/Wanggejianshe/marker/WanggezhangMarker2.vue";
    import ZhuanzhiwanggeyuanMarker2 from "@cp/Wanggejianshe/marker/ZhuanzhiwanggeyuanMarker2.vue";
    import ZhuanyewanggeyuanMarker2 from "@cp/Wanggejianshe/marker/ZhuanyewanggeyuanMarker2.vue";
    import DangyuanMarker2 from "@cp/Wanggejianshe/marker/DangyuanMarker2.vue";


    //三级
    import XiangzhenMarker from "@cp/Wanggejianshe/marker/XiangzhenMarker.vue";


    //四级
    import SijiMarker from "@cp/Wanggejianshe/marker/SijiMarker.vue";
    import SijiWGZMarker from "@cp/Wanggejianshe/marker/SijiWGZMarker.vue";
    import SijiZZWGYMarker from "@cp/Wanggejianshe/marker/SijiZZWGYMarker.vue";
    import SijiZYWGYMarker from "@cp/Wanggejianshe/marker/SijiZYWGYMarker.vue";
    import SijiDYMarker from "@cp/Wanggejianshe/marker/SijiDYMarker.vue";

    import DongGuaZhenGrid from "@cp/Wanggejianshe/sourse/DongGuaZhenGrid.js";
    import XiangQing from "@cp/Wanggejianshe/sourse/XiangQing.js";


    import mapboxgl from 'mapbox-gl'

    //五级
    import CunMarker from "@cp/Wanggejianshe/marker/CunMarker.vue";

    //六级
    import CXZMarker from "@cp/Wanggejianshe/marker/CXZMarker.vue";

    let grid1 = window.grid1
    let grid2 = window.grid2
    let grid3 = window.grid3
    let grid4 = window.grid4
    let grid5 = window.grid5
    let grid6 = window.grid6
    export default {
        name: "Wanggejianshe",
        components: {
            "Left": Left,
            "Left2": Left2,
            "Wanggehuafenjizhi": Wanggehuafenjizhi,
            'Xianshitanchuang': Xianshitanchuang,
            "SanJiRight":SanJiRight
        },
        mixins:[vueMarkerMixin],
        data() {
            return {
                left:true,
                map: null,
                right_buttom: 1,//用于控制右边-底部的显示部分
                xstanchaungshow: false,//用于控制 县市弹窗 的变量
                sanJiShow: false,//用于控制在三级网格下的显示内容
                //sanjiTanchuang:false,//用于控制三级网格的弹窗的显示

                //中心坐标数据  三级网格使用的
                zxzbData:[],

                //控制筛选框的变量
                shaixuan1:true,
                shaixuan2:true,
                shaixuan3:true,
                shaixuan4:true,

                //ZhuanyuanMsgShow:false,//控制专员详情的弹窗

                // ZhuanyuanMsg:{//专员详情的数据
                //     name:"周春荣",
                //     job:"专职网格员",
                //     position:"成都市武侯区西部智谷D区",
                //     phone:"15283555555",
                //     ssxs:"楚雄市",
                //     ssxz:"龙门镇",
                //     sssq:"江陵社区",
                //     sscxz:"吴新村（编号）",
                //     ssjcwg:"WJ0123001"
                // },

                //
                marker:{
                    ZhouMarker:[],//州
                    ShixianMarker:[],//市县
                    XiangzhenMarker:[],//乡镇
                    WanggezhangMarker:[],//网格长
                    ZhuanzhiwanggeyuanMarker:[],//专职网格员
                    ZhuanyewanggeyuanMarker:[],//专业网格员
                    DangyuanMarker:[],//党员

                    //四级网格
                    SijiMarker:[],//四级 镇

                    SijiWGZMarker:[],//网格长
                    SijiZZWGYMarker:[],//资质网格员
                    SijiZYWGYMarker:[],//专业网格员
                    SijiDYMarker:[],//党员


                    // 五级
                    CunMarker:[],// 村

                    //六级
                    CXZMarker:[],// 村小组

                },
                markerData:{
                    ZhouMarkerData:[],//州
                    ShixianMarkerData:[],//市县
                    XiangzhenMarkerData:[],//乡镇
                    WanggezhangMarkerData:[],//网格长
                    ZhuanzhiwanggeyuanMarkerData:[],//专职网格员
                    ZhuanyewanggeyuanMarkerData:[],//专业网格员
                    DangyuanMarkerData:[],//党员

                    //四级网格
                    SijiMarkerData:[],//四级 镇
                    SijiWGZMarkerData:[],//网格长
                    SijiZZWGYMarkerData:[],//资质网格员
                    SijiZYWGYMarkerData:[],//专业网格员
                    SijiDYMarkerData:[],//党员

                    //五级
                    CunMarkerData:[],// 村

                    //六级
                    CXZMarkerData:[],// 村小组

                },

                sijiflag:false,//控制右下角指示器的显示位置

                num:1,//用于控制4,5,6级的左边筛选显示

                BoxNum:"二级",//用于设置显示是第几级   //现在记录的是对应详情的所有信息
                zhishiqiBGC:false,//用于控制指示器的背景颜色
                sijiMoveList:{},//记录四级下面移动鼠标的网格数据
                sijiClickList:{},//记录四级点击的时候的弹窗数据，防止二次在同样区域点击，又去进行数据判断

                DGdata:"",
            }
        },

        watch:{

        },
        computed:{//实时监听store中的对应数据
            ZhuanyuanMsgShow(){
                return this.$store.state.clickZhuanyuanMarker;
            },
            ZhuanyuanMsg(){
                return this.$store.state.ZhuanyuanMsg;
            },
            XQposition(){
                return this.$store.state.XQposition;
            }
        },
        methods: {
            //用于控制指示器的背景颜色
            leavezhishiqi:function(){
                //console.log(1)
                this.zhishiqiBGC=false
            },
            enterzhishiqi:function(){
                //console.log(2)
                this.zhishiqiBGC=true
            },
            //地图移动
            fly() {
                this.map.flyTo({
                    center: [101.93045229901017, 25.000717706718844],
                    zoom: 9,
                    bearing: 9,
                    pitch: 80,
                    speed: 1.04,
                });
            },
            fly2() {
                this.map.flyTo({
                    center: [101.93045229901017, 25.000717706718844],
                    zoom: 9,
                    bearing: 9,
                    pitch: 90,
                    speed: 1.04,
                });
            },
            fly3() {
                this.map.flyTo({
                    center: [101.60027466389096,25.10839323939821],
                    zoom: 11.8,
                    bearing: 9,
                    pitch: 20,
                    speed: 1.04,
                });
            },
            fly4() {
                this.map.flyTo({
                    center: [101.60772875272047,25.08306053626012],
                    zoom: 12.3,
                    bearing: 9,
                    pitch: 30,
                    speed: 1.04,
                });
            },
            fly5() {
                this.map.flyTo({
                    center: [101.54052875272047,25.05706053626012],
                    zoom: 14.5,
                    bearing: 1,
                    pitch: 50,
                    speed: 1.04,
                });
            },

            //关闭专员详情弹窗
            closeZhuanYuanMSG:function(){
                //console.log(1)
                this.$store.commit('ZhuanyuanXQHide')
            },
            //右下角的筛选
            shaixuan:function(index){
                var num = this.right_buttom;
                var left = this.left;
                //是在1/2/3级下
                if(left==true){
                    switch (index) {
                        // case 1:{
                        //     if(this.shaixuan1==true){
                        //         this.removeMarker(this.marker.WanggezhangMarker);
                        //     }else {
                        //         this.marker.WanggezhangMarker=[];
                        //         this.markerData.WanggezhangMarkerData=[];
                        //         if(num==1){
                        //             this.getWanggezhangMarker();
                        //         }else if(num==2||num==3){
                        //             this.getWanggezhangMarker2();
                        //         }
                        //
                        //     }
                        //     this.shaixuan1=!this.shaixuan1;
                        //     break;
                        // }
                        case 2:{
                            if(this.shaixuan2==true){
                                this.removeMarker(this.marker.ZhuanzhiwanggeyuanMarker);
                            }else {
                                this.marker.ZhuanzhiwanggeyuanMarker=[];
                                this.markerData.ZhuanzhiwanggeyuanMarkerData=[];
                                if(num==1){
                                    this.getZhuanzhiwanggeyuanMarker();
                                }else if(num==2||num==3){
                                    this.getZhuanzhiwanggeyuanMarker2();
                                }
                            }
                            this.shaixuan2=!this.shaixuan2;
                            break;
                        }
                        case 3:{
                            if(this.shaixuan3==true){
                                this.removeMarker(this.marker.ZhuanyewanggeyuanMarker);
                            }else {
                                this.marker.ZhuanyewanggeyuanMarker=[];
                                this.markerData.ZhuanyewanggeyuanMarkerData=[];
                                if(num==1){
                                    this.getZhuanyewanggeyuanMarker();
                                }else if(num==2||num==3){
                                    this.getZhuanyewanggeyuanMarker2();
                                }
                            }
                            this.shaixuan3=!this.shaixuan3;
                            break;
                        }
                        // case 4:{
                        //     if(this.shaixuan4==true){
                        //         this.removeMarker(this.marker.DangyuanMarker);
                        //     }else {
                        //         this.marker.DangyuanMarker=[];
                        //         this.markerData.DangyuanMarkerData=[];
                        //         if(num==1){
                        //             this.getDangyuanMarker();
                        //         }else if(num==2||num==3){
                        //             this.getDangyuanMarker2();
                        //         }
                        //     }
                        //     this.shaixuan4=!this.shaixuan4;
                        //     break;
                        // }
                    }
                //在4,5,6级下
                }else {
                    switch (index) {
                        // case 1:{
                        //     if(this.shaixuan1==true){
                        //         this.removeMarker(this.marker.SijiWGZMarker);
                        //     }else {
                        //         this.marker.SijiWGZMarker=[];
                        //         this.markerData.SijiWGZMarkerData=[];
                        //         this.getSijiWGZMarker();
                        //     }
                        //     this.shaixuan1=!this.shaixuan1;
                        //     break;
                        // }
                        case 2:{
                            if(this.shaixuan2==true){
                                this.removeMarker(this.marker.SijiZZWGYMarker);
                            }else {
                                this.marker.SijiZZWGYMarker=[];
                                this.markerData.SijiZZWGYMarkerData=[];
                                this.getSijiZZWGYMarker();
                            }
                            this.shaixuan2=!this.shaixuan2;
                            break;
                        }
                        case 3:{
                            if(this.shaixuan3==true){
                                this.removeMarker(this.marker.SijiZYWGYMarker);
                            }else {
                                this.marker.SijiZYWGYMarker=[];
                                this.markerData.SijiZYWGYMarkerData=[];
                                this.getSijiZYWGYMarker();
                            }
                            this.shaixuan3=!this.shaixuan3;
                            break;
                        }
                        // case 4:{
                        //     if(this.shaixuan4==true){
                        //         this.removeMarker(this.marker.SijiDYMarker);
                        //     }else {
                        //         this.marker.SijiDYMarker=[];
                        //         this.markerData.SijiDYMarkerData=[];
                        //         this.getSijiDYMarker();
                        //     }
                        //     this.shaixuan4=!this.shaixuan4;
                        //     break;
                        // }
                    }
                }
            },
            //左边的筛选
            changeCeng: function (num) {//点击左边按钮的进行层级切换   ******************** 一、二、三级共用
                this.right_buttom = num;

                //this.shaixuan1=true;
                this.shaixuan2=true;
                this.shaixuan3=true;
                //this.shaixuan4=true;

                this.removeMarker(this.marker);
                this.marker.ZhouMarker=[];
                this.markerData.ZhouMarkerData=[];
                this.marker.ShixianMarker=[];
                this.markerData.ShixianMarkerData=[];
                this.marker.XiangzhenMarker=[];
                this.markerData.XiangzhenMarkerData=[];
                this.marker.WanggezhangMarker=[];
                this.markerData.WanggezhangMarkerData=[];
                this.marker.ZhuanzhiwanggeyuanMarker=[];
                this.markerData.ZhuanzhiwanggeyuanMarkerData=[];
                this.marker.ZhuanyewanggeyuanMarker=[];
                this.markerData.ZhuanyewanggeyuanMarkerData=[];
                this.marker.DangyuanMarker=[];
                this.markerData.DangyuanMarkerData=[];

                if (num == 1) {
                    this.sanJiShow = false;
                    this.sijiflag=false;
                    if (this.map.getLayer("grid")) {
                        this.map.setLayoutProperty("grid", "visibility", "visible");
                    }
                    if (this.map.getLayer('grid2')){
                        this.map.setLayoutProperty("grid2", "visibility", "none");
                    }
                    if (this.map.getLayer("grid3")) {
                        this.map.setLayoutProperty("grid3", "visibility", "none");
                    }
                    if(this.map.getLayer('myline2_0')){
                        this.map.removeLayer('myline2_0')
                        this.map.removeSource('myline2_0')
                    }

                    if(this.map.getLayer('myline3_0')){
                        this.map.removeLayer('myline3_0')
                        this.map.removeSource('myline3_0')
                    }

                    this.fly();
                    this.getZhouMarker();
                    //this.getWanggezhangMarker();//网格长
                    this.getZhuanzhiwanggeyuanMarker();//专职网格员
                    this.getZhuanyewanggeyuanMarker();//专业网格员
                    //this.getDangyuanMarker();//党员

                } else if (num == 2) {
                    if(this.map.getLayer('myline3_0')){
                        this.map.removeLayer('myline3_0')
                        this.map.removeSource('myline3_0')
                    }
                    this.line2()
                    this.$store.commit("changeNum",2)
                    this.sanJiShow = false;
                    this.sijiflag=false;
                    this.fly2();
                    if (this.map.getLayer("grid")) {
                        this.map.setLayoutProperty("grid", "visibility", "none");
                    }
                    if (this.map.getLayer("grid3")) {
                        this.map.setLayoutProperty("grid3", "visibility", "none");
                    }
                    if (!this.map.getLayer("grid2")) {//如果没有这个图层，就生成这个图层
                        this.grid2();
                    } else {//否则就是让这个已经存在的图层显示
                        this.map.setLayoutProperty("grid2", "visibility", "visible");
                    }
                    //二级
                    this.getShixianMarker();//市县
                    //this.getWanggezhangMarker2();//网格长
                    this.getZhuanzhiwanggeyuanMarker2();//专职网格员
                    this.getZhuanyewanggeyuanMarker2();//专业网格员
                    //this.getDangyuanMarker2();//党员

                } else if (num == 3) {
                    this.line3()
                    this.$store.commit("changeNum",3)
                    if (this.map.getLayer("grid")) {
                        this.map.setLayoutProperty("grid", "visibility", "none");
                    }
                    if (this.map.getLayer("grid2")) {
                        this.map.setLayoutProperty("grid2", "visibility", "none");
                    }
                    if(this.map.getLayer('myline2_0')){
                        this.map.removeLayer('myline2_0')
                        this.map.removeSource('myline2_0')
                    }


                    var CSQ = 0;//村社区
                    var CXZ = 0;//村小组
                    var JCWG = 0;//基础网格
                    var ZZ =0;//专职
                    var ZY = 0;//专业

                    for (let j = 0; j < XiangQing.length; j++) {
                        CSQ+=XiangQing[j].l3_num/1;
                        CXZ+=XiangQing[j].l4_num/1;
                        JCWG+=XiangQing[j].l5_num/1;
                        ZZ+=XiangQing[j].full_time_grid_user_num/1;
                        ZY+=XiangQing[j].professional_grid_user_num/1;
                    }

                    var obj=[
                        [
                            {name:"地名",value:"东瓜镇"},
                            {name:"num",value:"三级"},
                            [
                                {name:"区域面积",value:"301平方公里"},
                                {name:"村社区",value:CSQ},
                            ],
                            [
                                {name:"村小组",value:CXZ},
                                {name:"基层网格",value:JCWG}
                            ]
                        ],
                        [
                            [
                                {name:"网格长",value:"杨志敏"},
                                {name:"党组织数",value:"116"},
                            ],
                            [
                                {name:"党员",value:"1861"},
                                {name:"专职网格员",value:ZZ},
                            ],
                            [
                                {name:"专业网格员",value:ZY},
                                {name:"党员上报",value:"31"},
                            ],
                            [
                                {name:"群众上报",value:"29"},
                                {name:"巡查发现",value:"15"},
                            ],
                            [
                                {name:"其他渠道",value:"0"}
                            ]
                        ],
                        [
                            [
                                {name:"户籍人口",value:"16041人"},
                                {name:"特殊人口",value:"32人"}
                            ],
                            [
                                {name:"低保",value:"19人"},
                                {name:"五保",value:"8人"}
                            ],
                            [
                                {name:"建档立卡贫困户",value:"0人"},
                                {name:"上访人员",value:"0人"}
                            ],
                            [
                                {name:"企业",value:"1家"}
                            ]
                        ],
                        [
                            {name:"综合指数",value:"97.9"},
                            {name:"服务指数",value:"96"},
                            {name:"活力指数",value:"98"},
                            {name:"和谐指数",value:"97"},
                            {name:"绩效指数",value:"97.2"},
                            {name:"平安指数",value:"95.1"}
                        ],
                    ]
                    this.DGdata = obj;

                    if (this.map.getLayer("grid3")) {
                        this.map.setLayoutProperty("grid3", "visibility", "visible");
                    }else {
                        this.grid3();
                        if(this.zxzbData.length<1){
                            this.getZxdzb();
                        }
                    }
                    this.getShixianMarker();//市县
                    this.getXiangzhenMarker();//乡镇
                    //this.getWanggezhangMarker2();//网格长
                    this.getZhuanzhiwanggeyuanMarker2();//专职网格员
                    this.getZhuanyewanggeyuanMarker2();//专业网格员
                    //this.getDangyuanMarker2();//党员
                }

            },
            //4/5/6级的筛选
            changeCeng2:function(num){
                //console.log(num)
                switch (num) {
                    case 1:{
                        this.fly3();
                        this.num=1;
                        if(!this.map.getLayer("grid4")){
                            this.grid4()
                        }
                        if(this.map.getLayer("grid5")){
                            this.map.removeLayer("grid5")
                            this.map.removeSource("grid5")
                            this.removeMarker(this.marker.CunMarker);
                            this.marker.CunMarker=[];
                            this.markerData.CunMarkerData=[];
                        }
                        if(this.map.getLayer("grid6")){
                            this.map.removeLayer("grid6")
                            this.map.removeSource("grid6")
                            this.removeMarker(this.marker.CXZMarker);
                            this.marker.CXZMarker=[];
                            this.markerData.CXZMarkerData=[];
                        }
                        this.getSijiMarker();
                        break;
                    }
                    case 2:{
                        this.fly4();
                        this.num=2;
                        if(this.map.getLayer("grid4")){
                            //this.map.removeLayer("grid4")
                            //this.map.removeSource("grid4")
                            this.removeMarker(this.marker.SijiMarker);
                            this.marker.SijiMarker=[];
                            this.markerData.SijiMarkerData=[];
                        }

                        if(this.map.getLayer("grid6")){
                            this.map.removeLayer("grid6")
                            this.map.removeSource("grid6")
                            this.removeMarker(this.marker.CXZMarker);
                            this.marker.CXZMarker=[];
                            this.markerData.CXZMarkerData=[];
                        }
                        if(!this.map.getLayer("grid5")){
                            this.grid5();
                        }
                        this.getCunMarker();
                        break;
                    }
                    case 3:{
                        this.fly5();
                        this.num=3;
                        this.removeMarker(this.marker.CunMarker);
                        this.marker.CunMarker=[];
                        this.markerData.CunMarkerData=[];
                        this.marker.CXZMarker=[];
                        this.markerData.CXZMarkerData=[];
                        if(this.map.getLayer("grid4")){
                            // this.map.removeLayer("grid4")
                            // this.map.removeSource("grid4")
                            this.removeMarker(this.marker.SijiMarker);
                            this.marker.SijiMarker=[];
                            this.markerData.SijiMarkerData=[];
                        }
                        if(!this.map.getLayer("grid6")){
                            this.grid6();
                        }
                        this.getCXZMarker();
                        break;
                    }
                }
            },

            close: function () {//关闭县市弹窗
                this.xstanchaungshow = false
            },
            //****************************************************************************一级
            // 地图概况  一级图层
            grid1: function () {
                this.map.addLayer({
                    id: 'grid',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [grid1]
                            }
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(0,0,0,0.1)'
                    }
                })
                this.map.on('click', 'grid', (e) => {
                    var obj=[
                        [
                            {name:"地名",value:"楚雄州"},
                            {name:"num",value:"一级"},
                            [
                                {name:"区域面积",value:"2.9万平方公里"},
                                {name:"市县",value:"10个"}
                            ],

                            [
                                {name:"乡镇",value:"103个"},
                                {name:"村社区",value:"1101个"}
                            ],
                            [
                                {name:"村小组",value:"10943个"},
                                {name:"基础网格",value:"12773个"}
                            ],
                        ],
                        [
                            [
                                {name:"网格长",value:"杨斌"},
                                {name:"党组织数量",value:"12150"}
                            ],
                            [
                                {name:"党员",value:"158853人"},
                                {name:"专职网格员",value:"10001人"}
                            ],
                            [

                                {name:"专业网格员",value:"3281人"},
                                {name:"党员上报",value:"100"}
                            ],
                            [
                                {name:"群众上报",value:"88"},
                                {name:"巡查发现",value:"94"}
                            ],
                            [
                                {name:"其他渠道",value:"31"}
                            ]
                        ],
                        [
                            [
                                {name:"户籍人口",value:"48万"},
                                {name:"特殊人口",value:"320人"}
                            ],
                            [
                                {name:"低保",value:"111人"},
                                {name:"五保",value:"89人"}
                            ],
                            [
                                {name:"建档立卡贫困户",value:"105人"},
                                {name:"上访人员",value:"5人"}
                            ],
                            [
                                {name:"企业",value:"297家"}
                            ]
                        ],
                        [
                            {name:"综合指数",value:"97.9"},
                            {name:"服务指数",value:"96"},
                            {name:"活力指数",value:"98"},
                            {name:"和谐指数",value:"97"},
                            {name:"绩效指数",value:"97.2"},
                            {name:"平安指数",value:"95.1"}
                        ],
                    ]

                    this.BoxNum=obj;
                    this.xstanchaungshow = true;
                })
            },

            line1:function(){
                if(this.map.getLayer("myline1")){
                    return ;
                }
                this.map.addSource("line1", {       /* addSource()函数添加资源,资源ID是route */
                    "type": "geojson",
                    "data": {                  /* GeoJSON格式数据 */
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": grid1
                        }
                    }
                });

                this.map.addLayer({                 /* 为地图添加layer */
                    "id": "myline1",             /* layer id是route */
                    "type": "line",            /* line类型layer*/
                    "source": "line1",         /* 资源引用的是上面定义的source*/
                    "layout": {
                        "line-join": "round",  /* 线条相交的形状 */
                        "line-cap": "round"    /* 线条末端形状 */
                    },
                    "paint": {
                        "line-color": "rgba(255,255,255,1)",  /* 线条颜色 */
                        "line-width": 5        /* 线条宽度 */
                    }
                });
            },

            //**************************************************************二级
            //生成二级网格
            grid2() {
                //console.log(grid2)
                this.line2()
                const second = grid2.slice(1)
                const grid2Features = second.map(d => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [d]
                        }
                    }
                })

                this.map.addLayer({
                    id: 'grid2',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid2Features
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(0,0,0,0.1)'
                    }
                })
                this.map.on('click', 'grid2', (e) => {
                    var obj=[
                        [
                            {name:"地名",value:"楚雄市"},
                            {name:"num",value:"二级"},
                            [
                                {name:"区域面积",value:"4433平方公里"},
                                {name:"乡镇",value:"15个"}]
                            ,
                            [
                                {name:"村社区",value:"154个"},
                                {name:"村小组",value:"2045个"}
                            ],
                            [
                                {name:"基础网格",value:"2860个"}
                            ],
                        ],
                        [
                            [
                                {name:"网格长",value:"李先祥"},
                                {name:"党员",value:"23812人"}
                            ],
                            [
                                {name:"专职网格员",value:"28人"},
                                {name:"专业网格员",value:"8人"}
                            ],
                            [
                                {name:"党员上报",value:"19"},
                                {name:"群众上报",value:"16"}
                            ],
                            [
                                {name:"巡查发现",value:"9"},
                                {name:"其他渠道",value:"3"}
                            ],
                        ],
                        [
                            [
                                {name:"户籍人口",value:"645064人"},
                                {name:"特殊人口",value:"310人"}
                            ],
                            [
                                {name:"低保",value:"111人"},
                                {name:"五保",value:"89人"}
                            ],
                            [
                                {name:"建档立卡贫困户",value:"105人"},
                                {name:"上访人员",value:"5人"}
                            ],
                            [
                                {name:"企业",value:"297家"}
                            ]
                        ],
                        [
                            {name:"综合指数",value:"97.9"},
                            {name:"服务指数",value:"96"},
                            {name:"活力指数",value:"98"},
                            {name:"和谐指数",value:"97"},
                            {name:"绩效指数",value:"97.2"},
                            {name:"平安指数",value:"95.1"}
                        ],
                    ]
                    this.BoxNum=obj;
                    this.xstanchaungshow = true;
                    var point = e.lngLat;
                    for (let i = 0; i < grid2.length; i++) {
                        var list = grid2[i];
                        var result = this.isptinpoly(point, list);
                        var flag=0;
                        if (result == true&&flag!=1) {
                            // console.log(list)
                            flag++
                        }
                    }
                })
            },

            line2:function(){
                if(this.map.getLayer("myline2_0")){
                    return ;
                }else {
                    const line2Features = grid2.map(d => {
                        return {
                            type:'Feature',
                            geometry:{
                                type:'LineString',
                                coordinates:d
                            }
                        }
                    })

                    this.map.addLayer({
                        id:'myline2_0',
                        type:'line',
                        source:{
                            type:'geojson',
                            data:{
                                type:'FeatureCollection',
                                features:line2Features
                            }
                        },
                        paint:{
                            "line-color": "rgba(255,255,255,1)",  /* 线条颜色 */
                            "line-width": 4       /* 线条宽度 */
                        }
                    })
                }
            },

            //判断点是否在四边形区域
            isptinpoly: function (point, list) {
                let lat = point.lat;
                let lng = point.lng;
                let iSum = 0;
                let iCount = list.length
                if (iCount < 3) {
                    return false
                }
                for (let i = 0; i < iCount; i++) {
                    let plng1 = list[i][0];
                    let plat1 = list[i][1];
                    let plng2, plat2;
                    if (i == iCount - 1) {
                        plng2 = list[0][0];
                        plat2 = list[0][1];
                    } else {
                        plng2 = list[i + 1][0];
                        plat2 = list[i + 1][1];
                    }
                    if ((lat >= plat1 && lat < plat2) || (lat >= plat2 && lat < plat1)) {
                        if (Math.abs(plat1 - plat2) > 0) {
                            let plng = plng1 - ((plng1 - plng2) * (plat1 - lat)) / (plat1 - plat2);
                            if (plng < lng) {
                                iSum += 1;
                            }
                        }
                    }
                }
                if ((iSum % 2) != 0) {
                    return true
                } else {
                    return false
                }
            },
            //生成二级县的图标
            erjiwangge: function () {
                var data = this.data;
                for (let i = 0; i < data.length; i++) {
                    var _this = this;
                    this.map.loadImage(require('../../public/images/point_wgjs_zhzx2@2x.png'), function (error, image) {
                        if (error) throw error;
                        _this.map.addImage('cxz' + i, image);
                        _this.map.addLayer({
                            "id": "cx" + i,
                            "type": "symbol",
                            "source": {
                                "type": "geojson",
                                "data": {
                                    "type": "FeatureCollection",
                                    "features": [{
                                        "type": "Feature",
                                        "geometry": {
                                            "type": "Point",
                                            "coordinates": data[i]
                                        }
                                    }]
                                }
                            },
                            "layout": {
                                "icon-image": "cxz" + i,
                                "icon-size": 0.25
                            }
                        });
                    });
                }
            },
            //生成二级县市的文字
            erjiwenzi() {
                var _this = this;
                var data = this.data;
                var data2 = this.data2;
                for (let i = 0; i < data2.length; i++) {
                    let el = document.createElement('div');
                    el.innerHTML = data2[i];
                    let currentMarkerTitle = new mapboxgl.Marker(el, {offset: [0, 70]})
                        .setLngLat(data[i])
                        .addTo(_this.map);

                    var time = setInterval(() => {
                        if (this.right_buttom != 2) {
                            currentMarkerTitle.remove()
                        }
                    }, 100)
                }

            },
            //****************************************************************************三级
            grid3() {
                const grid3Features = grid3.map(d => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [d]
                        }
                    }
                })
                this.map.addLayer({
                    id: 'grid3',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid3Features
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(0,0,0,0.1)'
                    }
                })
                this.map.on('click', 'grid3', this.grid3Click)
            },
            grid3Click:function(){
                if(this.map.getLayer('myline3_0')){
                    this.map.removeLayer('myline3_0')
                    this.map.removeSource('myline3_0')
                }
                this.sanJiShow = true;
                this.sijiflag = true;

                var obj=[
                    [
                        {name:"地名",value:"东瓜镇"},
                        {name:"num",value:"三级"},
                        [{name:"区域面积",value:"301平方公里"},
                        {name:"村社区",value:"13个"}],
                        [{name:"村小组",value:"84个"},
                        {name:"基础网格",value:"147个"}],
                    ],
                    [
                        [{name:"网格长",value:"郑浩瀚"},
                        {name:"党员",value:"212人"}],
                        [{name:"专职网格员",value:"7人"},
                        {name:"专业网格员",value:"6人"}],
                        [{name:"党员上报",value:"3"},
                        {name:"群众上报",value:"1"}],
                        [{name:"巡查发现",value:"1"},
                        {name:"其他渠道",value:"0"}],
                    ],
                    [
                        [{name:"户籍人口",value:"8.9万"},
                        {name:"特殊人口",value:"32人"}],
                        [{name:"低保",value:"19人"},
                        {name:"五保",value:"8人"}],
                        [{name:"建档立卡贫困户",value:"0人"},
                        {name:"上访人员",value:"0人"}],
                        [{name:"企业",value:"120家"}]
                    ],
                    [
                        {name:"综合指数",value:"97.9"},
                        {name:"服务指数",value:"96"},
                        {name:"活力指数",value:"98"},
                        {name:"和谐指数",value:"97"},
                        {name:"绩效指数",value:"97.2"},
                        {name:"平安指数",value:"95.1"}
                    ],
                ]

                var data = false;
                this.$store.commit('ChangeTopStyle',data)

                this.shaixuan1=true;
                this.shaixuan2=true;
                this.shaixuan3=true;
                this.shaixuan4=true;

                if (this.map.getLayer('grid2')){
                    this.map.removeLayer("grid2")
                    this.map.removeSource("grid2")
                }

                if (this.map.getLayer('grid3')){
                    this.map.removeLayer("grid3")
                    this.map.removeSource("grid3")
                }

                this.removeMarker(this.marker);
                this.marker.ZhouMarker=[];
                this.markerData.ZhouMarkerData=[];
                this.marker.ShixianMarker=[];
                this.markerData.ShixianMarkerData=[];
                this.marker.XiangzhenMarker=[];
                this.markerData.XiangzhenMarkerData=[];
                this.marker.WanggezhangMarker=[];
                this.markerData.WanggezhangMarkerData=[];
                this.marker.ZhuanzhiwanggeyuanMarker=[];
                this.markerData.ZhuanzhiwanggeyuanMarkerData=[];
                this.marker.ZhuanyewanggeyuanMarker=[];
                this.markerData.ZhuanyewanggeyuanMarkerData=[];
                this.marker.DangyuanMarker=[];
                this.markerData.DangyuanMarkerData=[];
                this.left = false;

                //在四级网格上面加载数据
                this.grid4();
                //this.line4();
            },

            line3:function(){
                if(this.map.getLayer("myline3_0")){
                    return ;
                }else {
                    const line3Features = grid3.map(d => {
                        return {
                            type:'Feature',
                            geometry:{
                                type:'LineString',
                                coordinates:d
                            }
                        }
                    })

                    this.map.addLayer({
                        id:'myline3_0',
                        type:'line',
                        source:{
                            type:'geojson',
                            data:{
                                type:'FeatureCollection',
                                features:line3Features
                            }
                        },
                        paint:{
                            "line-color": "rgba(255,255,255,1)",  /* 线条颜色 */
                            "line-width": 2       /* 线条宽度 */
                        }
                    })
                }
            },

            //计算目标数组的中心点坐标
            calcCenterCrd(crdList) {
                let total = crdList.length;
                let X=0,Y=0,Z=0;
                for(let i in crdList){
                    let lat,lng,x,y,z,item=crdList[i];
                    lng = item[0] * Math.PI / 180;
                    lat = item[1] * Math.PI / 180;
                    x = Math.cos(lat) * Math.cos(lng);
                    y = Math.cos(lat) * Math.sin(lng);
                    z = Math.sin(lat);
                    X += x;
                    Y += y;
                    Z += z;
                }
                X = X / total;
                Y = Y / total;
                Z = Z / total;
                let tempLng = Math.atan2(Y,X);
                let Hyp = Math.sqrt(X*X + Y*Y);
                let tempLat = Math.atan2(Z,Hyp);
                return [tempLng*180/Math.PI , tempLat*180/Math.PI];
            },
            //获取所有的中心点坐标
            getZxdzb(){
                var data = grid3;
                var zxzbData = this.zxzbData;
                for (let i = 0; i < data.length; i++) {
                    var point = this.calcCenterCrd(data[i]);
                    zxzbData.push(point);
                }
                this.zxzbData = zxzbData;
            },
            //返回
            back(){
                this.shaixuan1=true
                this.shaixuan2=true
                this.shaixuan3=true
                this.shaixuan4=true

                this.removeMarker(this.marker);
                this.$store.commit('ZhuanyuanXQHide')

                var data = true;
                this.$store.commit('ChangeTopStyle',true)

                this.marker.SijiMarker=[];
                this.marker.SijiWGZMarker=[];
                this.marker.SijiZZWGYMarker=[];
                this.marker.SijiZYWGYMarker=[];
                this.marker.SijiDYMarker=[];
                this.marker.CunMarker=[];
                this.marker.CXZMarker=[];


                this.marker.SijiMarkerData=[];
                this.marker.SijiWGZMarkerData=[];
                this.marker.SijiZZWGYMarkerData=[];
                this.marker.SijiZYWGYMarkerData=[];
                this.marker.SijiDYMarkerData=[];
                this.marker.CunMarkerData=[];
                this.marker.CXZMarkerData=[];

                this.sanJiShow = false;
                this.sijiflag = false;

                this.map.setLayoutProperty("grid", "visibility", "visible");
                if (this.map.getLayer('grid4')){
                    this.map.removeLayer("grid4")
                    this.map.removeSource("grid4")
                }

                if (this.map.getLayer('grid5')){
                    this.map.removeLayer("grid5")
                    this.map.removeSource("grid5")
                }

                if (this.map.getLayer('grid6')){
                    this.map.removeLayer("grid6")
                    this.map.removeSource("grid6")
                }

                if(this.map.getLayer('SijiMoveLayer')){
                    this.map.removeLayer("SijiMoveLayer")
                    this.map.removeSource("SijiMoveLayer")
                }

                if(this.map.getLayer('moveLine')){
                    this.map.removeLayer("moveLine")
                    this.map.removeSource("moveLine")
                }

                if(this.map.getLayer('myline4')){//
                    this.map.removeLayer("myline4")
                    this.map.removeSource("myline4")
                }


                for (let i = 0; i < grid4.length; i++) {
                    if(this.map.getLayer('DGZLine'+i)){
                        this.map.removeLayer("DGZLine"+i)
                        this.map.removeSource("DGZLine"+i)
                    }
                }

                if(this.map.getLayer('WuJiMoveLayer')){
                    this.map.removeLayer("WuJiMoveLayer")
                    this.map.removeSource("WuJiMoveLayer")
                }

                if(this.map.getLayer('LiuJiMoveLayer')){
                    this.map.removeLayer("LiuJiMoveLayer")
                    this.map.removeSource("LiuJiMoveLayer")
                }
                //一级
                this.left=true;
                this.right_buttom=1;
                this.fly();
                this.getZhouMarker();
                //this.getWanggezhangMarker();//网格长
                this.getZhuanzhiwanggeyuanMarker();//专职网格员
                this.getZhuanyewanggeyuanMarker();//专业网格员
                //this.getDangyuanMarker();//党员
            },


            //地图接口调用*******************************************************************************
            //一级
            //得到州marker
            getZhouMarker:function () {
                var obj = [
                    {
                        name:"楚雄州",
                        lnglat:[101.48886584511467,25.029338222412605]
                    }
                ]
                this.markerData.ZhouMarkerData=obj;
                this.setZhouMarkerPoint();
            },
            //添加到州扎点
            setZhouMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.ZhouMarkerData){
                    let data = this.markerData.ZhouMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:ZhouMarker
                    }
                    this.marker.ZhouMarker.push(this.makeVueMarker(option));
                }
                this.addZhouMarker()
            },
            //创建州扎点
            addZhouMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ZhouMarker,map)
            },


            //得到网格长marker
            getWanggezhangMarker:function () {
                var obj = [
                    {
                        id:"Wanggezhang1",
                        lnglat:[101.64791908430889, 24.523656119933364]
                    },
                    {
                        id:"Wanggezhang2",
                        lnglat:[101.36326088117707, 24.84808028424851]
                    },
                    {
                        id:"Wanggezhang3",
                        lnglat:[100.99817787338026, 25.171656001580573]
                    },
                    {
                        id:"Wanggezhang4",
                        lnglat:[102.06539955307441, 25.161712556422174]
                    },
                    {
                        id:"Wanggezhang5",
                        lnglat:[101.50143959212167, 25.38524354730363]
                    },
                    {
                        id:"Wanggezhang6",
                        lnglat:[101.11297279525287, 25.479499433763706]
                    },
                    {
                        id:"Wanggezhang7",
                        lnglat:[101.10494545149179, 25.905205039023556]
                    }
                ]
                this.markerData.WanggezhangMarkerData=obj;
                this.setWanggezhangMarkerPoint();
            },
            //添加到网格长扎点
            setWanggezhangMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.WanggezhangMarkerData){
                    let data = this.markerData.WanggezhangMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:WanggezhangMarker
                    }
                    this.marker.WanggezhangMarker.push(this.makeVueMarker(option));
                }
                this.addWanggezhangMarker()
            },
            //创建网格长扎点
            addWanggezhangMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.WanggezhangMarker,map)
            },


            //得到专职网格员marker
            getZhuanzhiwanggeyuanMarker:function () {
                var obj = [
                    {
                        id:"Zhuanzhiwanggeyuan1",
                        lnglat:[101.60791908430889, 24.593656119933364]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan2",
                        lnglat:[100.86817787338026, 25.171656001580573]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.79143959212167, 25.308524354730363]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.16494545149179, 25.925205039023556]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.26087323505408,24.937052841697437]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.31941188555629,24.5505111279394]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.0672947761592,24.813771759703613]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.76260334707916,24.923485147822092]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.86963703410214,25.524428135531267]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.84924411875414,24.415713792361004]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.28521155629312,25.486559542300625]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.28582925858557,25.139355116155983]
                    }
                ]
                this.markerData.ZhuanzhiwanggeyuanMarkerData=obj;
                this.setZhuanzhiwanggeyuanMarkerPoint();
            },
            //添加到专职网格员扎点
            setZhuanzhiwanggeyuanMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.ZhuanzhiwanggeyuanMarkerData){
                    let data = this.markerData.ZhuanzhiwanggeyuanMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:ZhuanzhiwanggeyuanMarker
                    }
                    this.marker.ZhuanzhiwanggeyuanMarker.push(this.makeVueMarker(option));
                }
                this.addZhuanzhiwanggeyuanMarker()
            },
            //创建专职网格员扎点
            addZhuanzhiwanggeyuanMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ZhuanzhiwanggeyuanMarker,map)
            },

            //得到专业网格员marker
            getZhuanyewanggeyuanMarker:function () {
                var obj = [
                    {
                        id:"Zhuanyewanggeyuan1",
                        lnglat:[101.10791908430889, 24.493656119933364]
                    },
                    {
                        id:"Zhuanyewanggeyuan2",
                        lnglat:[101.99817787338026, 25.201656001580573]
                    },
                    {
                        id:"Zhuanyewanggeyuan3",
                        lnglat:[101.63143959212167, 25.40524354730363]
                    },
                    {
                        id:"Zhuanyewanggeyuan4",
                        lnglat:[101.26494545149179, 25.425205039023556]
                    },
                    {
                        id:"Zhuanyewanggeyuan4",
                        lnglat:[101.41306398396557,24.80535891174505]
                    },
                ]
                this.markerData.ZhuanyewanggeyuanMarkerData=obj;
                this.setZhuanyewanggeyuanMarkerPoint();
            },
            //添加到专业网格员扎点
            setZhuanyewanggeyuanMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.ZhuanyewanggeyuanMarkerData){
                    let data = this.markerData.ZhuanyewanggeyuanMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:ZhuanyewanggeyuanMarker
                    }
                    this.marker.ZhuanyewanggeyuanMarker.push(this.makeVueMarker(option));
                }
                this.addZhuanyewanggeyuanMarker()
            },
            //创建专业网格员扎点
            addZhuanyewanggeyuanMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ZhuanyewanggeyuanMarker,map)
            },

            //得到党员marker
            getDangyuanMarker:function () {
                var obj = [
                    {
                        id:"Dangyuan1",
                        lnglat:[101.66791908430889, 25.593656119933364]
                    }
                ]
                this.markerData.DangyuanMarkerData=obj;
                this.setDangyuanMarkerPoint();
            },
            //添加到党员扎点
            setDangyuanMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.DangyuanMarkerData){
                    let data = this.markerData.DangyuanMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:DangyuanMarker
                    }
                    this.marker.DangyuanMarker.push(this.makeVueMarker(option));
                }
                this.addDangyuanMarker()
            },
            //创建党员扎点
            addDangyuanMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.DangyuanMarker,map)
            },


            ////////////////////////////////////////////////////
            //二级
            //得到市县marker
            getShixianMarker:function () {
                var obj = [
                    {
                        name:"双柏县",
                        lnglat:[101.60791908430889, 24.523656119933364]
                    },
                    {
                        name:"楚雄市",
                        lnglat:[101.33326088117707, 24.84808028424851]
                    },
                    {
                        name:"南华县",
                        lnglat:[100.99817787338026, 25.171656001580573]
                    },
                    {
                        name:"禄丰县",
                        lnglat:[102.02539955307441, 25.161712556422174]
                    },
                    {
                        name:"牟定县",
                        lnglat:[101.59143959212167, 25.38524354730363]
                    },
                    {
                        name:"姚安县",
                        lnglat:[101.16297279525287, 25.479499433763706]
                    },
                    {
                        name:"大姚县",
                        lnglat:[101.18494545149179, 25.905205039023556]
                    },
                    {
                        name:"元谋县",
                        lnglat:[101.8001798265044, 25.77171727974708]
                    }
                    ,
                    {
                        name:"武定县",
                        lnglat:[102.16822181867576, 25.722239191447414]
                    },
                    {
                        name:"永仁县",
                        lnglat:[101.5474942796115, 26.10268718653235]
                    }
                ]
                this.markerData.ShixianMarkerData=obj;
                this.setShixianMarkerPoint();
            },
            //添加到县市扎点
            setShixianMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.ShixianMarkerData){
                    let data = this.markerData.ShixianMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:ShixianMarker
                    }
                    this.marker.ShixianMarker.push(this.makeVueMarker(option));
                }
                this.addShixianMarker()
            },
            //创建市县扎点
            addShixianMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ShixianMarker,map)
            },
            //得到网格长marker
            getWanggezhangMarker2:function () {
                var obj = [
                    {
                        id:"Wanggezhang1",
                        lnglat:[101.64791908430889, 24.523656119933364]
                    },
                    {
                        id:"Wanggezhang2",
                        lnglat:[101.36326088117707, 24.84808028424851]
                    },
                    {
                        id:"Wanggezhang3",
                        lnglat:[100.99817787338026, 25.171656001580573]
                    },
                    {
                        id:"Wanggezhang4",
                        lnglat:[102.06539955307441, 25.161712556422174]
                    },
                    {
                        id:"Wanggezhang5",
                        lnglat:[101.50143959212167, 25.38524354730363]
                    },
                    {
                        id:"Wanggezhang6",
                        lnglat:[101.11297279525287, 25.479499433763706]
                    },
                    {
                        id:"Wanggezhang7",
                        lnglat:[101.10494545149179, 25.905205039023556]
                    }
                ]
                this.markerData.WanggezhangMarkerData=obj;
                this.setWanggezhangMarkerPoint2();
            },
            //添加到网格长扎点
            setWanggezhangMarkerPoint2(){
                let path = this.$route.path;
                for(let i in this.markerData.WanggezhangMarkerData){
                    let data = this.markerData.WanggezhangMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:WanggezhangMarker2
                    }
                    this.marker.WanggezhangMarker.push(this.makeVueMarker(option));
                }
                this.addWanggezhangMarker2()
            },
            //创建网格长扎点
            addWanggezhangMarker2(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.WanggezhangMarker,map)
            },


            //得到专职网格员marker
            getZhuanzhiwanggeyuanMarker2:function () {
                var obj = [
                    {
                        id:"Zhuanzhiwanggeyuan1",
                        lnglat:[101.60791908430889, 24.593656119933364]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan2",
                        lnglat:[100.86817787338026, 25.171656001580573]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.53143959212167, 25.30524354730363]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.16494545149179, 25.925205039023556]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.26087323505408,24.937052841697437]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.31941188555629,24.5505111279394]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.0672947761592,24.813771759703613]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.76260334707916,24.923485147822092]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.86963703410214,25.524428135531267]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.84924411875414,24.415713792361004]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.28521155629312,25.486559542300625]
                    },
                    {
                        id:"Zhuanzhiwanggeyuan3",
                        lnglat:[101.54582925858557,25.139355116155983]
                    }
                ]
                this.markerData.ZhuanzhiwanggeyuanMarkerData=obj;
                this.setZhuanzhiwanggeyuanMarkerPoint2();
            },
            //添加到专职网格员扎点
            setZhuanzhiwanggeyuanMarkerPoint2(){
                let path = this.$route.path;
                for(let i in this.markerData.ZhuanzhiwanggeyuanMarkerData){
                    let data = this.markerData.ZhuanzhiwanggeyuanMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:ZhuanzhiwanggeyuanMarker2
                    }
                    this.marker.ZhuanzhiwanggeyuanMarker.push(this.makeVueMarker(option));
                }
                this.addZhuanzhiwanggeyuanMarker2()
            },
            //创建专职网格员扎点
            addZhuanzhiwanggeyuanMarker2(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ZhuanzhiwanggeyuanMarker,map)
            },

            //得到专业网格员marker
            getZhuanyewanggeyuanMarker2:function () {
                var obj = [
                    {
                        id:"Zhuanyewanggeyuan1",
                        lnglat:[101.10791908430889, 24.493656119933364]
                    },
                    {
                        id:"Zhuanyewanggeyuan2",
                        lnglat:[101.99817787338026, 25.201656001580573]
                    },
                    {
                        id:"Zhuanyewanggeyuan3",
                        lnglat:[101.63143959212167, 25.40524354730363]
                    },
                    {
                        id:"Zhuanyewanggeyuan4",
                        lnglat:[101.26494545149179, 25.825205039023556]
                    },
                    {
                        id:"Zhuanyewanggeyuan4",
                        lnglat:[101.41306398396557,24.95535891174505]
                    },
                ]
                this.markerData.ZhuanyewanggeyuanMarkerData=obj;
                this.setZhuanyewanggeyuanMarkerPoint2();
            },
            //添加到专业网格员扎点
            setZhuanyewanggeyuanMarkerPoint2(){
                let path = this.$route.path;
                for(let i in this.markerData.ZhuanyewanggeyuanMarkerData){
                    let data = this.markerData.ZhuanyewanggeyuanMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:ZhuanyewanggeyuanMarker2
                    }
                    this.marker.ZhuanyewanggeyuanMarker.push(this.makeVueMarker(option));
                }
                this.addZhuanyewanggeyuanMarker2()
            },
            //创建专业网格员扎点
            addZhuanyewanggeyuanMarker2(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ZhuanyewanggeyuanMarker,map)
            },

            //得到党员marker
            getDangyuanMarker2:function () {
                var obj = [
                    {
                        id:"Dangyuan1",
                        lnglat:[101.66791908430889, 25.593656119933364]
                    }
                ]
                this.markerData.DangyuanMarkerData=obj;
                this.setDangyuanMarkerPoint2();
            },
            //添加到党员扎点
            setDangyuanMarkerPoint2(){
                let path = this.$route.path;
                for(let i in this.markerData.DangyuanMarkerData){
                    let data = this.markerData.DangyuanMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:DangyuanMarker2
                    }
                    this.marker.DangyuanMarker.push(this.makeVueMarker(option));
                }
                this.addDangyuanMarker2()
            },
            //创建党员扎点
            addDangyuanMarker2(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.DangyuanMarker,map)
            },

            //////////////////////////////////////////////
            //三级
            //得到乡镇marker
            getXiangzhenMarker:function () {
                var obj = []
                var arr2 =  ["鹿城镇","东瓜镇","三街镇","八角镇","西舍街镇","中山镇","大过口乡","新村镇","子午镇","吕合镇","紫溪镇","东华镇","苍岭镇","人和镇","永仁镇"]
                var j=0;
                var zxzbData = this.zxzbData;
                for (let i = 0; i < zxzbData.length; i++) {
                    var obj2={};
                    if(j>arr2.length-1){
                        j=0
                    }
                    obj2.name = arr2[j];
                    j++;
                    obj2.lnglat = zxzbData[i]
                    obj.push(obj2)
                }
                this.markerData.XiangzhenMarkerData=obj;
                this.setXiangzhenMarkerPoint();
            },
            //添加到乡镇扎点
            setXiangzhenMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.XiangzhenMarkerData){
                    let data = this.markerData.XiangzhenMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:XiangzhenMarker
                    }
                    this.marker.XiangzhenMarker.push(this.makeVueMarker(option));
                }
                this.addXiangzhenMarker()
            },
            //创建乡镇扎点
            addXiangzhenMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.XiangzhenMarker,map)
            },

            //四级**************************************************************
            grid4: function () {
                if(this.map.getLayer('myline2_0')){
                    this.map.removeLayer('myline2_0')
                    this.map.removeSource('myline2_0')
                }
                this.fly3();
                this.line4();
                this.sijiflag=true;
                var grid4Data = grid4;
                var grid4Features = []
                for (let i = 0; i < grid4Data.length; i++) {
                    var grid = grid4Data[i].points;
                    var obj = {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [grid]
                        }
                    }
                    grid4Features.push(obj)

                    //再画边界
                    if(!this.map.getLayer("DGZLine"+i)){
                        this.map.addSource("DGZLine"+i, {       /* addSource()函数添加资源,资源ID是route */
                            "type": "geojson",
                            "data": {                  /* GeoJSON格式数据 */
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "type": "LineString",
                                    "coordinates": grid
                                }
                            }
                        });

                        this.map.addLayer({                 /* 为地图添加layer */
                            "id": "DGZLine"+i,             /* layer id是route */
                            "type": "line",            /* line类型layer*/
                            "source": "DGZLine"+i,         /* 资源引用的是上面定义的source*/
                            "layout": {
                                "line-join": "round",  /* 线条相交的形状 */
                                "line-cap": "round"    /* 线条末端形状 */
                            },
                            "paint": {
                                "line-color": "rgba(92, 187, 255, 1)",  /* 线条颜色 */
                                "line-width": 1        /* 线条宽度 */
                            }
                        });
                    }

                }

                this.map.addLayer({
                    id: 'grid4',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid4Features
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(42,136,181,0.3)'
                    }
                })

                this.map.on('click', 'grid4', this.grid4Click)

                this.map.on('mousemove', 'grid4',this.grid4Move)

                this.map.on('mouseleave', 'grid4', this.grid4MouseLeave)

                this.getSijiMarker();
                //this.getSijiWGZMarker();
                this.getSijiZZWGYMarker();
                this.getSijiZYWGYMarker();
                //this.getSijiDYMarker();
            },
            grid4Click:function(e){
                //console.log(e.lngLat)
                if(this.num==1){
                    //console.log(grid4)
                    var data4 = grid4;
                    var flag = 0;
                    for (let j = 0; j < data4.length; j++) {
                        var result = this.isptinpoly(e.lngLat, data4[j].points);
                        if(result==true){
                            flag++
                            if(this.sijiClickList==data4[j].points){
                                break;
                            }else {
                                if(flag==1){
                                    //console.log(grid4[j].id)
                                    var id = grid4[j].id;
                                    for (let i = 0; i < XiangQing.length; i++) {
                                        if(XiangQing[i].id==id){//找到对应的数据
                                            //console.log(XiangQing[i])
                                            var num=0;
                                            if(XiangQing[i].level_num=="1"){
                                                num = "一级"
                                            }else if(XiangQing[i].level_num=="2"){
                                                num = "二级"
                                            }else if(XiangQing[i].level_num=="3"){
                                                num = "三级"
                                            }else if(XiangQing[i].level_num=="4"){
                                                num = "四级"
                                            }else if(XiangQing[i].level_num=="5"){
                                                num = "五级"
                                            }else if(XiangQing[i].level_num=="6"){
                                                num = "六级"
                                            }
                                            var dzzNum=0;
                                            var dyNum=0;
                                            if(data4[j].NAME=="彝人古镇社区党总支"){
                                                dzzNum=15;
                                                dyNum=266;
                                            }else if(data4[j].NAME=="览经社区党总支"){
                                                dzzNum=5;
                                                dyNum=61;
                                            }else if(data4[j].NAME=="车坪社区党总支"){
                                                dzzNum=8;
                                                dyNum=152;
                                            }else if(data4[j].NAME=="东瓜社区党总支"){
                                                dzzNum=12;
                                                dyNum=181;
                                            }else if(data4[j].NAME=="邓官村党总支"){
                                                dzzNum=5;
                                                dyNum=49;
                                            }else if(data4[j].NAME=="永安社区党总支"){
                                                dzzNum=5;
                                                dyNum=49;
                                            }else if(data4[j].NAME=="龙河村党总支"){
                                                dzzNum=4;
                                                dyNum=117;
                                            }else if(data4[j].NAME=="刘家社区党总支"){
                                                dzzNum=5;
                                                dyNum=90;
                                            }else if(data4[j].NAME=="永兴社区党总支"){
                                                dzzNum=4;
                                                dyNum=87;
                                            }else if(data4[j].NAME=="兴隆村党总支"){
                                                dzzNum=6;
                                                dyNum=118;
                                            }else if(data4[j].NAME=="本东村党总支"){
                                                dzzNum=6;
                                                dyNum=118;
                                            }else if(data4[j].NAME=="詹家社区党总支"){
                                                dzzNum=10;
                                                dyNum=119;
                                            }else if(data4[j].NAME=="庄甸社区党总支"){
                                                dzzNum=6;
                                                dyNum=106;
                                            }else if(data4[j].NAME=="桃园社区党总支\n"){
                                                dzzNum=8;
                                                dyNum=127;
                                            }
                                            var obj=[
                                                [
                                                    {name:"地名",value:data4[j].NAME},
                                                    {name:"num",value:num},
                                                    [{name:"区域面积",value:"24平方公里"},
                                                        {name:"村小组",value:XiangQing[i].l5_num+"个"}],
                                                    [{name:"基础网格",value:XiangQing[i].l6_num+"个"}],
                                                ],
                                                [
                                                    [
                                                        {name:"网格长",value:XiangQing[i].leader_name},
                                                        {name:"党组织",value:dzzNum}
                                                    ],
                                                    [
                                                        {name:"党员",value:dyNum},
                                                        {name:"专职网格员",value:XiangQing[i].full_time_grid_user_num},

                                                    ],
                                                    [
                                                        {name:"专业网格员",value:XiangQing[i].professional_grid_user_num},
                                                        {name:"党员上报",value:"1"},

                                                    ],
                                                    [
                                                        {name:"群众上报",value:"1"},
                                                        {name:"巡查发现",value:"1"},

                                                    ],
                                                    [
                                                        {name:"其他渠道",value:"0"}
                                                    ]
                                                ],
                                                [
                                                    [{name:"户籍人口",value:"2630人"},
                                                        {name:"特殊人口",value:"0人"}],
                                                    [{name:"低保",value:"1人"},
                                                        {name:"五保",value:"4人"}],
                                                    [{name:"建档立卡贫困户",value:"0人"},
                                                        {name:"上访人员",value:"0人"}],
                                                    [{name:"企业",value:"0家"}]
                                                ],
                                                [
                                                    {name:"综合指数",value:"97.9"},
                                                    {name:"服务指数",value:"96"},
                                                    {name:"活力指数",value:"98"},
                                                    {name:"和谐指数",value:"97"},
                                                    {name:"绩效指数",value:"97.2"},
                                                    {name:"平安指数",value:"95.1"}
                                                ],
                                            ]
                                            this.BoxNum=obj;
                                        }
                                    }
                                    this.sijiClickList=data4[j].points
                                }
                                break;
                            }

                        }
                    }
                }
                //上面是把数据得到
                this.xstanchaungshow = true;//弹窗显示出来
            },
            grid4Move:function(e){//鼠标移动到4级网格，定义外面是因为方便事件解绑
                if(this.num==1){
                    var data4 = grid4;
                    //console.log(data4)
                    var flag = 0;
                    for (let j = 0; j < data4.length; j++) {
                        var result = this.isptinpoly(e.lngLat, data4[j].points);
                        if(result==true){
                            flag++
                            if(this.sijiMoveList==data4[j].points){
                                //console.log(66)
                                break;
                            }else {
                                //console.log(777)
                                if(this.map.getLayer("SijiMoveLayer")){
                                    this.map.removeLayer("SijiMoveLayer")
                                    this.map.removeSource("SijiMoveLayer")
                                }
                                var grid4Child=[]
                                var obj2 = {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Polygon',
                                        coordinates: [data4[j].points]
                                    }
                                }
                                grid4Child.push(obj2)
                                if(flag==1){
                                    //console.log(1)
                                    this.map.addLayer({
                                        id: 'SijiMoveLayer',
                                        type: 'fill',
                                        source: {
                                            type: 'geojson',
                                            data: {
                                                type: 'FeatureCollection',
                                                features: grid4Child
                                            }
                                        },
                                        paint: {
                                            'fill-color': 'RGBA(92, 187, 255, 0.5)'
                                        }
                                    })

                                    this.sijiMoveList=data4[j].points
                                    this.line5(grid4Child)
                                }
                                break;
                            }

                        }
                    }
                }
            },
            grid4MouseLeave:function(){
                this.sijiMoveList=""
                if(this.map.getLayer('SijiMoveLayer')){
                    this.map.removeLayer("SijiMoveLayer")
                    this.map.removeSource("SijiMoveLayer")
                }

                if(this.map.getLayer('moveLine')){
                    this.map.removeLayer("moveLine")
                    this.map.removeSource("moveLine")
                }
            },
            line4:function(){
                if(this.map.getLayer("myline4")){
                    return ;
                }
                this.map.addSource("myline4", {       /* addSource()函数添加资源,资源ID是route */
                    "type": "geojson",
                    "data": {                  /* GeoJSON格式数据 */
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": DongGuaZhenGrid
                        }
                    }
                });

                this.map.addLayer({                 /* 为地图添加layer */
                    "id": "myline4",             /* layer id是route */
                    "type": "line",            /* line类型layer*/
                    "source": "myline4",         /* 资源引用的是上面定义的source*/
                    "layout": {
                        "line-join": "round",  /* 线条相交的形状 */
                        "line-cap": "round"    /* 线条末端形状 */
                    },
                    "paint": {
                        "line-color": "rgba(255,255,255,1)",  /* 线条颜色 */
                        "line-width": 5        /* 线条宽度 */
                    }
                });
            },//东瓜镇的边框
            line5:function(data){
                if(this.map.getLayer("moveLine")){
                    this.map.removeLayer("moveLine")
                    this.map.removeSource("moveLine")
                }
                this.map.addSource("moveLine", {       /* addSource()函数添加资源,资源ID是route */
                    "type": "geojson",
                    "data": {                  /* GeoJSON格式数据 */
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates":data[0]
                        }
                    }
                });

                this.map.addLayer({                 /* 为地图添加layer */
                    "id": "moveLine",             /* layer id是route */
                    "type": "line",            /* line类型layer*/
                    "source": "moveLine",         /* 资源引用的是上面定义的source*/
                    "layout": {
                        "line-join": "round",  /* 线条相交的形状 */
                        "line-cap": "round"    /* 线条末端形状 */
                    },
                    "paint": {
                        "line-color": "rgba(0,0,0,1)",  /* 线条颜色 */
                        "line-width": 2        /* 线条宽度 */
                    }
                });
            },//鼠标移时4级子网格的边框
            //得到指定乡镇的marker
            getSijiMarker:function () {
                var arr = [];
                for (let i = 0; i < grid4.length; i++) {
                    var obj = {};
                    obj.name = grid4[i].NAME;
                    var point = this.calcCenterCrd(grid4[i].points);
                    obj.lnglat = point;
                    arr.push(obj)
                }
                // var obj = [
                //     {   name:"xx镇",
                //         lnglat:[101.54139976386665,25.11028747802804],
                //     }
                // ]

                this.markerData.SijiMarkerData=arr;

                this.setSijiMarkerPoint();
            },
            //添加到乡镇扎点
            setSijiMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.SijiMarkerData){
                    let data = this.markerData.SijiMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:SijiMarker
                    }
                    this.marker.SijiMarker.push(this.makeVueMarker(option));
                }
                this.addSijiMarker()
            },
            //创建乡镇扎点
            addSijiMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.SijiMarker,map)
            },

            //得到指定乡镇的网格长marker
            getSijiWGZMarker:function () {
                var obj = [
                    {
                        name:"WGZ3",
                        lnglat:[101.53620170762218,25.132728980735294],
                    },
                    {
                        name:"WGZ4",
                        lnglat:[101.48389900770383,25.127644740975185],
                    },
                    {   name:"WGZ5",
                        lnglat:[101.52997228968934,25.045058177747123],
                    },
                    {
                        name:"WGZ6",
                        lnglat:[101.53342912208626,25.06166294411318],
                    },
                    {
                        name:"WGZ7",
                        lnglat:[101.51020303196555,25.06610622618979],
                    },
                    {
                        name:"WGZ8",
                        lnglat:[101.5296493471426,25.056193861700052],
                    }
                ]

                this.markerData.SijiWGZMarkerData=obj;

                this.setSijiWGZMarkerPoint();
            },
            //添加到乡镇的网格长扎点
            setSijiWGZMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.SijiWGZMarkerData){
                    let data = this.markerData.SijiWGZMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:SijiWGZMarker
                    }
                    this.marker.SijiWGZMarker.push(this.makeVueMarker(option));
                }
                this.addSijiWGZMarker()
            },
            //创建乡镇的网格长扎点
            addSijiWGZMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.SijiWGZMarker,map)
            },

            //得到指定乡镇的专职网格员marker
            getSijiZZWGYMarker:function () {
                var obj = [
                    {   name:"ZZWGY1",
                        lnglat:[101.52865540839457,25.053396373581904],
                    },
                    {
                        name:"ZZWGY2",
                        lnglat:[101.58110618673874,25.0679080350521],
                    },
                    {   name:"ZZWGY3",
                        lnglat:[101.52979504015144,25.04533152957417],
                    },
                    {   name:"ZZWGY5",
                        lnglat:[101.51504044974342,25.09577139831009],
                    },
                    {
                        name:"ZZWGY6",
                        lnglat:[101.61301271650035,25.04524858743919],
                    }
                ]

                this.markerData.SijiZZWGYMarkerData=obj;

                this.setSijiZZWGYMarkerPoint();
            },
            //添加到乡镇的专职网格员扎点
            setSijiZZWGYMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.SijiZZWGYMarkerData){
                    let data = this.markerData.SijiZZWGYMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:SijiZZWGYMarker
                    }
                    this.marker.SijiZZWGYMarker.push(this.makeVueMarker(option));
                }
                this.addSijiZZWGYMarker()
            },
            //创建乡镇的专职网格员扎点
            addSijiZZWGYMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.SijiZZWGYMarker,map)
            },

            //得到指定乡镇的专业网格员marker
            getSijiZYWGYMarker:function () {
                var obj = [
                    {   name:"SijiZYWGY1",
                        lnglat:[101.56465885895108,25.064651710788013],
                    },
                    {
                        name:"SijiZYWGY2",
                        lnglat:[101.55477768137922,25.14718951889087],
                    },
                    {   name:"SijiZYWGY3",
                        lnglat:[101.48217571888597,25.125696612357913],
                    },
                    {
                        name:"SijiZYWGY4",
                        lnglat:[101.50702602464514,25.064190558444054],
                    },

                    {
                        name:"SijiZYWGY6",
                        lnglat:[101.48381121004286,25.195134626070868],
                    }
                ]

                this.markerData.SijiZYWGYMarkerData=obj;

                this.setSijiZYWGYMarkerPoint();
            },
            //添加到乡镇的专业网格员扎点
            setSijiZYWGYMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.SijiZYWGYMarkerData){
                    let data = this.markerData.SijiZYWGYMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:SijiZYWGYMarker
                    }
                    this.marker.SijiZYWGYMarker.push(this.makeVueMarker(option));
                }
                this.addSijiZYWGYMarker()
            },
            //创建乡镇的专业网格员扎点
            addSijiZYWGYMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.SijiZYWGYMarker,map)
            },

            //得到指定乡镇的党员marker
            getSijiDYMarker:function () {
                var obj = [
                    {   name:"SijiDY1",
                        lnglat:[101.53056966977022,25.059672254573684],
                    },
                    {   name:"SijiDY2",
                        lnglat:[101.52009792364586,25.094690470973475],
                    },
                    {   name:"SijiDY3",
                        lnglat:[101.52699699797256,25.144912695613257],
                    }
                ]

                this.markerData.SijiDYMarkerData=obj;

                this.setSijiDYMarkerPoint();
            },
            //添加到乡镇的党员扎点
            setSijiDYMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.SijiDYMarkerData){
                    let data = this.markerData.SijiDYMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:SijiDYMarker
                    }
                    this.marker.SijiDYMarker.push(this.makeVueMarker(option));
                }
                this.addSijiDYMarker()
            },
            //创建乡镇的党员扎点
            addSijiDYMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.SijiDYMarker,map)
            },


            //五级************************************************************************************
            grid5: function () {
                var grid5Data = grid5;
                var grid5Features = []
                for (let i = 0; i < grid5Data.length; i++) {
                    var grid = grid5Data[i].points;
                    var obj = {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [grid]
                        }
                    }
                    grid5Features.push(obj)
                }

                this.map.addLayer({
                    id: 'grid5',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid5Features
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(42,136,181,0.4)'
                    }
                })

                this.map.on('click', 'grid5',this.grid5Click)

                this.map.on('mousemove', 'grid5',this.grid5Move)

                this.map.on('mouseleave', 'grid5', this.grid5MouseLeave)

                // this.getSijiMarker();
                // this.getSijiWGZMarker();
                // this.getSijiZZWGYMarker();
                // this.getSijiZYWGYMarker();
                // this.getSijiDYMarker();
            },
            grid5Click:function(e){
                if(this.num==2){
                    //console.log(grid4)
                    var data4 = grid4;
                    var flag = 0;
                    for (let j = 0; j < data4.length; j++) {
                        var result = this.isptinpoly(e.lngLat, data4[j].points);
                        if(result==true){
                            flag++
                            if(this.sijiClickList==data4[j].points){
                                break;
                            }else {
                                if(flag==1){
                                    //console.log(grid4[j].id)
                                    var id = grid4[j].id;
                                    for (let i = 0; i < XiangQing.length; i++) {
                                        if(XiangQing[i].id==id){//找到对应的数据
                                            //console.log(XiangQing[i])

                                            /* var obj=[
                                            //     [
                                            //         {name:"地名",value:"沙邑一组"},
                                            //         {name:"num",value:"五级"},
                                            //         [{name:"区域面积",value:"9平方公里"},
                                            //             {name:"基础网格",value:"2个"}],
                                            //     ],
                                            //     [
                                            //         [{name:"网格长",value:"何志"},
                                            //             {name:"党员",value:"6人"}],
                                            //         [{name:"专职网格员",value:"1人"},
                                            //             {name:"专业网格员",value:"2人"}],
                                            //         [{name:"党员上报",value:"1"},
                                            //             {name:"群众上报",value:"1"}],
                                            //         [{name:"巡查发现",value:"1"},
                                            //             {name:"其他渠道",value:"0"}],
                                            //     ],
                                            //     [
                                            //         [{name:"户籍人口",value:"142人"},
                                            //             {name:"特殊人口",value:"0人"}],
                                            //         [{name:"低保",value:"0人"},
                                            //             {name:"五保",value:"1人"}],
                                            //         [{name:"建档立卡贫困户",value:"0人"},
                                            //             {name:"上访人员",value:"0人"}],
                                            //         [{name:"企业",value:"0家"}]
                                            //     ],
                                            //     [
                                            //         {name:"综合指数",value:"97.9"},
                                            //         {name:"服务指数",value:"96"},
                                            //         {name:"活力指数",value:"98"},
                                            //         {name:"和谐指数",value:"97"},
                                            //         {name:"绩效指数",value:"97.2"},
                                            //         {name:"平安指数",value:"95.1"}
                                            //     ],
                                            ] */

                                            var num=0;
                                            if(XiangQing[i].level_num=="1"){
                                                num = "一级"
                                            }else if(XiangQing[i].level_num=="2"){
                                                num = "二级"
                                            }else if(XiangQing[i].level_num=="3"){
                                                num = "三级"
                                            }else if(XiangQing[i].level_num=="4"){
                                                num = "四级"
                                            }else if(XiangQing[i].level_num=="5"){
                                                num = "五级"
                                            }else if(XiangQing[i].level_num=="6"){
                                                num = "六级"
                                            }

                                            var dyNum=0;
                                            if(data4[j].NAME=="彝人古镇社区党支部"){
                                                dyNum=21;
                                            }else if(data4[j].NAME=="彝人古镇社区党支部"){
                                                dyNum=21;
                                            }else if(data4[j].NAME=="彝人古镇社区党支部"){
                                                dyNum=21;
                                            }else if(data4[j].NAME=="彝人古镇社区流动党员党支部"){
                                                dyNum=98;
                                            }else if(data4[j].NAME=="彝人古镇社区党支部"){
                                                dyNum=21;
                                            }else if(data4[j].NAME=="星宿家园党支部"){
                                                dyNum=101;
                                            }else if(data4[j].NAME=="星宿家园党支部"){
                                                dyNum=101;
                                            }else if(data4[j].NAME=="彝人古镇社区党支部"){
                                                dyNum=21;
                                            }

                                            var obj=[
                                                [
                                                    {name:"地名",value:data4[j].NAME},
                                                    {name:"num",value:num},
                                                    [
                                                        {name:"区域面积",value:"9平方公里"},
                                                        {name:"基础网格",value:XiangQing[i].l6_num+"个"}],
                                                    ],
                                                    [
                                                    [
                                                        {name:"网格长",value:XiangQing[i].leader_name},
                                                        {name:"党员",value:dyNum},
                                                    ],
                                                    [
                                                        {name:"专职网格员",value:XiangQing[i].full_time_grid_user_num},
                                                        {name:"专业网格员",value:XiangQing[i].professional_grid_user_num},
                                                    ],
                                                    [
                                                        {name:"党员上报",value:"1"},
                                                        {name:"群众上报",value:"1"},
                                                    ],
                                                    [
                                                        {name:"巡查发现",value:"1"},
                                                        {name:"其他渠道",value:"0"}
                                                    ],
                                                ],
                                                [
                                                    [{name:"户籍人口",value:"142人"},
                                                        {name:"特殊人口",value:"0人"}],
                                                    [{name:"低保",value:"0人"},
                                                        {name:"五保",value:"1人"}],
                                                    [{name:"建档立卡贫困户",value:"0人"},
                                                        {name:"上访人员",value:"0人"}],
                                                    [{name:"企业",value:"0家"}]
                                                ],
                                                [
                                                    {name:"综合指数",value:"97.9"},
                                                    {name:"服务指数",value:"96"},
                                                    {name:"活力指数",value:"98"},
                                                    {name:"和谐指数",value:"97"},
                                                    {name:"绩效指数",value:"97.2"},
                                                    {name:"平安指数",value:"95.1"}
                                                ],
                                            ]
                                            this.BoxNum=obj;
                                        }
                                    }
                                    this.sijiClickList=data4[j].points
                                }
                                break;
                            }

                        }
                    }
                }
                //上面是把数据得到
                this.xstanchaungshow = true;//弹窗显示出来
            },
            grid5Move:function(e){//鼠标移动到4级网格，定义外面是因为方便事件解绑
                if(this.num==2){
                    var data5 = grid5;
                    //console.log(data5)
                    var flag = 0;
                    for (let j = 0; j < data5.length; j++) {
                        var result = this.isptinpoly(e.lngLat, data5[j].points);
                        if(result==true){
                            //console.log(66)
                            flag++
                            if(this.sijiMoveList==data5[j].points){
                                break;
                            }else {
                                //console.log(777)
                                if(this.map.getLayer("WuJiMoveLayer")){
                                    this.map.removeLayer("WuJiMoveLayer")
                                    this.map.removeSource("WuJiMoveLayer")
                                }
                                var grid5Child=[]
                                var obj2 = {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Polygon',
                                        coordinates: [data5[j].points]
                                    }
                                }
                                grid5Child.push(obj2)
                                if(flag==1){
                                    //console.log(1)
                                    this.map.addLayer({
                                        id: 'WuJiMoveLayer',
                                        type: 'fill',
                                        source: {
                                            type: 'geojson',
                                            data: {
                                                type: 'FeatureCollection',
                                                features: grid5Child
                                            }
                                        },
                                        paint: {
                                            'fill-color': 'rgba(92, 187, 255, 0.5)'
                                        }
                                    })

                                    this.sijiMoveList=data5[j].points
                                    this.line5(grid5Child)
                                }
                                break;
                            }

                        }
                    }
                }
            },
            grid5MouseLeave:function(){
                this.sijiMoveList=""
                if(this.map.getLayer('WuJiMoveLayer')){
                    this.map.removeLayer("WuJiMoveLayer")
                    this.map.removeSource("WuJiMoveLayer")
                }

                if(this.map.getLayer('moveLine')){
                    this.map.removeLayer("moveLine")
                    this.map.removeSource("moveLine")
                }
            },
            //  得到村marker
            getCunMarker:function () {
                var arr = [];
                for (let i = 0; i < grid5.length; i++) {
                    var obj = {};
                    var name = grid5[i].NAME;
                    var arr2 = name.split("、");
                    obj.name = arr2[0];
                    var point = this.calcCenterCrd(grid5[i].points);
                    obj.lnglat = point;
                    arr.push(obj)
                }
                // var obj = [
                //     {   name:"xx村",
                //         lnglat:[101.54342445802848,25.092028487448403],
                //     }
                // ]

                this.markerData.CunMarkerData=arr;

                this.setCunMarkerPoint();
            },
            //添加到村扎点
            setCunMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.CunMarkerData){
                    let data = this.markerData.CunMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:CunMarker
                    }
                    this.marker.CunMarker.push(this.makeVueMarker(option));
                }
                this.addCunMarker()
            },
            //创建村扎点
            addCunMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.CunMarker,map)
            },


            //六级*****************************************************************************************
            //得到村marker
            grid6: function () {
                var grid6Data = grid6;
                var grid6Features = []
                for (let i = 0; i < grid6Data.length; i++) {
                    var grid = grid6Data[i].points;
                    var obj = {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [grid]
                        }
                    }
                    grid6Features.push(obj)
                }

                this.map.addLayer({
                    id: 'grid6',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid6Features
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(42,136,181,0.6)'
                    }
                })

                this.map.on('click', 'grid6',this.grid6Click)

                this.map.on('mousemove', 'grid6',this.grid6Move)

                this.map.on('mouseleave', 'grid6', this.grid6MouseLeave)

                // this.getSijiMarker();
                // this.getSijiWGZMarker();
                // this.getSijiZZWGYMarker();
                // this.getSijiZYWGYMarker();
                // this.getSijiDYMarker();
            },

            grid6Click:function(e){
                if(this.num==3){
                    //console.log(grid4)
                    var data4 = grid4;
                    var flag = 0;
                    for (let j = 0; j < data4.length; j++) {
                        var result = this.isptinpoly(e.lngLat, data4[j].points);
                        if(result==true){
                            flag++
                            if(this.sijiClickList==data4[j].points){
                                break;
                            }else {
                                if(flag==1){
                                    //console.log(grid4[j].id)
                                    var id = grid4[j].id;
                                    for (let i = 0; i < XiangQing.length; i++) {
                                        if(XiangQing[i].id==id){//找到对应的数据
                                            //console.log(XiangQing[i])

                                            /* var obj=[
                                            //     [
                                            //         {name:"地名",value:"沙邑一组"},
                                            //         {name:"num",value:"五级"},
                                            //         [{name:"区域面积",value:"9平方公里"},
                                            //             {name:"基础网格",value:"2个"}],
                                            //     ],
                                            //     [
                                            //         [{name:"网格长",value:"何志"},
                                            //             {name:"党员",value:"6人"}],
                                            //         [{name:"专职网格员",value:"1人"},
                                            //             {name:"专业网格员",value:"2人"}],
                                            //         [{name:"党员上报",value:"1"},
                                            //             {name:"群众上报",value:"1"}],
                                            //         [{name:"巡查发现",value:"1"},
                                            //             {name:"其他渠道",value:"0"}],
                                            //     ],
                                            //     [
                                            //         [{name:"户籍人口",value:"142人"},
                                            //             {name:"特殊人口",value:"0人"}],
                                            //         [{name:"低保",value:"0人"},
                                            //             {name:"五保",value:"1人"}],
                                            //         [{name:"建档立卡贫困户",value:"0人"},
                                            //             {name:"上访人员",value:"0人"}],
                                            //         [{name:"企业",value:"0家"}]
                                            //     ],
                                            //     [
                                            //         {name:"综合指数",value:"97.9"},
                                            //         {name:"服务指数",value:"96"},
                                            //         {name:"活力指数",value:"98"},
                                            //         {name:"和谐指数",value:"97"},
                                            //         {name:"绩效指数",value:"97.2"},
                                            //         {name:"平安指数",value:"95.1"}
                                            //     ],
                                            ] */

                                            var num=0;
                                            if(XiangQing[i].level_num=="1"){
                                                num = "一级"
                                            }else if(XiangQing[i].level_num=="2"){
                                                num = "二级"
                                            }else if(XiangQing[i].level_num=="3"){
                                                num = "三级"
                                            }else if(XiangQing[i].level_num=="4"){
                                                num = "四级"
                                            }else if(XiangQing[i].level_num=="5"){
                                                num = "五级"
                                            }else if(XiangQing[i].level_num=="6"){
                                                num = "六级"
                                            }

                                            var dyNum=0;
                                            if(data4[j].NAME=="车坪社区党总支第二支部"){
                                                dyNum=29;
                                            }else if(data4[j].NAME=="车坪社区党总支第二支部"){
                                                dyNum=29;
                                            }else if(data4[j].NAME=="车坪社区党总支第三支部"){
                                                dyNum=26;
                                            }else if(data4[j].NAME=="车坪社区党总支第三支部"){
                                                dyNum=27;
                                            }else if(data4[j].NAME=="车坪社区党总支第三支部"){
                                                dyNum=21;
                                            }else if(data4[j].NAME=="车坪社区党总支张邓党小组"){
                                                dyNum=20;
                                            }else if(data4[j].NAME=="车坪社区党总支张邓党小组"){
                                                dyNum=20;
                                            }else if(data4[j].NAME=="车坪社区党总支第一党支部"){
                                                dyNum=53;
                                            }

                                            var obj=[
                                                [
                                                    {name:"地名",value:data4[j].NAME},
                                                    {name:"num",value:num},
                                                    [{name:"区域面积",value:"3.1平方公里"}],
                                                ],
                                                [
                                                    [{name:"网格长",value:XiangQing[i].leader_name},
                                                        {name:"党员",value:dyNum}],
                                                    [{name:"专职网格员",value:XiangQing[i].full_time_grid_user_num},
                                                        {name:"专业网格员",value:XiangQing[i].professional_grid_user_num}],
                                                    [{name:"党员上报",value:"1"},
                                                        {name:"群众上报",value:"1"}],
                                                    [{name:"巡查发现",value:"1"},
                                                        {name:"其他渠道",value:"0"}],
                                                ],
                                                [
                                                    [{name:"户籍人口",value:"59人"},
                                                        {name:"特殊人口",value:"0人"}],
                                                    [{name:"低保",value:"0人"},
                                                        {name:"五保",value:"0人"}],
                                                    [{name:"建档立卡贫困户",value:"0人"},
                                                        {name:"上访人员",value:"0人"}],
                                                    [{name:"企业",value:"0家"}]
                                                ],
                                                [
                                                    {name:"综合指数",value:"97.9"},
                                                    {name:"服务指数",value:"96"},
                                                    {name:"活力指数",value:"98"},
                                                    {name:"和谐指数",value:"97"},
                                                    {name:"绩效指数",value:"97.2"},
                                                    {name:"平安指数",value:"95.1"}
                                                ],
                                            ]
                                            this.BoxNum=obj;
                                        }
                                    }
                                    this.sijiClickList=data4[j].points
                                }
                                break;
                            }

                        }
                    }
                }
                //上面是把数据得到
                this.xstanchaungshow = true;//弹窗显示出来
            },

            grid6Move:function(e){//鼠标移动到6级网格，定义外面是因为方便事件解绑
                if(this.num==3){
                    var data6 = grid6;
                    //console.log(data6)
                    var flag = 0;
                    for (let j = 0; j < data6.length; j++) {
                        var result = this.isptinpoly(e.lngLat, data6[j].points);
                        if(result==true){
                            //console.log(66)
                            flag++
                            if(this.sijiMoveList==data6[j].points){
                                break;
                            }else {
                                //console.log(777)
                                if(this.map.getLayer("LiuJiMoveLayer")){
                                    this.map.removeLayer("LiuJiMoveLayer")
                                    this.map.removeSource("LiuJiMoveLayer")
                                }
                                var grid6Child=[]
                                var obj2 = {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Polygon',
                                        coordinates: [data6[j].points]
                                    }
                                }
                                grid6Child.push(obj2)
                                if(flag==1){
                                    //console.log(1)
                                    this.map.addLayer({
                                        id: 'LiuJiMoveLayer',
                                        type: 'fill',
                                        source: {
                                            type: 'geojson',
                                            data: {
                                                type: 'FeatureCollection',
                                                features: grid6Child
                                            }
                                        },
                                        paint: {
                                            'fill-color': 'RGBA(109, 202, 255, 0.9)'
                                        }
                                    })

                                    this.sijiMoveList=data6[j].points
                                    this.line5(grid6Child)
                                }
                                break;
                            }

                        }
                    }
                }
            },
            grid6MouseLeave:function(){
                this.sijiMoveList=""
                if(this.map.getLayer('LiuJiMoveLayer')){
                    this.map.removeLayer("LiuJiMoveLayer")
                    this.map.removeSource("LiuJiMoveLayer")
                }
            },

            //得到村小组marker
            getCXZMarker:function () {
                var arr = [];
                for (let i = 0; i < grid6.length; i++) {
                    var obj = {};
                    var name = grid6[i].NAME;
                    var arr2 = name.split("、");
                    obj.name = arr2[0];
                    var point = this.calcCenterCrd(grid6[i].points);
                    obj.lnglat = point;
                    arr.push(obj)
                }
                // var obj = [
                //     {   name:"xx村小组",
                //         lnglat:[101.5251755920824,25.064266053517485],
                //     }
                // ]

                this.markerData.CXZMarkerData=arr;

                this.setCXZMarkerPoint();
            },
            //添加到村小组扎点
            setCXZMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.CXZMarkerData){
                    let data = this.markerData.CXZMarkerData[i];
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:CXZMarker
                    }
                    this.marker.CXZMarker.push(this.makeVueMarker(option));
                }
                this.addCXZMarker()
            },
            //创建村小组扎点
            addCXZMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.CXZMarker,map)
            },
        },
        mounted() {
            this.map = this.$store.state.baseMap
            this.fly();
            this.grid1();
            this.line1();
            this.getZhouMarker();

            //一级
            //this.getWanggezhangMarker();//网格长
            this.getZhuanzhiwanggeyuanMarker();//专职网格员
            this.getZhuanyewanggeyuanMarker();//专业网格员
            //this.getDangyuanMarker();//党员

        },
        beforeDestroy() {
            this.right_buttom = 0;
            //调用接口的
            this.removeMarker(this.marker);
            this.$store.commit('ZhuanyuanXQHide')
            var data = true;
            this.$store.commit('ChangeTopStyle',data)
            this.map.off('click',"grid3",this.grid3Click);//解绑grid3图层的点击事件

            this.map.off('mousemove',"grid4",this.grid4Move);//解绑grid4图层的移动事件
            this.map.off('click',"grid4",this.grid4Click);//解绑grid4图层的点击事件
            this.map.off('click',"grid5",this.grid5Click);//解绑grid5图层的点击事件
            this.map.off('click',"grid6",this.grid6Click);//解绑grid6图层的点击事件
            this.map.off('mouseleave',"grid4",this.grid4MouseLeave);//解绑grid4图层的移出事件

            this.map.off('mousemove',"WuJiMoveLayer",this.grid5Move);//解绑grid5图层的移动事件
            this.map.off('mouseleave',"WuJiMoveLayer",this.grid5MouseLeave);//解绑grid5图层的移出事件

            //LiuJiMoveLayer

            this.map.off('mousemove',"LiuJiMoveLayer",this.grid6Move);//解绑grid5图层的移动事件
            this.map.off('mouseleave',"LiuJiMoveLayer",this.grid6MouseLeave);//解绑grid5图层的移出事件

            this.marker.ZhouMarker=[];
            this.marker.ShixianMarker=[];
            this.marker.XiangzhenMarker=[];
            this.marker.WanggezhangMarker=[];
            this.marker.ZhuanzhiwanggeyuanMarker=[];
            this.marker.ZhuanyewanggeyuanMarker=[];
            this.marker.DangyuanMarker=[];
            this.marker.SijiMarker=[];
            this.marker.SijiWGZMarker=[];
            this.marker.SijiZZWGYMarker=[];
            this.marker.CunMarker=[];
            this.marker.CXZMarker=[];

            this.marker.ZhouMarkerData=[];
            this.marker.ShixianMarkerData=[];
            this.marker.XiangzhenMarkerData=[];
            this.marker.WanggezhangMarkerData=[];
            this.marker.ZhuanzhiwanggeyuanMarkerData=[];
            this.marker.ZhuanyewanggeyuanMarkerData=[];
            this.marker.DangyuanMarkerData=[];
            this.marker.SijiMarkerData=[];
            this.marker.SijiWGZMarkerData=[];
            this.marker.SijiZZWGYMarkerData=[];
            this.marker.CunMarkerData=[];
            this.marker.CXZMarkerData=[];


            this.map.removeLayer("grid")
            this.map.removeSource("grid")

            this.map.removeLayer("myline1")
            this.map.removeSource("line1")

            if (this.map.getLayer('grid2')){
                this.map.removeLayer("grid2")
                this.map.removeSource("grid2")
            }

            if (this.map.getLayer('grid3')){
                this.map.removeLayer("grid3")
                this.map.removeSource("grid3")
            }

            if (this.map.getLayer('grid4')){
                this.map.removeLayer("grid4")
                this.map.removeSource("grid4")
            }

            if (this.map.getLayer('grid5')){
                this.map.removeLayer("grid5")
                this.map.removeSource("grid5")
            }

            if (this.map.getLayer('grid6')){
                this.map.removeLayer("grid6")
                this.map.removeSource("grid6")
            }

            if(this.map.getLayer('SijiMoveLayer')){
                this.map.removeLayer("SijiMoveLayer")
                this.map.removeSource("SijiMoveLayer")
            }

            if(this.map.getLayer('moveLine')){
                this.map.removeLayer("moveLine")
                this.map.removeSource("moveLine")
            }

            if(this.map.getLayer('myline4')){
                this.map.removeLayer("myline4")
                this.map.removeSource("myline4")
            }

            for (let i = 0; i < grid4.length; i++) {
                if(this.map.getLayer('DGZLine'+i)){
                    this.map.removeLayer("DGZLine"+i)
                    this.map.removeSource("DGZLine"+i)
                }
            }

            if(this.map.getLayer('WuJiMoveLayer')){
                this.map.removeLayer("WuJiMoveLayer")
                this.map.removeSource("WuJiMoveLayer")
            }

            if(this.map.getLayer('LiuJiMoveLayer')){
                this.map.removeLayer("LiuJiMoveLayer")
                this.map.removeSource("LiuJiMoveLayer")
            }

            if(this.map.getLayer('myline2_0')){
                this.map.removeLayer('myline2_0')
                this.map.removeSource('myline2_0')
            }

            if(this.map.getLayer('myline3_0')){
                this.map.removeLayer('myline3_0')
                this.map.removeSource('myline3_0')
            }
        }
    }
</script>

<style scoped>
    .zhishiqiBGC {
        background-color: RGBA(7, 10, 13, 1) !important;
    }
    .jiao1_2 {
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .jiao1_1 {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
        width: 0px;
        height: 0px;
    }

    .jiao1_1 span:nth-child(1) {
        position: absolute;
        top: -26px;
        left: -6px;
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: rgba(255,255,255,0.7);
    }
    /**/
    .jiao1_1 span:nth-child(2) {
        position: absolute;
        top: -26px;
        left: 240px;
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: rgba(255,255,255,0.7);
    }

    .jiao1_1 span:nth-child(3) {
        position: absolute;
        top: 59.5px;
        left: -6px;
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: rgba(255,255,255,0.7);
    }

    .jiao1_1 span:nth-child(4) {
        position: absolute;
        top: 59.5px;
        left: 240px;
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: rgba(255,255,255,0.7);
    }


    .closeZhuanYuanMSG {
        position: absolute;
        top: 0px;
        right: 0px;
        display: inline-block;
        height: 80px;
        width:80px;
        line-height: 80px;
        text-align: center;
        font-size: 38px;
        cursor: pointer;
    }

    .MSGtitleBox {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
        height: 80px;
        width: 100%;
        line-height: 80px;
        text-align: center;
    }

    .MSGtitle {
        font-size: 28px;
        font-weight: bold;
    }

    .job {
        position: relative;
        top: -2px;
        left: 0px;
        line-height: 38px;
        display: inline-block;
        width: 140px;
        height: 36px;
        margin-left: 10px;
        font-size: 24px;
        /*padding: 5px;*/
        background-image: url("../../public/images/bg_Popup_Title@2x.png");
        background-repeat: no-repeat;
        background-size: 140px 36px;
        /*background-position: 0 22px;*/
        /*background-color: rgba(163, 235, 254, 0.4);*/
        /*border: 1px dashed rgba(255,255,255,0.5);*/
    }

    .ZhuanyuanMsg {
        position: absolute;
        z-index: 99;
        display: inline-block;
        width: 600px;
        height: 475px;
        border: 1px solid RGBA(45, 118, 122, 1);
        background-color: RGBA(27, 40, 55, 1);
    }

    .ZhuanyuanMsgContent {
        padding-top: 20px;
        display: flex;
        border-top: 1px solid rgba(163, 235, 254, 0.5);
    }

    .ZhuanyuanMsgLeft {
        flex: 2;
        font-size: 24px;
    }

    .ZhuanyuanMsgRight {
        flex: 3;
        font-size: 24px;
    }

    .ZhuanyuanMsgLeft div,.ZhuanyuanMsgRight div {
        line-height: 50px;
    }

    .ZhuanyuanMsgLeft {
        text-align: right;
        color: rgba(255,255,255,0.6);
    }

    .ZhuanyuanMsgRight {
        text-align: left;
        color: rgba(255,255,255,1);
    }

    .wange-ge-jian-she {
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .left {
        position: absolute;
        top: 292px;
        left: 53px;
        z-index: 5;
    }

    .right {
        position: absolute;
        top: 132px;
        right: -3760px;
        z-index: 5;
        display: inline-block;
        width: 857px;
        height: 859px;
        border: 1px dashed rgba(255, 255, 255, 0.5);
        background-image: url("../../public/images/bg_wgjs_Right_1@2x.png");
        background-size: 857px 859px;
        background-repeat: no-repeat;
    }

    .zheZhao {
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 4;
        height: 1023px;
        width: 400px;
        background: linear-gradient(to right, #242930, rgba(24, 35, 47, 0)); /*渐变从左上角到右下角*/
        background: -ms-linear-gradient(to right, #242930, rgba(24, 35, 47, 0));
        background: -webkit-linear-gradient(to right, #242930, rgba(24, 35, 47, 0));
        background: -moz-linear-gradient(to right, #242930, rgba(24, 35, 47, 0));
    }

    .zheZhao2 {
        left: 2840px;
        top: 0px;
        height: 1023px;
        width: 1000px;
        background: linear-gradient(to left, #242930, rgba(24, 35, 47, 0)); /*渐变从左上角到右下角*/
        background: -ms-linear-gradient(to left, #242930, rgba(24, 35, 47, 0));
        background: -webkit-linear-gradient(to left, #242930, rgba(24, 35, 47, 0));
        background: -moz-linear-gradient(to left, #242930, rgba(24, 35, 47, 0));
    }

    .xs {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 99;
        display: inline-block;
        width: 3840px;
        height: 1023px;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .sijiflag {
        top: 888px !important;
        left: 2270px !important;
    }

    .sanji-right {
        position: absolute;
        top: 192px;
        left: 2333px;
        width: 1463px;
        height: 789px;
        /*border: 1px solid black;*/
    }

    .zhezhao3 {
        position: absolute;
        top: -192px;
        left: -200px;
        z-index: 6;
        display: inline-block;
        width: 1704px;
        height: 1023px;
        /*border: 1px solid black;*/
        background: linear-gradient(to left, #242930, #242930, #242930, #242930, rgba(24, 35, 47, 0));
        background: -ms-linear-gradient(to left, #242930, #242930, #242930, #242930, rgba(24, 35, 47, 0));
        background: -webkit-linear-gradient(to left, #242930, #242930, #242930, #242930, rgba(24, 35, 47, 0));
        background: -moz-linear-gradient(to left, #242930, #242930, #242930, #242930, rgba(24, 35, 47, 0));
    }

    .sanjiTanchuang {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 8;
        width: 3840px;
        height: 1023px;
        background-color: rgba(0,0,0,0.5);
    }

    .zhishiqi {
        position: absolute;
        /*top: 820px;*/
        top: 900px;
        left: 2640px;
        z-index: 16;
        display: inline-block;
        width: 240px;
        background-color: rgba(0,0,0,0.2);
        padding: 10px;
        font-size: 18px;
    }

    .zhishiqi li {
        position: relative;
        top: 0px;
        left: 0px;
        list-style: none;
        display: flex;
        font-size: 18px;
    }

    .zhishiqi li:nth-child(2) {
        margin-top: 5px;
    }

    .kuang {
        position: absolute;
        top: 2px;
        left: 2px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #2ACEFF;
    }

    .zhishiqi li .gou {
        position: absolute;
        top: 5px;
        left: 5px;
        display: inline-block;
        width: 14px;
        height: 14px;
    }

    .zzwgy,.zywgy {
        position: relative;
        top: 0px;
        left: 40px;
    }

    .zhishiqi li .zhishiqiimg {
        position: absolute;
        top: -2px;
        left: 20px;
        display: inline-block;
        width: 30px;
        height: 30px;
        margin: 0 5px;
    }



    .zhishiqi li span:nth-child(1) {
        flex: 1;
    }

    .zhishiqi li span:nth-child(2) {
        flex: 2;
    }

    .zhishiqi li span:nth-child(3) {
        flex: 9;
    }

    .zhishiqi li img {
        flex: 1;
    }

</style>