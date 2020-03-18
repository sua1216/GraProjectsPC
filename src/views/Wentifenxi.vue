<template>
    <div class="wen-ti-fen-xi">
        <div class="zhezhao1"></div>
        <div class="zhezhao2"></div>
        <div class="left">
            <div>
                <!-- 社会治理问题概况 -->
                <div class="shzlwtgk">
                    <div class="shzlwtgkTilte">
                        社会治理问题概况
                        <span class="line"></span>
                        <span class="line2"></span>
                    </div>

                    <div class="shzlwtgkCantent">
                        <span class="shzlwtgkJiao"></span>
                        <span class="shzlwtgkJiao"></span>
                        <span class="shzlwtgkJiao"></span>
                        <span class="shzlwtgkJiao"></span>
                        <div v-for="(item,index) in shzlwtgkData" :key="item.name" :class="['li',index==1?'rightLi':'']">
                            <img :src="item.img" class="bgImg" alt="">
                            <div class="number">{{item.number}}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="shzlwtgkCantent">
                        <span class="shzlwtgkJiao"></span>
                        <span class="shzlwtgkJiao"></span>
                        <span class="shzlwtgkJiao"></span>
                        <span class="shzlwtgkJiao"></span>
                        <div v-for="(item,index) in shzlwtgkData2" :key="item.name" :class="['li',index==1?'rightLi':'']">
                            <img :src="item.img" class="bgImg" alt="">
                            <div class="number">{{item.number}}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <!-- 问题来源概况 -->
                <div class="wtlygk">
                    <div class="wtlygkTilte">
                        问题来源概况
                        <span class="line line12"></span>
                        <span class="line2"></span>
                    </div>
                    <div class="svgs">
                        <SvgCircle style="margin-left: 0px" :size="100" :o="{value:315,percent:32,color:'#FFA04BFF'}" :fontSize="30"
                                   :p="{name:'党员上报',number:'100'}"></SvgCircle>
                        <SvgCircle style="margin-left: 0px" :size="100" :o="{value:315,percent:28,color:'#4BB1FFFF'}" :fontSize="30"
                                   :p="{name:'群众上报',number:'88'}"></SvgCircle>
                        <SvgCircle style="margin-left: 0px" :size="100" :o="{value:315,percent:30,color:'#4BB1FFFF'}" :fontSize="30"
                                   :p="{name:'巡查发现',number:'94'}"></SvgCircle>
                        <SvgCircle style="margin-left: 0px" :size="100" :o="{value:315,percent:10,color:'#FF4B4FFF'}" :fontSize="30"
                                   :p="{name:'其他来源',number:'31'}"></SvgCircle>
                    </div>
                </div>
                <!-- 问题处置分析 -->
                <div class="wtczfx">
                    <div class="wtczfxTitle">
                        <span style="font-weight: bold">问题处置分析</span>
<!--                        <Button :type="flBtnType" @click="fl" class="wtczfxBtn">分类</Button>-->
<!--                        <Button :type="xlBtnType" @click="xl" class="wtczfxBtn">效率</Button>-->
                        <span class="line line13"></span>
                        <span class="line2"></span>
                    </div>

                    <WentifenxiBingTu></WentifenxiBingTu>
                </div>
            </div>

            <div style="position:relative;top: 0px;left: 0px;height: 830px">
                <Jinrianjiangaikuang></Jinrianjiangaikuang>
                <Button @click="chaoshi" class="chaoshiBtn"><span>超时：</span><span>3</span></Button><!-- 超时按钮 -->
            </div>

        </div>

        <div class="right">
            <div class="right-left">
                <Wentizhuizong @shzlwttjcx="shzlwttjcx" @ajxq="ajxq"></Wentizhuizong><!-- 右上角问题追踪 -->

                <!--右下角指示器-->
                <div class="zhishiqi">
                    <div class="zhishiqiLi">
                        <div>
                            <img class="img1" :src="require('../../public/images/point_wgjs_zhzx2@2x.png')" alt="">
                            <span>市局</span>
                        </div>

                        <div>
                            <img class="img2" :src="require('../../public/images/point_wtfx_gzz@2x.png')" alt="">
                            <span>乡镇</span>
                        </div>
                        <div>
                            <img class="img2" src="#" alt="">
                            <span></span>
                        </div>

                    </div>

                    <div class="zhishiqiLi">
                        <div>
                            <img class="img3" :src="require('../../public/images/xinanjian.png')" alt="">
                            <span class="yja">新案件</span>
                        </div>

                        <div>
                            <img class="img3" :src="require('../../public/images/yishouli.png')" alt="">
                            <span class="yja">已受理</span>
                        </div>

                        <div>
                            <img class="img3" :src="require('../../public/images/yijiean.png')" alt="">
                            <span class="yja">已结案</span>
                        </div>
                    </div>
                </div>
                <!-- 右下角的筛选 -->
                <div :class="['shaixuan',sxkbgc?'sxkbgc':'']" @mouseenter="mouseenter(true)" @mouseleave="mouseenter(false)">
                    <div class="jiao4">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>


                    <ul>
                        <li @click="choose(1)">
                            <span class="radio">
                                <img v-if="choose1" src="../../public/images/gou.png" alt="">
                            </span>
                            <span class="shaixuanLi">问题上图</span>
                        </li>

                        <li @click="choose(2)">
                            <span class="radio">
                                <img v-if="choose2" src="../../public/images/gou.png" alt="">
                            </span>
                            <span class="shaixuanLi">专职网格员 50/50</span>
                        </li>

                        <li @click="choose(3)">
                            <span class="radio">
                                <img v-if="choose3" src="../../public/images/gou.png" alt="">
                            </span>
                            <span class="shaixuanLi">三级网格</span>
                        </li>

                        <li @click="choose(4)">
                            <span class="radio">
                                <img v-if="choose4" src="../../public/images/gou.png" alt="">
                            </span>
                            <span class="shaixuanLi">四级网格</span>
                        </li>

                        <li @click="choose(5)">
                            <span class="radio">
                                <img v-if="choose5" src="../../public/images/gou.png" alt="">
                            </span>
                            <span class="shaixuanLi">五级网格</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="right-right">
                <!--问题高发社区-->
                <Wentigaofashequ></Wentigaofashequ>
                <!--问题高发类型-->
                <Wentigaofaleixing></Wentigaofaleixing>
            </div>
        </div>


        <!-- 下面是弹窗标签  -->

        <Shehuizhiliwentitongjichaxun v-if="shzlwttjcxShow" @shzlwttjcx="shzlwttjcx" @ajxq="ajxq"></Shehuizhiliwentitongjichaxun>
        <Chaoshianjiantongji v-if="csajtjShow" @csajtj="csajtj" @ajxq="ajxq"></Chaoshianjiantongji>
        <Anjianxiangqing v-if="ajxqShow" @ajxq="ajxq"></Anjianxiangqing>
    </div>
</template>

<script>
    //组件引入
    import svgCircle from "../components/pages/Wentifenxi/SvgCircle.vue"
    import wentifenxiBingTu from "../components/pages/Wentifenxi/WentifenxiBingTU.vue"
    import Jinrianjiangaikuang from "../components/pages/Wentifenxi/Jinrianjiangaikuang.vue"
    import Wentizhuizong from "../components/pages/Wentifenxi/Wentizhuizong.vue"
    import Wentigaofashequ from "../components/pages/Wentifenxi/Wentigaofashequ.vue"
    import Wentigaofaleixing from "../components/pages/Wentifenxi/Wentigaofaleixing.vue"
    import Shehuizhiliwentitongjichaxun from "../components/pages/Wentifenxi/Shehuizhiliwentitongjichaxun.vue"
    import Chaoshianjiantongji from "../components/pages/Wentifenxi/Chaoshianjiantongji.vue"
    import Anjianxiangqing from "../components/pages/Wentifenxi/Anjianxiangqing.vue"

    //创建和销毁maker的js文件
    import vueMarkerMixin from '@c/base/map/mixin/marker.js'

    //各种marker
    import ZhouMarker from '@cp/Wentifenxi/marker/ZhouMarker.vue'
    import ShijuMarker from '@cp/Wentifenxi/marker/ShijuMarker.vue'
    import XiangzhenMarker from '@cp/Wentifenxi/marker/XiangzhenMarker.vue'
    import XinanjianMarker from "@cp/Wentifenxi/marker/XinanjianMarker.vue";
    import YishouliMarker from "@cp/Wentifenxi/marker/YishouliMarker.vue";
    import YijieanMarker from "@cp/Wentifenxi/marker/YijieanMarker.vue";


    import mapboxgl from 'mapbox-gl'

    let grid1 = window.grid1
    let grid2 = window.grid2
    let grid3 = window.grid3
    // let grid4 = window.grid4
    // let grid5 = window.grid5
    // let grid6 = window.grid6
    export default {
        name: "Wentifenxi",
        data: function () {
            return {
                shzlwtgkData: [
                    {name: "问题总受理量", number: "315",img:require("../../public/images/bg_wtfx_gfqy_1@2x.png")},
                    {name: "日均受理量", number: "63",img:require("../../public/images/bg_wtfx_gfqy_2@2x.png")}
                ],
                shzlwtgkData2: [
                    {name: "问题总结案量", number: "299",img:require("../../public/images/bg_wtfx_gfqy_3@2x.png")},
                    {name: "结案率", number: "94%",img:require("../../public/images/bg_wtfx_gfqy_4@2x.png")}
                ],
                flBtnType: "primary",
                xlBtnType: "default",

                shzlwttjcxShow: false,//综合治理问题统计显示开关
                csajtjShow: false,//超时案件统计显示开关
                ajxqShow: false,//案件详情显示开关
                //yishouli_Xiangqiang:false,//已受理marker点击 的记录变量

                //下面几个是筛选框的按钮的控制
                choose1:true,
                choose2:true,
                choose3:true,
                choose4:true,
                choose5:true,

                //筛选时用到的变量
                visible3:"visible",

                //地图相关的数据
                map:null,
                personMakerList:[],
                marker:{
                    ZhouMarker:[],//州
                    ShijuMarker:[],//市局
                    XiangzhenMarker:[],//乡镇
                    XinanjianMarker:[],//新案件
                    YishouliMarker:[],//已受理
                    YijieanMarker:[],//已结案

                },
                markerData:{
                    ZhouMarkerData:[],
                    ShijuMarkerData:[],
                    XiangzhenMarkerData:[],
                    XinanjianMarkerData:[],
                    YishouliMarkerData:[],
                    YijieanMarkerData:[],

                },

                zxzbData:[],//三级网格的中心坐标集合

                ShiGrid:[],//记录楚雄市的网格数据
                XZGrid:[],//记录乡镇的网格数据
                XZPoint:[],//所有乡镇的坐标
                sxkbgc:false,//控制筛选框背景颜色
            }
        },
        computed:{
            yishouli_Xiangqiang(){
                return this.$store.state.clickYishouliMarker;
            }
        },
        watch:{
            yishouli_Xiangqiang(newData,oldData){
                if(newData==true){
                    this.ajxqShow = true;
                }else if(newData==false){
                    this.ajxqShow = false;
                }
            }
        },
        components: {
            "SvgCircle": svgCircle,
            "WentifenxiBingTu": wentifenxiBingTu,
            "Jinrianjiangaikuang": Jinrianjiangaikuang,
            "Wentizhuizong": Wentizhuizong,
            "Wentigaofashequ": Wentigaofashequ,
            "Wentigaofaleixing": Wentigaofaleixing,
            "Shehuizhiliwentitongjichaxun": Shehuizhiliwentitongjichaxun,
            "Chaoshianjiantongji": Chaoshianjiantongji,
            "Anjianxiangqing": Anjianxiangqing
        },
        mounted() {
            var time = new Date();
            var year = time.getFullYear()
            var mouth = time.getMonth()
            var day = time.getDate()
            var num = (year/1-2019)*365+(mouth/1-8)*30+day-23
            this.shzlwtgkData[1].number = Math.floor(315/num)

            //console.log(day)


            this.map = this.$store.state.baseMap
            this.fly();
            //this.grid1();

            this.getZxdzb();//获取所有的三级中点坐标
            this.grid2();
            this.grid3();

            this.getShijuMarker();//市局
            this.getXiangzhenMarker();//乡镇
            this.getXinanjianMarker();//新案件
            this.getYishouliMarker();//已受理
            this.getYijieanMarker();//已结案

            this.chuxiongLine()//楚雄边界
            this.line3();//子边界
        },
        mixins:[vueMarkerMixin],
        methods: {
            //筛选框
            mouseenter:function(msg){
                this.sxkbgc=msg
            },
            //地图移动
            fly() {
                this.map.flyTo({
                    center: [101.30225778647172,24.781977490786454],
                    zoom: 10,
                    bearing: 9,
                    pitch: 45,
                    speed: 1.04,
                });
            },
            //分类按钮
            fl: function () {
                this.flBtnType = "primary"
                this.xlBtnType = "default"
            },
            //效率按钮
            xl: function () {
                this.flBtnType = "default"
                this.xlBtnType = "primary"
            },
            //超时按钮
            chaoshi: function () {
                console.log("超时了")
                this.csajtjShow = !this.csajtjShow
            },
            //社会治理问题统计查询  弹窗的显示控制
            shzlwttjcx: function () {
                this.shzlwttjcxShow = !this.shzlwttjcxShow
                //console.log(this.shzlwttjcxShow)

            },
            //超时案件统计
            csajtj: function () {
                this.csajtjShow = !this.csajtjShow
            },
            //案件详情
            ajxq: function (index) {
                if (index >= 0) {
                    console.log(index)//得到案件的序号
                }
                this.ajxqShow = !this.ajxqShow
                if(this.ajxqShow==true){
                    this.$store.commit('show')
                }else if(this.ajxqShow==false){
                    this.$store.commit('hide')
                }
            },
            //点击筛选框
            choose(index){
                //console.log(index)
                switch (index) {
                    case 1:{
                        this.choose1=!this.choose1;
                        if(this.choose1==true){
                            this.getXinanjianMarker()
                            this.getYishouliMarker()
                            this.getYijieanMarker()
                        }else {
                            this.removeMarker(this.marker.XinanjianMarker);
                            this.removeMarker(this.marker.YishouliMarker);
                            this.removeMarker(this.marker.YijieanMarker);


                            this.marker.XinanjianMarker=[]
                            this.marker.YishouliMarker=[]
                            this.marker.YijieanMarker=[]

                            this.markerData.XinanjianMarkerData=[]
                            this.markerData.YishouliMarkerData=[]
                            this.markerData.YijieanMarkerData=[]
                        }

                        break;
                    }
                    case 2:{
                        this.choose2=!this.choose2;
                        break;
                    }
                    case 3:{
                        var _this =this;
                        this.choose3=!this.choose3;
                        if (this.visible3=="visible"){
                            this.visible3="none"
                        }else {
                            this.visible3="visible"
                        }
                        this.map.setLayoutProperty("grid3", "visibility", _this.visible3);
                        this.map.setLayoutProperty("myline3_0", "visibility", _this.visible3);
                        //console.log(this.visible3)
                        break;
                    }
                    case 4:{
                        this.choose4=!this.choose4;
                        break;
                    }
                    case 5:{
                        this.choose5=!this.choose5;
                        break;
                    }
                }
            },

            //一级
            grid1: function () {
                var _this=this;
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
                        'fill-color': 'rgba(42,195,99,0.01)'
                    }
                })

                this.map.on("click","grid",_this.fn)
            },
            fn:function(){
                //console.log("222")
            },
            //楚雄市边界
            chuxiongLine:function(){
                //console.log(this.ShiGrid)
                if(this.map.getLayer("chuxiongLine")){
                    return ;
                }
                this.map.addSource("chuxiongLine", {       /* addSource()函数添加资源,资源ID是route */
                    "type": "geojson",
                    "data": {                  /* GeoJSON格式数据 */
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": this.ShiGrid
                        }
                    }
                });

                this.map.addLayer({                 /* 为地图添加layer */
                    "id": "chuxiongLine",             /* layer id是route */
                    "type": "line",            /* line类型layer*/
                    "source": "chuxiongLine",         /* 资源引用的是上面定义的source*/
                    "layout": {
                        "line-join": "round",  /* 线条相交的形状 */
                        "line-cap": "round"    /* 线条末端形状 */
                    },
                    "paint": {
                        "line-color": "rgba(208, 211, 213, 1)",  /* 线条颜色 */
                        "line-width": 5        /* 线条宽度 */
                    }
                });
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
            //二级
            grid2() {
                var flag = 1;
                var point = {lat:25.131977490786454,lng:101.53325778647172};
                for (let i = 0; i < grid2.length; i++) {
                    var list = grid2[i];
                    var result = this.isptinpoly(point, list);
                    if (result == true) {
                        flag++;
                        if(!this.map.getLayer("grid2")&&flag!=2){
                            this.ShiGrid = list;
                            // this.map.addLayer({
                            //     id: 'grid2',
                            //     type: 'fill',
                            //     source: {
                            //         type: 'geojson',
                            //         data: {
                            //             type: 'Feature',
                            //             geometry: {
                            //                 type: 'Polygon',
                            //                 coordinates: [list]
                            //             }
                            //         }
                            //     },
                            //     paint: {
                            //         'fill-color': 'rgba(42,195,99,0.1)'
                            //     }
                            // })
                        }
                    }
                }
                // this.map.on('click', 'grid2', (e) => {
                //     //console.log(e)
                //     //this.xstanchaungshow = true;
                //     var point2 = e.lngLat;
                //     console.log(point2.lat)
                //     for (let i = 0; i < grid2.length; i++) {
                //         var list = grid2[i];
                //         var result = this.isptinpoly(point2, list);
                //         if (result == true) {
                //             console.log(2)
                //         }
                //     }
                // })
            },
            //三级
            grid3() {
                var ShiGrid = this.ShiGrid;
                var i=0;
                var zxzbData = this.zxzbData;
                var XZPoint = [];
                const grid3Features = grid3.map(d => {
                    var point = {lat:zxzbData[i].point[1],lng:zxzbData[i].point[0]}
                    var result = this.isptinpoly(point, ShiGrid);
                    if (result == true) {
                        XZPoint.push(point);
                        var obj = {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [zxzbData[i].grid]
                            }
                        }
                        i++;
                        return obj;
                    }
                    i++;
                })

                this.XZPoint=XZPoint;

                var arr = []
                for (let j = 0; j < grid3Features.length; j++) {
                    if(grid3Features[j]!=undefined){
                        arr.push(grid3Features[j])
                    }
                }

                //console.log(arr[0])

                this.map.addLayer({
                    id: 'grid3',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: arr
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(42,136,181,0.3)'
                    }
                })
                this.map.on('click', 'grid3', (e) => {
                    //console.log(e);
                    //this.sanjiTanchuang = true;
                })
            },
            line3:function(){
                if(this.map.getLayer("myline3_0")){
                    return ;
                }else {
                    var ShiGrid = this.ShiGrid;
                    var i=0;
                    var zxzbData = this.zxzbData;
                    var arr = [];
                    const line3Features = zxzbData.map(d => {
                        var point = {lat:zxzbData[i].point[1],lng:zxzbData[i].point[0]}
                        var result = this.isptinpoly(point, ShiGrid);
                        if (result == true) {
                            var obj = {
                                type:'Feature',
                                geometry:{
                                    type:'LineString',
                                    coordinates:d.grid
                                }
                            }
                            i++;
                            arr.push(obj);
                        }else {
                            i++;
                        }
                    })


                    this.map.addLayer({
                        id:'myline3_0',
                        type:'line',
                        source:{
                            type:'geojson',
                            data:{
                                type:'FeatureCollection',
                                features:arr
                            }
                        },
                        paint:{
                            "line-color": "rgba(76, 144, 180, 1)",  /* 线条颜色 */
                            "line-width": 3       /* 线条宽度 */
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
                    var obj = {};
                    var point = this.calcCenterCrd(data[i]);
                    var grid = data[i]
                    obj.grid = grid;
                    obj.point = point;
                    zxzbData.push(obj);
                }
                this.zxzbData = zxzbData;
            },
            //生成所有图片到三级网格
            sanjiImg(){
                var _this = this;
                var zxzbData = _this.zxzbData;
                for (let i = 0; i < zxzbData.length; i++) {
                    this.map.loadImage(require('../../public/images/point_wtfx_gzz@2x.png'), function (error, image) {
                        if (error) throw error;
                        _this.map.addImage('sanjiImg'+i, image);
                        _this.map.addLayer({
                            "id": "sanjiImg"+i,
                            "type": "symbol",
                            "source": {
                                "type": "geojson",
                                "data": {
                                    "type": "FeatureCollection",
                                    "features": [{
                                        "type": "Feature",
                                        "geometry": {
                                            "type": "Point",
                                            "coordinates": zxzbData[i]
                                        }
                                    }]
                                }
                            },
                            "layout": {
                                "icon-image": "sanjiImg"+i,
                                "icon-size": 0.6
                            }
                        });
                    });
                }
            },

            //*******************************************************调用函数进行创建
            //一级  州
            //得到州扎点
            getZhouMarker:function () {
                var obj = [
                    {
                        dept_name:"楚雄州",
                        lnglat:[101.524638, 25.464866]
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
                    //console.log(data)
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


            //二级  市局
            //得到市局marker
            getShijuMarker:function () {
                var obj = [
                    {
                        dept_name:"楚雄市",
                        num:54,
                        lnglat:[101.278808898465,24.800692827280002]
                    }
                ]
                this.markerData.ShijuMarkerData=obj;
                this.setShijuMarkerPoint();
            },
            //添加到市局扎点
            setShijuMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.ShijuMarkerData){
                    let data = this.markerData.ShijuMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:ShijuMarker
                    }
                    this.marker.ShijuMarker.push(this.makeVueMarker(option));
                }
                this.addShijuMarker()
            },
            //创建市局扎点
            addShijuMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ShijuMarker,map)
            },

            //三级  乡镇
            //得到乡镇marker
            getXiangzhenMarker:function () {
                var data = this.XZPoint;
                var arr2 =  ["大过口乡","东华镇","八角镇","苍岭镇","鹿城镇","吕合镇","中山镇","树苴乡","紫溪镇","西舍街镇","大地基乡","子午镇","三街镇","东瓜镇","新村镇"]
                var arr = [];
                for (let i = 0; i < data.length; i++) {
                    var obj = {};
                    obj.dept_name=arr2[i];
                    obj.num=10;
                    obj.lnglat=data[i];
                    arr.push(obj);
                }

                this.markerData.XiangzhenMarkerData=arr;
                this.setXiangzhenMarkerPoint();
            },
            //添加到市局扎点
            setXiangzhenMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.XiangzhenMarkerData){
                    let data = this.markerData.XiangzhenMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:XiangzhenMarker
                    }
                    this.marker.XiangzhenMarker.push(this.makeVueMarker(option));
                }
                this.addXiangzhenMarker()
            },
            //创建市局扎点
            addXiangzhenMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.XiangzhenMarker,map)
            },

            //四级
            //得到新案件marker
            getXinanjianMarker:function () {
                var obj = [
                    {
                        id:"xinanjian1",
                        lnglat:[101.17497548276293,24.709881096281777]
                    },
                    {
                        id:"xinanjian2",
                        lnglat:[101.11039353113301,24.582191182899507]
                    },
                    {
                        id:"xinanjian3",
                        lnglat:[101.7261533299066,24.957751012392222]
                    },
                    {
                        id:"xinanjian4",
                        lnglat:[100.99800496116359,24.80288518141198]
                    },
                    {
                        id:"xinanjian5",
                        lnglat:[101.10101524061736,24.989242880183852]
                    }
                ]
                this.markerData.XinanjianMarkerData=obj;
                this.setXinanjianMarkerPoint();
            },
            //添加到新案件扎点
            setXinanjianMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.XinanjianMarkerData){
                    let data = this.markerData.XinanjianMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:XinanjianMarker
                    }
                    this.marker.XinanjianMarker.push(this.makeVueMarker(option));
                }
                this.addXinanjianMarker()
            },
            //创建新案件扎点
            addXinanjianMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.XinanjianMarker,map)
            },


            //得到已结案案件marker
            getYishouliMarker:function () {
                var obj = [
                    {
                        id:"yishouli1",
                        lnglat:[101.24321362879954,24.861621303761623]
                    },
                    {
                        id:"yishouli2",
                        lnglat:[101.25994823948724,24.559379823010403]
                    },
                    {
                        id:"yishouli3",
                        lnglat:[101.24961588651689,24.732930463283566]
                    }
                ]
                this.markerData.YishouliMarkerData=obj;
                this.setYishouliMarkerPoint();
            },
            //添加到已受理案件扎点
            setYishouliMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.YishouliMarkerData){
                    let data = this.markerData.YishouliMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:YishouliMarker
                    }
                    this.marker.YishouliMarker.push(this.makeVueMarker(option));
                }
                this.addYishouliMarker()
            },
            //创建已受理案件扎点
            addYishouliMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.YishouliMarker,map)
            },

            //得到已受理案件marker
            getYijieanMarker:function () {
                var obj = [
                    {
                        id:"yijiean1",
                        lnglat:[101.25960638126264,24.843712881498746]
                    },
                    {
                        id:"yijiean2",
                        lnglat:[101.35255121819398,24.781921817317922]
                    }
                ]
                this.markerData.YijieanMarkerData=obj;
                this.setYijieanMarkerPoint();
            },
            //添加到已受理案件扎点
            setYijieanMarkerPoint(){
                let path = this.$route.path;
                for(let i in this.markerData.YijieanMarkerData){
                    let data = this.markerData.YijieanMarkerData[i];
                    //console.log(data)
                    let option = {
                        lnglat:data.lnglat,
                        props:{'d':data,'path':path},
                        vuecp:YijieanMarker
                    }
                    this.marker.YijieanMarker.push(this.makeVueMarker(option));
                }
                this.addYijieanMarker()
            },
            //创建已受理案件扎点
            addYijieanMarker(){
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.YijieanMarker,map)
            },
        },
        beforeDestroy(){
            var _this=this;
            this.map.off('click',"grid",_this.fn)
            //this.map.removeLayer("grid")
            //this.map.removeSource("grid")
            //this.map.removeLayer("grid2")
            //this.map.removeSource("grid2")
            this.map.removeLayer("grid3")
            this.map.removeSource("grid3")
            this.map.removeLayer("chuxiongLine")
            this.map.removeSource("chuxiongLine")

            this.map.removeLayer("myline3_0")
            this.map.removeSource("myline3_0")

            // this.mapfun.removeDutyGridLine();
            this.removeMarker(this.marker);
            // heatMap.hideHeatMap(this.heatMapOption);
        },
    }
</script>

<style scoped lang="scss">
    .shzlwtgkCantent {
        position: relative;
        top: 0px;
        left: 0px;
    }
    .shzlwtgkCantent .shzlwtgkJiao {
        position: absolute;
        top: 20px;
        left: 0px;
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: RGBA(169, 175, 180, 1);
    }

    .shzlwtgkCantent .shzlwtgkJiao:nth-child(1) {
        top: 20px;
        left: 0px;
    }

    .shzlwtgkCantent .shzlwtgkJiao:nth-child(2) {
        top: 118px;
        left: 0px;
    }
    .shzlwtgkCantent .shzlwtgkJiao:nth-child(3) {
        top: 20px;
        left: 501px;
    }
    .shzlwtgkCantent .shzlwtgkJiao:nth-child(4) {
        top: 118px;
        left: 501px;
    }
    .sxkbgc {
        background-color: rgba(0,0,0,0.9) !important;
    }
    .bgImg {
        position: absolute;
        top: 5px;
        left: 78px;
        display: inline-block;
        width: 90px;
        height: 90px;
        opacity: 0.1;
    }

    .jiao4 {
        position: relative;
        top: -15px;
        left: -20px;
    }

    .jiao4 span:nth-child(1) {
        position: absolute;
        top: 217px;
        left: 247px;
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: white;
    }
    .jiao4 span:nth-child(4) {
        position: absolute;
        top: -2px;
        left: -2px;
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: white;
    }
    .jiao4 span:nth-child(2) {
        position: absolute;
        top: -2px;
        left: 247px;
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: white;
    }
    .jiao4 span:nth-child(3) {
        position: absolute;
        top: 217px;
        left: -2px;
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: white;
    }

    .zhezhao1 {
        position: absolute;
        left: 0px;
        top: 0px;
        display: inline-block;
        height: 1023px;
        width: 1200px;
        background: linear-gradient(to right, rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,0));
        background: -ms-linear-gradient(to right, rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,0));
        background: -webkit-linear-gradient(to right,rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,0));
        background: -moz-linear-gradient(to right, rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,0));
    }

    .zhezhao2 {
        position: absolute;
        left: 2540px;
        top: 0px;
        display: inline-block;
        height: 1023px;
        width: 1400px;
        background: linear-gradient(to left, rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,0));
        background: -ms-linear-gradient(to left,rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,0));
        background: -webkit-linear-gradient(to left,rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,0));
        background: -moz-linear-gradient(to left,rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,1),rgba(17,22,32,0));
    }

    .line {
        position: absolute;
        top: 20px;
        right: 48px;
        display: inline-block;
        width: 260px;
        height: 2px;
        background-color: rgba(255,255,255,0.2);
    }

    .line12 {
        width: 320px;
    }

    .line13 {
        width: 320px;
    }

    .line2 {
        position: absolute;
        top: 13px;
        right: 45px;
        display: inline-block;
        width: 3px;
        height: 15px;
        background-color: rgba(255,255,255,0.5);
    }

    .li {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
        padding: 10px;
        width: 246px;
        height: 108px;
        /*border: 1px dashed rgba(255,255,255,0.5);*/
        margin-top: 20px;
        background-color: rgba(255,255,255,0.08)
    }

    .rightLi {
        margin-left: 20px;
    }

    .shzlwtgk {
        width: 562px;
    }

    .wtlygk {
        margin-top: 20px;
        font-size: 28px;
    }

    .wtlygkTilte {
        position: relative;
        top: 0px;
        left: 0px;
        font-weight: bold;
    }

    .svgs{
        margin-top: 20px;
        width: 514px;
        justify-content: space-between;
    }

    .wtczfx {
        position: relative;
        top: 25px;
        left: 0px;
        font-size: 28px;
    }

    .name {
        font-size: 20px;
    }

    .number {
        font-size: 30px;
        font-weight: bold;
    }

    ul {
        list-style: none;
    }

    li {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
        height: 30px;
        width: 260px;
    }

    .wen-ti-fen-xi {
        position: absolute;
        top: 0;
        left: 0px;
        height: 1023px;
        width: 3840px;
        padding: 10px;
        pointer-events: none;
        *{
            pointer-events: auto;
        }
    }

    .left {
        position: absolute;
        top: 180px;
        left: 0px;
        display: inline-block;
        height: 835px;
        width: 562px;
        display: flex;
        padding-left: 48px;
    }

    .shzlwtgkTilte {
        position: relative;
        top: 0px;
        left: 0px;
        color: #FEFFFEFF;
        font-size: 28px;
        font-weight: bold;
    }

    .shzlwtgkCantent div {
        text-align: center;
    }

    .svgs {
        display: flex;
        justify-content: space-between;
    }

    .wtczfxBtn {
        margin-left: 20px;
    }

    .chaoshiBtn {
        position: absolute;
        bottom: 70px;
        left: 0px;
        color: white;
        display: inline-block;
        width: 325px;
        height: 80px;
        background-color: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.5);
        font-size: 26px;
        box-shadow: 0 0 5px #fff;
    }

    .chaoshiBtn span:nth-child(1) {
        position: relative;
        top: -5px;
        left: 0px;
    }

    .chaoshiBtn span:nth-child(2) {
        color: #FF4400FF;
        font-size: 36px;
        font-weight: bold;
        line-height: 80px;
    }


    .shaixuan {
        position: absolute;
        bottom: 35px;
        right: 7px;
        display: inline-block;
        width: 250px;
        height: 220px;
        padding: 15px 20px;
        background-color: rgba(255,255,255,0.1);
        font-size: 18px;
    }

    .shaixuan li {
        position: relative;
        top: 0px;
        left: 0px;
    }

    .shaixuanLi {
        position: absolute;
        top: 6px;
        left: 40px;
        font-size: 18px;
    }


    .right {
        position: absolute;
        top: 180px;
        left: 2750px;
        /*border: 1px solid #ccc;*/
        display: inline-block;
        width: 1064px;
        height: 835px;
        display: flex;
    }

    .right-left {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
        width: 438px;
    }

    .radio {
        position: absolute;
        top: 7px;
        left: 0px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #2ACEFFFF;
        text-align: center;
    }

    .radio img {
        position: absolute;
        top: 5px;
        left: 5px;
        display: inline-block;
        width: 9px;
        height: 9px;
    }

    .zhishiqi {
        position: absolute;
        top: 700px;
        left: -265px;
        display: inline-block;
        width: 400px;
        font-size: 22px;
    }

    .zhishiqi div {
        flex: 1;
    }

    .zhishiqi img {
        display: inline-block;
        margin-right: 5px;
    }

    .zhishiqi .img1 {
        position: relative;
        top: 5px;
        left: 0px;
        width: 25px;
        height: 39px;
    }

    .zhishiqi .img2 {
        position: relative;
        top: 5px;
        left: 0px;
        width: 25px;
        height: 39px;
    }

    .zhishiqi .img3 {
        width: 40px;
        height: 40px;
    }

    .yja {
        position: relative;
        top: -11px;
    }

    .zhishiqiLi {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
    }

    .zhishiqi .zhishiqiLi:nth-child(1) img {
        margin: 0px 10px;
    }

</style>