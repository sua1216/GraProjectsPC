<template>
    <div class="zu-zhi-jian-she">
        <div class="page-header" v-if="CengJi <= 1">
            <div class="page-header-item" style="padding-left: 140px;">
                <div><img src="@/assets/common/images/ZhengZhiJianShe/chevron-circle-up@2x.png" width="18px"
                          height="18px" alt="">2%
                </div>
                <div>1,980<span>次</span></div>
                <div>三会一课</div>
            </div>
            <div class="page-header-item">
                <div><img src="@/assets/common/images/ZhengZhiJianShe/chevron-circle-up@2x.png" width="18px"
                          height="18px" alt="">2%
                </div>
                <div>3,341<span>次</span></div>
                <div>党建活动</div>
            </div>
            <div class="page-header-item" style="padding-right: 140px;">
                <div><img src="@/assets/common/images/ZhengZhiJianShe/chevron-circle-down@2x.png" width="18px"
                          height="18px" alt="">2%
                </div>
                <div>12,521<span>h</span></div>
                <div>掌上党校</div>
            </div>
        </div>
        <div class="page-header" v-if="CengJi >1">
            <div class="page-header-item" style="padding-left: 140px;">
                <div><img src="@/assets/common/images/ZhengZhiJianShe/chevron-circle-up@2x.png" width="18px"
                          height="18px" alt="">2%
                </div>
                <div>780<span>次</span></div>
                <div>三会一课</div>
            </div>
            <div class="page-header-item">
                <div><img src="@/assets/common/images/ZhengZhiJianShe/chevron-circle-up@2x.png" width="18px"
                          height="18px" alt="">2%
                </div>
                <div>341<span>次</span></div>
                <div>党建活动</div>
            </div>
            <div class="page-header-item" style="padding-right: 140px;">
                <div><img src="@/assets/common/images/ZhengZhiJianShe/chevron-circle-down@2x.png" width="18px"
                          height="18px" alt="">2%
                </div>
                <div>4521<span>h</span></div>
                <div>掌上党校</div>
            </div>
        </div>
        <div class="bottomMiddle">
            <div>
                <span><img src="../assets/common/images/ZuZhiJianShe/point_djyl_m@2x.png" height="76" width="44"/>中心党组织</span>
                <span v-if="CengJi < 4"> <img src="../assets/common/images/ZuZhiJianShe/point_djyl_l@2x.png" height="59"
                                              width="49"/>成员党组织</span>
                <span><img src="../assets/common/images/ZuZhiJianShe/point_djyl_s@2x.png" height="44" width="35"/>其他党组织</span>
            </div>
        </div>
        <div class="svg">
            <svg>
                <!--动画-->
                <g class="animate">
                    <circle cx="20" cy="45" r="5" fill="#FFC435FF" style="fill-opacity:1">
                        <animate attributeName="r" from="5" to="20" dur="3s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" from="1" to="0" dur="3s" repeatCount="indefinite"/>
                    </circle>
                </g>
                <g class="animate">
                    <circle cx="20" cy="45" r="5" fill="#FFC435FF" style="fill-opacity:1">
                        <animate attributeName="r" from="5" to="20" dur="3s" begin="1.5s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" from="1" to="0" dur="3s" begin="1.5s"
                                 repeatCount="indefinite"/>
                    </circle>
                </g>
                <!--气泡-->
                <g>
                    <circle cx="20" cy="45" r="5" fill="#FFC435FF" style="fill-opacity:1"></circle>
                </g>
            </svg>
        </div>
        <div class="DaoHangTOP">
            {{ showData.join(' ')?showData.join(' '):'楚雄州委'}}
        </div>
        <div class="nav hoverHid">
            <div class="defaultTwo">
                <LeftDaoHang ref="LeftDaoHang0" :dataSource="dataSource" :level="0" @changeType="changeType"/>
                <LeftDaoHang ref="LeftDaoHang1" v-if="currentLevel >= 1" :level="1" :dataSource="source1"
                             @changeType="changeType"/>
                <LeftDaoHang ref="LeftDaoHang2" v-if="currentLevel >= 2" :level="2" :dataSource="source2"
                             @changeType="changeType"/>
                <LeftDaoHang ref="LeftDaoHang3" v-if="currentLevel >= 3" :level="3" :dataSource="source3"
                             @changeType="changeType"/>
            </div>
        </div>
        <transition name="toggleleft" mode="out-in">
            <component v-bind:is="leftcomponent"></component>
        </transition>
        <transition name="toggle" mode="out-in">
            <component v-bind:is="rightcomponent"></component>
        </transition>
        <MapListBtn :cengji="CengJi" :position="listBtnPos" :data="btnData" @listBtn="listBtn"></MapListBtn>
    </div>
</template>

<script>
    import vueMarkerMixin from '@c/base/map/mixin/marker.js'
    import LeftDaoHang from "../components/pages/ZuZhiJianShe/LeftDaoHang.vue";

    import ZhengzhijiansheRight from "@cp/ZhengZhiJianShe/ZhengzhijiansheRight.vue";
    import ZhengzhijiansheLeft from "@cp/ZhengZhiJianShe/ZhengzhijiansheLeft.vue";

    // 一级marker
    import SixCengDianJiMarker from "@cp/ZuZhiJianShe/Marker/SixCengDianJiMarker.vue";
    import DongGuaDianJiMarker from "@cp/ZuZhiJianShe/Marker/DongGuaDianJiMarker.vue";
    import SixWanGeMaker from "@cp/ZuZhiJianShe/Marker/SixWanGeMaker.vue";
    import JieDaoCenter from "@cp/ZuZhiJianShe/Marker/JieDaoCenter.vue";
    import ChongXiongShiTuMarker from "../components/pages/ZuZhiJianShe/Marker/ChongXiongShiTuMarker.vue";
    import YiJianXian from "../components/pages/ZuZhiJianShe/Marker/XianZhiHuiMarker.vue";
    import JiGuanDangMarker from "../components/pages/ZuZhiJianShe/Marker/JiGuanDangMarker.vue";
    import XueXiaoDangMarker from "../components/pages/ZuZhiJianShe/Marker/XueXiaoDangMarker.vue";
    import ShiYeDanWeiMarker from "../components/pages/ZuZhiJianShe/Marker/ShiYeDanWeiMarker.vue";
    import QiYeDangZuZhiMarker from "../components/pages/ZuZhiJianShe/Marker/QiYeDangZuZhiMarker.vue";
    import keyArea from '@cp/Markers/keyArea.vue'
    //监听
    import MapListBtn from "../components/pages/ZuZhiJianShe/MapListBtn.vue";

    let grid1 = window.grid1
    let grid2 = window.grid2
    let grid3 = window.grid3
    let grid4 = window.grid4
    let grid5 = window.grid5
    let grid6 = window.grid6
    export default {
        name: "Zuzhijianshe",
        data() {
            return {
                //记录索引数组
                indexArray: [],
                //记录上一级index
                preNum1: 0,
                preNum2: 0,
                preNum3: 0,
                preNum4: 0,
                hiddenValue: true,
                //层级
                CengJi: 1,
                //第三层社区的索引
                Grid5Index: 0,
                btnData: [
                    {
                        isChecked: false,
                        name: '',
                        word: '157'
                    },
                    {
                        isChecked: false,
                        name: '企业党组织',
                        word: '50/5'
                    },
                    {
                        isChecked: false,
                        name: '机关党组织',
                        word: '10'
                    },
                    {
                        isChecked: false,
                        name: '事业单位党组织',
                        word: '10'
                    },
                    {
                        isChecked: false,
                        name: '学校党组织',
                        word: '10'
                    }
                ],
                listBtnPos: {
                    right: '700px'
                },
                //****************************************************************************一级数据
                //一级网格所有的中心点
                dataZM: [{
                    "lnglat": [101.60791908430889, 24.523656119933364],
                    "didian": "双柏县"
                }, {
                    "lnglat": [100.99817787338026, 25.171656001580573],
                    "didian": "南华县"
                }, {
                    "lnglat": [102.02539955307441, 25.161712556422174],
                    "didian": "禄丰县"
                }, {
                    "lnglat": [101.59143959212167, 25.38524354730363],
                    "didian": "牟定县"
                }, {
                    "lnglat": [101.16297279525287, 25.479499433763706],
                    "didian": "姚安县"
                }, {
                    "lnglat": [101.18494545149179, 25.905205039023556],
                    "didian": "大姚县"
                }, {
                    "lnglat": [101.8001798265044, 25.77171727974708],
                    "didian": "元谋县"
                }, {
                    "lnglat": [102.16822181867576, 25.722239191447414],
                    "didian": "武定县"
                }, {"lnglat": [101.5474942796115, 26.10268718653235], "didian": "永仁县"}],

                dataChuXiongCenter: [{
                    "lnglat": [101.54584, 25.032917],
                    "didian": "楚雄市"
                }],
                //学校党组织
                dataXueXiao: [
                    [101.70791908430889, 24.523656119933364],
                    [101.43326088117707, 24.84808028424851],
                    [101.99817787338026, 25.171656001580573],
                    [102.12539955307441, 25.161712556422174],
                    [101.69143959212167, 25.38524354730363],
                    [101.26297279525287, 25.479499433763706],
                    [101.28494545149179, 25.905205039023556],
                    [101.9001798265044, 25.77171727974708],
                    [102.26822181867576, 25.722239191447414],
                    [101.6474942796115, 26.10268718653235]
                ],
                //企业党组织
                dataQiYe: [
                    [101.70791908430889, 24.823656119933364],
                    [101.43326088117707, 24.94808028424851],
                    [101.99817787338026, 25.371656001580573],
                    [102.12539955307441, 25.461712556422174],
                    [101.69143959212167, 25.58524354730363],
                    [101.26297279525287, 25.679499433763706],
                    [101.28494545149179, 24.905205039023556],
                    [101.9001798265044, 24.67171727974708],
                    [102.26822181867576, 25.522239191447414],
                    [101.6474942796115, 24.30268718653235]
                ],
                //机关党组织
                dataJiGuan: [
                    [101.50791908430889, 24.823656119933364],
                    [101.23326088117707, 24.94808028424851],
                    [101.89817787338026, 25.371656001580573],
                    [101.12539955307441, 25.461712556422174],
                    [101.49143959212167, 25.58524354730363],
                    [101.06297279525287, 25.679499433763706],
                    [101.08494545149179, 24.905205039023556],
                    [101.7001798265044, 24.67171727974708],
                    [102.06822181867576, 25.522239191447414],
                    [101.4474942796115, 25.30268718653235]
                ],
                //事业单位党组织
                dataShiYeDaWei: [
                    [101.50791908430889, 24.623656119933364],
                    [101.03326088117707, 24.74808028424851],
                    [101.89817787338026, 25.671656001580573],
                    [101.12539955307441, 25.861712556422174],
                    [101.49143959212167, 25.48524354730363],
                    [101.06297279525287, 25.179499433763706],
                    [101.08494545149179, 24.505205039023556],
                    [101.7001798265044, 24.37171727974708],
                    [102.06822181867576, 25.222239191447414],
                    [101.4474942796115, 25.00268718653235]
                ],
                //****************************************************************************二级数据
                // 二级楚雄市下镇
                dataErJiZhenCenter: [
                    /*  {"lnglat": [101.33299331584755, 24.664345422413845], "didian": "鹿城镇"},*/
                    {"lnglat": [101.53949007237327, 25.10657401255895], "didian": "东瓜镇"},
                    /*   {"lnglat": [101.053620, 24.999750], "didian": "三街镇"},
                       {"lnglat": [100.954740, 24.856530], "didian": "八角镇"},
                       {"lnglat": [101.05403577745614, 24.783807393837577], "didian": "中山镇"},
                       {"lnglat": [101.079580, 24.660860], "didian": "西舍街镇"},
                       {"lnglat": [101.17183257322415, 24.86042452129857], "didian": "大过口乡"},
                       {"lnglat": [101.20381330308675, 24.64500540546463], "didian": "新村镇"},
                       {"lnglat": [101.542380, 24.882820], "didian": "子午镇"},
                       {"lnglat": [101.374840, 25.139190], "didian": "吕合镇"},
                       {"lnglat": [101.455860, 25.079500], "didian": "紫溪镇"},
                       {"lnglat": [101.492940, 24.936370], "didian": "东华镇"},
                       {"lnglat": [101.681080, 25.043420], "didian": "苍岭镇"
                       }*/],
                dataCXSZ:
                    [
                        {"lnglat": [101.59606948408589, 24.978179345294322], "didian": "鹿城镇"},
                        {"lnglat": [101.53949007237327, 25.10657401255895], "didian": "东瓜镇"},
                        {"lnglat": [101.053620, 24.999750], "didian": "三街镇"},
                        {"lnglat": [100.954740, 24.856530], "didian": "八角镇"},
                        {"lnglat": [101.05403577745614, 24.783807393837577], "didian": "中山镇"},
                        {"lnglat": [101.079580, 24.660860], "didian": "西舍街镇"},
                        {"lnglat": [101.17183257322415, 24.86042452129857], "didian": "大过口乡"},
                        {"lnglat": [101.20381330308675, 24.64500540546463], "didian": "新村镇"},
                        {"lnglat": [101.542380, 24.882820], "didian": "子午镇"},
                        {"lnglat": [101.374840, 25.139190], "didian": "吕合镇"},
                        {"lnglat": [101.36809577783902, 25.031110104669438], "didian": "紫溪镇"},
                        {"lnglat": [101.42528459141653, 24.89851032353873], "didian": "东华镇"},
                        {"lnglat": [101.681080, 25.043420], "didian": "苍岭镇"},
                        {"lnglat": [100.94931074540949, 25.01478954861797], "didian": "树苴乡"},
                        {"lnglat": [101.35202399726171, 24.668829770986747], "didian": "大地基乡"}],
                //二级企业党
                dataERqiye: [
                    [101.19853810968107, 24.84679343305058],
                    [101.24218656317379, 25.000916248347437],
                    [101.45127369018178, 24.790604232542805],
                    [101.5101195168051, 25.141641652642633],
                    [101.71117030776645, 24.99020812071211],
                ],
                dataERJiGuan: [
                    [101.16200222568074, 24.908163309645815],
                    [101.37324053859459, 25.024181831944375],
                    [100.99941831516492, 24.716003257253888],
                    [101.3018427338078, 25.064869508948604],
                    [101.66154339803086, 24.905065768499284],
                ],
                dataERShiYe: [
                    [101.151516946176, 24.831280134065224],
                    [101.08499690198289, 24.778895890631844],
                    [101.40334150222401, 24.875990905094596],
                    [101.42365638279307, 24.875372687298707],
                    [101.62290144047671, 24.984019925063265],
                ],
                dataERXueXiao: [
                    [101.04507355577056, 24.792651639013158],
                    [101.00213530790228, 24.89704024707116],
                    [101.11986323460309, 24.595278296738982],
                    [101.61257345687812, 24.985574168883915],
                    [101.33923862666211, 24.77739278193326],
                ],
                //三级各系列点
                dataJieDao: [
                    {"lnglat": [101.51915499875815, 25.057740380601288], "didian": "彝人古镇社区"},
                    {"lnglat": [101.60378568689771, 25.062986625724633], "didian": "览经社区"},
                    {"lnglat": [101.5317560711689, 25.044003838354385], "didian": "永安社区"},
                    {"lnglat": [101.5077237851495, 25.067654852234995], "didian": "东瓜社区"},
                    {"lnglat": [101.56788352781854, 25.117374618080362], "didian": "邓官村委会"},
                    {"lnglat": [101.53430970660077, 25.07987577528006], "didian": "车坪社区"},
                    {"lnglat": [101.48961178415448, 25.162618818415908], "didian": "龙河村委会"},
                    {"lnglat": [101.48947617197632, 25.094710583401096], "didian": "刘家社区"},
                    {"lnglat": [101.51296367417456, 25.094282728415934], "didian": "永兴社区"},
                    {"lnglat": [101.53111089294828, 25.13684239531584], "didian": "兴隆村委会"},
                 /*   {"lnglat": [101.49593155318047, 25.11811675509246], "didian": "本东村委会"},*/
                    {"lnglat": [101.55394594975456, 25.062214213746557], "didian": "詹家社区"},
                    {"lnglat": [101.61385132155948, 25.04472439143956], "didian": "庄甸社区"},
                    {"lnglat": [101.58637647702432, 25.082466508460186], "didian": "桃园社区"},
                ],
                dataSanqiye: [
                    [101.5077850069132, 25.170263729287512],
                    [101.56392888519076, 25.095403059813165],
                    [101.5815012510115, 25.06951172576632],

                ],
                dataSanJiGuan: [
                    [101.60529080343292, 25.090395056903844],
                    [101.47801017241255, 25.13870169713435],
                    [101.56060319418788, 25.0999991254657],

                ],
                dataSanShiYe: [
                    [101.52259371176575, 25.120571695108964],
                    [101.57284814244576, 25.07366579236941],
                    [101.51394021106694, 25.12115828690085],

                ],
                dataSanXueXiao: [
                    [101.59356343990373, 25.042324280943788],
                    [101.62735805120258, 25.04417230645757],
                    [101.55152074854271, 25.158878644985066],

                ],
                //四级各系列点
                dataSiJiCenter: [
                    {"lnglat": [101.51915499875815, 25.057740380601288], "didian": "彝人古镇社区"},
                    {"lnglat": [101.60378568689771, 25.062986625724633], "didian": "览经社区"},
                    {"lnglat": [101.5317560711689, 25.044003838354385], "didian": "车坪社区"},
                    {"lnglat": [101.5077237851495, 25.067654852234995], "didian": "东瓜社区"},
                    {"lnglat": [101.56788352781854, 25.117374618080362], "didian": "邓官村委会"},
                    {"lnglat": [101.53430970660077, 25.07987577528006], "didian": "永安社区"},
                    {"lnglat": [101.48961178415448, 25.162618818415908], "didian": "龙河村委会"},
                    {"lnglat": [101.48947617197632, 25.094710583401096], "didian": "刘家社区"},
                    {"lnglat": [101.51296367417456, 25.094282728415934], "didian": "永兴社区"},
                    {"lnglat": [101.53111089294828, 25.13684239531584], "didian": "兴隆村委会"},
                    /*{"lnglat": [101.49593155318047, 25.11811675509246], "didian": "本东村委会"},*/
                    {"lnglat": [101.55394594975456, 25.062214213746557], "didian": "詹家社区"},
                    {"lnglat": [101.61385132155948, 25.04472439143956], "didian": "庄甸社区"},
                    {"lnglat": [101.58637647702432, 25.082466508460186], "didian": "桃园社区"},
                ],
                dataSiJiCenterOne: [
                    {},
                    {},
                    {"lnglat": [101.53283406116503, 25.072389883546734], "didian": "车坪社区"},
                    {"lnglat": [101.5077237851495, 25.067654852234995], "didian": "东瓜社区"},

                ],
                dataSiJiCenterOneYiren: [
                    {"lnglat": [101.51890857065132, 25.057802154534656], "didian": "彝人古镇社区"},
                ],
                dataSiqiye: [
                    [101.51123166307269, 25.071380820353596],
                    [101.50489790362974, 25.069709505510758],
                    [101.51376768164855, 25.070041937843982],

                ],
                dataSiJiGuan: [
                    [101.51260192246526, 25.06060365641906],
                    [101.5114385161142, 25.08299460514597],
                    [101.50413699122748, 25.07830963145379],

                ],
                dataSiShiYe: [
                    [101.50879224976694, 25.083322395602025],
                    [101.49285444676974, 25.07743689600649],
                    [101.48583581140264, 25.079743478676505],

                ],
                dataSiXueXiao: [
                    [101.49855598915178, 25.069933290877714],
                    [101.51046681834469, 25.071618375324647],
                    [101.5127917789238, 25.064569885708238],

                ],
                dataSiqiyeYiren: [
                    [101.52040938018344, 25.065435692189567],
                    [101.52126181430367, 25.0633497615311],
                    [101.52159256549379, 25.06132649705762],

                ],
                dataSiqiyeChePin: [
                    [101.52939631786631, 25.082469094991723],
                    [101.53829963616545, 25.081270165207528],
                    [101.53907473246466, 25.060867627033545],
                    [101.53100078918675, 25.095310605923274],
                    [101.5408295678402, 25.09472476769956],
                    [101.53165503210334, 25.077482035989647],

                ],
                dataSiJiGuanYiren: [
                    [101.52066999305593, 25.06094906573945],
                    [101.51512191880528, 25.057662390188327],
                    [101.5165883368449, 25.054374793599877],

                ],
                dataSiShiYeYiren: [
                    [101.51866292105808, 25.05516320919706],
                    [101.52023926497595, 25.05383095035772],
                    [101.51979066727807, 25.06163074734195],

                ],
                dataSiXueXiaoYiren: [
                    [101.52025166744248, 25.065290279585582],
                    [101.51871519010484, 25.05577852250393],
                    [101.5203205279643, 25.06056277582057],

                ],
                //五级各系列数据
                dataXiaoZuCenter: [
                    {"lnglat": [101.50270155902479, 25.07699552964405], "didian": "第五党支部"},
                ],
                dataWuWenZi: [
                    {"lnglat": [101.50172489574823, 25.075249302559996], "didian": "II1III2I10V4-1"},
                    {"lnglat": [101.50367863486565, 25.07925008780329], "didian": "II1III2I10V4-2"},

                ],
                dataWuqiye: [
                    {"lnglat": [101.50298442901635, 25.075250429625044],},
                    {"lnglat": [101.50011246155253, 25.07414260712703],},
                    {"lnglat": [101.5018474096749, 25.079481316821216],},
                    {"lnglat": [101.50509549446434, 25.077386591427086],},

                ],
                //6级点击大图标中心点
                dataSixBigCenter: [
                    {"lnglat": [101.51512289952137, 25.056007312232737], "didian": "彝人古镇社区党支部"},
                    {"lnglat": [101.51538057661224, 25.057302179186152], "didian": "星宿家园党支部"},
                    {"lnglat": [101.51873560757565, 25.062770802393956], "didian": "彝人古镇社区流动党员党支部"},
                    /*       {"lnglat": [101.5077237851495, 25.067654852234995], "didian": "星宿家园党支部"},*/
                    /*      {"lnglat": [101.52141687162714,25.058218459607176], "didian": "彝家公社民族文化发展有限公司党支部"},*/
                    /* {"lnglat": [101.52032206284741,25.059743422475947], "didian": "彝人古镇大酒店党支部"},*/
                    /*   {"lnglat": [101.52172245856093,25.059123097731685], "didian": "季连投资有限公司党支部"},*/
                    // {"lnglat": [101.52153814099955,25.058658338656898], "didian": "彝人古镇社区流动党员党支部"},
                    // /*          {"lnglat": [101.51296367417456, 25.094282728415934], "didian": "电力工程商业行业联合党支部"},*/
                    // {"lnglat": [101.52154849972192,25.058580308445812], "didian": "房地产建筑装饰行业联合党支部"},
                    // {"lnglat": [101.52037634588311,25.05988195578216], "didian": "广告科技投资行业联合党支部"},
                    // {"lnglat": [101.51891166523598,25.0613964617217], "didian": "农林生物行业联合党支部"},
                    // {"lnglat": [101.52482240578928,25.065947987916587], "didian": "天然石信息咨询服务行业联合党支部"},
                    /*       {"lnglat": [101.58637647702432, 25.082466508460186], "didian": "文化刺绣行业联合党支部"},*/
                    /* {"lnglat": [101.51891166523598,25.0613964617217], "didian": "金莲花非公经济联合党支部"},*/
                    {"lnglat": [101.52482240578928, 25.065947987916587], "didian": "车坪社区党总支第二支部"},
                    {"lnglat": [101.53109756818998, 25.05677321193275], "didian": "车坪社区党总支第三支部"},
                    {"lnglat": [101.53652683163227, 25.054444726235772], "didian": "车坪社区党总支张邓党小组"},
                    {"lnglat": [101.53945851782703, 25.057090802677024], "didian": "车坪社区党总支第一党支部"},
                    /*     {"lnglat": [101.52482240578928,25.065947987916587], "didian": "车坪社区第三党支部"},
                         {"lnglat": [101.52482240578928,25.065947987916587], "didian": "车坪社区第二党支部"},*/

                ],
                //中心点
                dataERjiCenter:
                    [{
                        "lnglat": [101.33326088117707, 24.84808028424851],
                        "didian": "楚雄市"
                    }, {
                        "lnglat": [101.60791908430889, 24.523656119933364],
                        "didian": "双柏县"
                    }, {
                        "lnglat": [100.99817787338026, 25.171656001580573],
                        "didian": "南华县"
                    }, {
                        "lnglat": [102.02539955307441, 25.161712556422174],
                        "didian": "禄丰县"
                    }, {
                        "lnglat": [101.59143959212167, 25.38524354730363],
                        "didian": "牟定县"
                    }, {
                        "lnglat": [101.16297279525287, 25.479499433763706],
                        "didian": "姚安县"
                    }, {
                        "lnglat": [101.18494545149179, 25.905205039023556],
                        "didian": "大姚县"
                    }, {
                        "lnglat": [101.8001798265044, 25.77171727974708],
                        "didian": "元谋县"
                    }, {
                        "lnglat": [102.16822181867576, 25.722239191447414],
                        "didian": "武定县"
                    }, {"lnglat": [101.5474942796115, 26.10268718653235], "didian": "永仁县"}],
                leftcomponent: null,
                rightcomponent: null,
                marker: {
                    YiJianXian: [],
                    ChongXiongShiTuMarker: [],
                    JiGuanDangMarker: [],
                    XueXiaoDangMarker: [],
                    ShiYeDanWeiMarker: [],
                    JieDaoCenter: [],
                    QiYeDangZuZhiMarker: [],
                    SixWanGeMaker: [],
                    DongGuaDianJiMarker: [],
                    SixCengDianJiMarker: [],
                },

                heatMapOption: {
                    _vue: this,
                    layerId: 'earthquakes-heat'
                },
                currentLevel: 0,
                dataSource: [
                    {name: '楚雄州委', zuzhi: 12150, dangyuan: 158853},
                    {name: '楚雄市委', zuzhi: 1748, dangyuan: 23812},
                    {name: '双柏县委', zuzhi: 745, dangyuan: 9631},
                    {name: '牟定县委', zuzhi: 993, dangyuan: 11575},
                    {name: '南华县委', zuzhi: 958, dangyuan: 14646},
                    {name: '姚安县委', zuzhi: 631, dangyuan: 11248},
                    {name: '大姚县委', zuzhi: 1859, dangyuan: 17178},
                    {name: '永仁县委', zuzhi: 688, dangyuan: 7253},
                    {name: '元谋县委', zuzhi: 868, dangyuan: 11671},
                    {name: '武定县委', zuzhi: 1387, dangyuan: 15427},
                    {name: '禄丰县委', zuzhi: 1258, dangyuan: 22192},
                ],
                dataSource1: [
                    [],
                    [
                        {name: '鹿城镇党委', zuzhi: 291, dangyuan: 2851},
                        {name: '东瓜镇党委', zuzhi: 116, dangyuan: 1861},
                        {name: '三街镇党委', zuzhi: 43, dangyuan: 898},
                        {name: '八角镇党委', zuzhi: 28, dangyuan: 661},
                        {name: '中山镇党委', zuzhi: 65, dangyuan: 903},
                        {name: '西舍街镇党委', zuzhi: 60, dangyuan: 943},
                        {name: '大过口乡党委', zuzhi: 49, dangyuan: 649},
                        {name: '新村镇党委', zuzhi: 58, dangyuan: 784},
                        {name: '子午镇党委', zuzhi: 96, dangyuan: 1668},
                        {name: '紫溪镇党委', zuzhi: 51, dangyuan: 667},
                        {name: '吕合镇党委', zuzhi: 68, dangyuan: 967},
                        {name: '东华镇党委', zuzhi: 98, dangyuan: 1216},
                        {name: '苍岭镇党委', zuzhi: 65, dangyuan: 948},
                        {name: '树苴乡党委', zuzhi: 62, dangyuan: 596},
                        {name: '大地基乡党委', zuzhi: 37, dangyuan: 612}
                    ],
                    [
                        {name: '妥甸镇党委'},
                        {name: '大庄镇党委'},
                        {name: '法脿镇党委'},
                        {name: '鄂嘉镇党委'},
                        {name: '大麦地镇党委'},
                        {name: '安龙堡乡党委'},
                        {name: '爱尼山乡党委'},
                        {name: '独田乡党委'},
                    ],
                    [
                        {name: '共和镇党委'},
                        {name: '新桥镇党委'},
                        {name: '江坡镇党委'},
                        {name: '凤屯镇党委'},
                        {name: '蟠猫乡党委'},
                        {name: '戌街乡党委'},
                        {name: '安乐乡党委'},
                        {name: '蟠猫乡'},


                    ],
                    [
                        {name: '龙川镇党委'},
                        {name: '沙桥镇党委'},
                        {name: '五街镇党委'},
                        {name: '红土坡镇党委'},
                        {name: '马街镇党委'},
                        {name: '兔街镇党委'},
                        {name: '雨露白族乡党委'},
                        {name: '一街乡党委'},
                        {name: '罗武庄乡党委'},
                        {name: '五顶山乡党委'},

                    ],
                    [
                        {name: '栋川镇党委'},
                        {name: '光禄镇党委'},
                        {name: '前场镇党委'},
                        {name: '弥兴镇党委'},
                        {name: '太平镇党委'},
                        {name: '官屯镇党委'},
                        {name: '适中乡党委'},
                        {name: '左门乡党委'},
                        {name: '大河口乡党委'},

                    ],
                    [
                        {name: '金碧镇党委'},
                        {name: '石羊镇党委'},
                        {name: '六苴镇党委'},
                        {name: '龙街镇党委'},
                        {name: '赵家店镇党委'},
                        {name: '新街镇党委'},
                        {name: '桂花镇党委'},
                        {name: '三岔河镇党委'},
                        {name: '昙华乡党委'},
                        {name: '铁锁乡党委'},
                        {name: '三台乡党委'},
                        {name: '湾碧傣族傈僳族乡'},


                    ],
                    [
                        {name: '永定镇党委'},
                        {name: '宜就镇党委'},
                        {name: '中和镇党委'},
                        {name: '莲池乡党委'},
                        {name: '维的乡党委'},
                        {name: '猛虎乡党委'},
                        {name: '永兴傣族乡党委'},

                    ],
                    [
                        {name: '元马镇党委'},
                        {name: '黄瓜园镇党委'},
                        {name: '羊街镇党委'},
                        {name: '老城乡党委'},
                        {name: '平田乡党委'},
                        {name: '新华乡党委'},
                        {name: '物茂乡党委'},
                        {name: '江边乡党委'},
                        {name: '姜驿乡党委'},
                        {name: '凉山乡党委'},


                    ],
                    [
                        {name: '狮山镇党委'},
                        {name: '高桥镇党委'},
                        {name: '猫街镇党委'},
                        {name: '插甸镇党委'},
                        {name: '白路镇党委'},
                        {name: '己衣镇党委'},
                        {name: '万德镇党委'},
                        {name: '田心乡党委'},
                        {name: '发窝乡党委'},
                        {name: '环州乡党委'},
                        {name: '东坡傣族乡'},

                    ],
                    [
                        {name: '金山镇党委'},
                        {name: '仁兴镇党委'},
                        {name: '碧城镇党委'},
                        {name: '勤丰镇党委'},
                        {name: '一平浪镇党委'},
                        {name: '广通镇党委'},
                        {name: '黑井镇党委'},
                        {name: '土官镇党委'},
                        {name: '罗川镇党委'},
                        {name: '和平镇党委'},
                        {name: '恐龙山镇党委'},
                        {name: '中村乡党委'},
                        {name: '高峰乡党委'},
                        {name: '妥安乡党委'},

                    ],
                ],
                dataSource2: [[
                    {name: '东瓜社区'},
                    {name: '永安社区'},
                    {name: '车坪社区'},
                    {name: '詹家社区'},
                    {name: '庄甸社区'},
                    {name: '刘家社区'},
                    {name: '永兴社区'},
                    {name: '邓官社区'},
                    {name: '桃园社区'},
                    {name: '览经社区'},

                ],
                    [
                        {name: '彝人古镇社区党总支', zuzhi: 15, dangyuan: 266},
                        {name: '览经社区党总支', zuzhi: 5, dangyuan: 61},
                        {name: '车坪社区党总支', zuzhi: 8, dangyuan: 152},
                        {name: '东瓜社区党总支', zuzhi: 12, dangyuan: 181},
                        {name: '邓官村委会党总支', zuzhi: 5, dangyuan: 49},
                        {name: '永安社区党总支', zuzhi: 5, dangyuan: 49},
                        {name: '龙河村委会党总支', zuzhi: 4, dangyuan: 117},
                        {name: '刘家社区党总支', zuzhi: 5, dangyuan: 90},
                        {name: '永兴社区党总支', zuzhi: 4, dangyuan: 87},
                        {name: '兴隆村委会党总支', zuzhi: 6, dangyuan: 118},
                       /* {name: '本东村委会党总支', zuzhi: 1, dangyuan: 1},*/
                        {name: '詹家社区党总支', zuzhi: 10, dangyuan: 119},
                        {name: '庄甸社区党总支', zuzhi: 6, dangyuan: 106},
                        {name: '桃园社区党总支', zuzhi: 8, dangyuan: 127}

                    ],

                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},

                    ],
                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},

                    ],
                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},
                    ],
                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},
                    ],
                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},
                    ],
                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},
                    ],
                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},
                    ],
                    [
                        {name: '紫溪社区党总支', zuzhi: 51, dangyuan: 667},
                        {name: '前进社区党总支', zuzhi: 7, dangyuan: 103},
                        {name: '紫金村党总支', zuzhi: 6, dangyuan: 66},
                        {name: '冷水村党总支', zuzhi: 4, dangyuan: 66},
                        {name: '云庆村党总支', zuzhi: 4, dangyuan: 57},
                        {name: '母掌村党总支', zuzhi: 5, dangyuan: 89},
                        {name: '岔河村党总支', zuzhi: 4, dangyuan: 57},
                        {name: '平掌村党总支', zuzhi: 3, dangyuan: 57},
                    ],
                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},
                    ],
                    [
                        {name: '东瓜社区3'},
                        {name: '永安社区3'},
                        {name: '车坪社区3'},
                        {name: '詹家社区3'},
                        {name: '庄甸社区3'},
                        {name: '刘家社区3'},
                        {name: '永兴社区3'},
                        {name: '邓官社区3'},
                        {name: '桃园社区3'},
                        {name: '览经社区3'},
                    ],
                    [
                        {name: '东瓜社区'},
                        {name: '永安社区'},
                        {name: '车坪社区'},
                        {name: '詹家社区'},
                        {name: '庄甸社区'},
                        {name: '刘家社区'},
                        {name: '永兴社区'},
                        {name: '邓官社区'},
                        {name: '桃园社区'},
                        {name: '览经社区'},
                    ],
                ],
                dataSource3: [
                    [
                        {name: '彝人古镇社区党支部', zuzhi: 1, dangyuan: 21},
                        {name: '星宿家园党支部', zuzhi: 1, dangyuan: 101},
                        {name: '彝人古镇社区流动党员党支部', zuzhi: 1, dangyuan: 98},
                    ],
                    [
                        {name: '第一党支部'},
                        {name: '第二党支部'},
                        {name: '第三党支部'},
                        {name: '第四党支部'},
                        {name: '第五党支部'},
                        {name: '第六党支部'},
                        {name: '第七党支部'},
                        {name: '第八党支部'},
                        {name: '第九党支部'},
                    ],
                    [
                        /*     {name: '金莲花非公经济联合党支部'},*/
                        {name: '车坪社区党总支第二支部', zuzhi: 1, dangyuan: 29},
                        {name: '车坪社区党总支第三支部', zuzhi: 1, dangyuan: 26},
                        {name: '车坪社区党总支张邓党小组', zuzhi: 1, dangyuan: 1},
                        {name: '车坪社区党总支第一党支部', zuzhi: 1, dangyuan: 53},
                        /*       {name: '车坪社区第三党支部'},
                               {name: '车坪社区第二党支部'},*/
                    ],
                    [
                        {name: '第一党支部'},
                        {name: '第二党支部'},
                        {name: '第三党支部'},
                        {name: '第四党支部'},
                        {name: '第五党支部'},
                        {name: '第六党支部'},
                        {name: '第七党支部'},
                        {name: '第八党支部'},
                        {name: '第九党支部'},
                    ],
                    [
                        {name: '第一党支部'},
                        {name: '第二党支部'},
                        {name: '第三党支部'},
                        {name: '第四党支部'},
                        {name: '第五党支部'},
                        {name: '第六党支部'},
                        {name: '第七党支部'},
                        {name: '第八党支部'},
                        {name: '第九党支部'},
                    ],
                    [
                        {name: '火车北站'},
                        {name: '盛家'},
                        {name: '云南开关厂'},
                        {name: '天人中学'},
                        {name: '市医院'},
                        {name: '车坪屯'},
                        {name: '金时代华庭'},
                    ]
                ],
                source1: [],
                source2: [],
                source3: [],
                showData: [],
                zxzbData: [],//中心坐标数据
                markerData: {
                    keyArea: []
                },
                markerBox: {
                    keyArea: []
                },
                flyOption: {
                    center: [101.4378613585036, 25.22803040580237],
                    zoom: 9.075275623016852,
                    bearing: 64.06271162427151,
                    pitch: 60,
                    speed: 0.8
                },
                //6级彝人古镇社区下点击中心飞数据
                SixdataYiRen: [
                    {"lnglat": [101.5166484534588, 25.052643543578796], "didian": "彝人古镇社区党支部"},
                    {"lnglat": [101.51693473137288, 25.05440513212058], "didian": "星宿家园党支部"},
                    {"lnglat": [101.5172554302249, 25.05628019510796], "didian": "彝人古镇社区流动党员党支部"},
                    /*       {"lnglat": [101.5077237851495, 25.067654852234995], "didian": "星宿家园党支部"},*/
                    /*      {"lnglat": [101.52141687162714,25.058218459607176], "didian": "彝家公社民族文化发展有限公司党支部"},*/
                    /* {"lnglat": [101.52032206284741,25.059743422475947], "didian": "彝人古镇大酒店党支部"},*/
                    /*   {"lnglat": [101.52172245856093,25.059123097731685], "didian": "季连投资有限公司党支部"},*/
                    // {"lnglat": [101.52153814099955,25.058658338656898], "didian": "彝人古镇社区流动党员党支部"},
                    // /*          {"lnglat": [101.51296367417456, 25.094282728415934], "didian": "电力工程商业行业联合党支部"},*/
                    // {"lnglat": [101.52154849972192,25.058580308445812], "didian": "房地产建筑装饰行业联合党支部"},
                    // {"lnglat": [101.52037634588311,25.05988195578216], "didian": "广告科技投资行业联合党支部"},
                    // {"lnglat": [101.51891166523598,25.0613964617217], "didian": "农林生物行业联合党支部"},
                    // {"lnglat": [101.52482240578928,25.065947987916587], "didian": "天然石信息咨询服务行业联合党支部"},
                    /*       {"lnglat": [101.58637647702432, 25.082466508460186], "didian": "文化刺绣行业联合党支部"},*/
                    /* {"lnglat": [101.51891166523598,25.0613964617217], "didian": "金莲花非公经济联合党支部"},*/
                    {"lnglat": [101.52482240578928, 25.065947987916587], "didian": "车坪社区党总支第二支部"},
                    {"lnglat": [101.52755836563853, 25.062875717178372], "didian": "车坪社区党总支第三支部"},
                    {"lnglat": [101.53257490130898, 25.05381826669732], "didian": "车坪社区党总支张邓党小组"},
                    {"lnglat": [101.53789860245433, 25.051372834487935], "didian": "车坪社区党总支第一党支部"},
                    /*     {"lnglat": [101.52482240578928,25.065947987916587], "didian": "车坪社区第三党支部"},
                         {"lnglat": [101.52482240578928,25.065947987916587], "didian": "车坪社区第二党支部"},*/
                ]
            }
        },
        components: {
            MapListBtn,
            ZhengzhijiansheRight,
            ZhengzhijiansheLeft,
            LeftDaoHang,
        },
        mixins: [vueMarkerMixin],
        beforeDestroy() {
            this.removeMarker(this.marker);
            this.flyBackAll();
            this.isWangGeDelete("grid2")
            this.removeBorderLayer();
            this.removeMarker(this.markerBox)
        },
        mounted() {
            this.map.flyTo(this.flyOption)
            this.WangGeName();
            /*  this.map = this.$store.state.baseMap;*/
            this.grid2();
            this.setChongXiongShi(this.dataChuXiongCenter);
            this.setYiJiXian(this.dataZM);
            this.listBtn(0)
            this.addKeyAreaMarker()
            //  二级
        },
        created() {
            /* this.createIcon();*/
            this.leftcomponent = ZhengzhijiansheLeft;
            this.rightcomponent = ZhengzhijiansheRight;

        },
        computed: {
            map: function () {
                return this.$store.state.baseMap
            }
        },
        methods: {
            flyBackAll() {
                this.map.flyTo({
                    center: [101.56397377179877, 25.29588056960378],
                    zoom: 8,
                    bearing: 0,
                    pitch: 0,
                    speed: 1.04,
                });

                this.isWangGeDelete("grid3");
                this.isWangGeDelete("grid4");
                this.isWangGeDelete("grid5");
                this.isWangGeDelete("grid6");
                this.isWangGeDelete("grid6_line")

            },
            //删除网格先判断网格是否存在
            isWangGeDelete(e) {
                if (this.map.getLayer(e)) {
                    this.map.removeLayer(e)
                    this.map.removeSource(e)
                } else {
                    return
                }
            },
            //添加网格先判断网格是否存在
            isAddGrid2() {
                if (this.map.getLayer('grid2')) {
                    return
                } else {
                    this.grid2()
                }
            },
            isAddGrid3() {
                if (this.map.getLayer('grid3')) {
                    return
                } else {
                    this.grid7()
                    this.getZxdzb()
                    this.grid3()
                }
            },
            isAddGrid3_1() {
                if (this.map.getLayer('grid3_1')) {
                    return
                } else {
                    this.grid7()
                    this.getZxdzb()
                    this.grid3_1()
                }
            },
            isAddGrid4() {
                if (this.map.getLayer('grid4')) {
                    return
                } else {
                    this.grid4()
                }
            },
            /*   isAddErJiBianJie() {
                   if (this.map.getLayer('ErJiBianJie')) {
                       return
                   } else {
                       this.ErJiBianJie()
                   }
               },*/
            isAddGrid5(index) {
                if (this.map.getLayer('grid5')) {
                    return
                } else {
                    this.grid5(index)
                }
            },
            isAddGrid6(index) {
                if (this.map.getLayer('grid6')) {
                    return
                } else {
                    this.grid6(index)
                }
            },
            isAddGrid2_1() {
                if (this.map.getLayer('grid2_1')) {
                    return
                } else {
                    this.grid2_1()
                }
            },
            isAddGrid4_1() {
                if (this.map.getLayer('grid4_1')) {
                    return
                } else {
                    this.grid4_1()
                }
            },
            //网格名字
            WangGeName() {
                if (this.CengJi === 1) {
                    this.btnData[0].name = "二级网格"
                    return
                }
                if (this.CengJi === 2) {
                    this.btnData[0].name = "三级网格"
                    return;
                }
                if (this.CengJi === 3) {
                    this.btnData[0].name = "四级网格"
                    return;
                }
            },
            //第二层镇委视角移动
            fly2(index) {
                let item = this.dataCXSZ[index];
                this.map.flyTo({
                    center: item.lnglat,
                    zoom: 12.926369422859146,
                    bearing: 9,
                    pitch: 40,
                    speed: 1.04,
                });
                this.CengJi = 3;

                this.isAddGrid4();

                this.isWangGeDelete("grid2_1")
                this.isWangGeDelete("grid3_1")
                this.isWangGeDelete("grid4_1")
                this.isWangGeDelete("grid3")
                this.isWangGeDelete("grid2")
                this.isWangGeDelete("grid5")
                this.isWangGeDelete("grid6")
                this.isWangGeDelete("grid6_line")
                this.removeMarker(this.marker);
                this.removeMarker(this.markerBox)
                this.WangGeName();
                this.setDongGuaZhenDianJi(this.dataErJiZhenCenter)

                this.setJieDaoCenter(this.dataJieDao)


            },
            //第三层社区的视角移动
            fly3(index) {
                let item = this.dataJieDao[index];
                this.map.flyTo({
                    center: item.lnglat,
                    zoom: 14.474613829379576,
                    bearing: 0.997137790434863,
                    pitch: 47.000000000000014,
                    speed: 1.04,
                });
                this.CengJi = 4;

                this.isWangGeDelete("grid2")
                this.isWangGeDelete("grid3")
                this.isWangGeDelete("grid4")
                this.isWangGeDelete("grid5")
                this.isWangGeDelete("grid6")
                this.isWangGeDelete("grid6_line")
                this.isWangGeDelete("grid2_1")
                this.isWangGeDelete("grid4_1")
                this.WangGeName();
                this.removeMarker(this.marker);
                this.isAddGrid5(index);

                if (index == 0) {
                    this.removeMarker(this.marker)
                    this.setChongXiongShi(this.dataSiJiCenterOneYiren)
                    this.setQiYe(this.dataSiqiyeYiren);
                    this.setJiGuan(this.dataSiJiGuanYiren);
                    this.setShiYeDanWei(this.dataSiShiYeYiren);
                    this.setXueXiao(this.dataSiXueXiaoYiren)
                } else if (index == 2) {
                    this.removeMarker(this.marker)
                    this.setChongXiongShi([this.dataSiJiCenterOne[index]])
                    this.setQiYe(this.dataSiqiyeChePin);
                    /*     this.setJiGuan(this.dataSiJiGuanYiren);
                         this.setShiYeDanWei(this.dataSiShiYeYiren);
                         this.setXueXiao(this.dataSiXueXiaoYiren)*/
                } else if (index == 3) {
                    this.removeMarker(this.marker)
                    this.setChongXiongShi([this.dataSiJiCenterOne[index]])
                    this.setQiYe(this.dataSiqiye);
                    this.setJiGuan(this.dataSiJiGuan);
                    this.setShiYeDanWei(this.dataSiShiYe);
                    this.setXueXiao(this.dataSiXueXiao)
                }


            },
            //第四层党支部的视角移动
            fly4(index) {
                let item = [];
                if (this.Grid5Index == 0) {
                    item = this.SixdataYiRen[index];
                } else if (this.Grid5Index == 2) {
                    item = this.SixdataYiRen[index + 3];
                }
                this.map.flyTo({
                    center: item.lnglat,
                    zoom: 15.953619318366153,
                    bearing: 17.999999999999886,
                    pitch: 47.000000000000014,
                    speed: 1.04,
                });
                this.isWangGeDelete("grid6_line")
                this.isWangGeDelete("grid6")
                this.isWangGeDelete("grid2")
                this.isWangGeDelete("grid3")
                this.isWangGeDelete("grid2_1")
                this.isWangGeDelete("grid4_1")
                this.isWangGeDelete("grid5")
                this.isWangGeDelete("grid4");
                this.isAddGrid6(index);
                this.CengJi = 5;
                this.WangGeName();
                this.removeMarker(this.marker);


                let dataSixBigCenterIndex = index;
                if (this.Grid5Index == 2) {
                    dataSixBigCenterIndex += 3;
                }

                this.removeMarker(this.marker)
                this.setChongXiongShi([this.dataSixBigCenter[dataSixBigCenterIndex]])
                this.setSixDianJianPop([this.dataSixBigCenter[dataSixBigCenterIndex]])

            },
            //第一层楚雄市到县视角移动
            fly(index) {
                let item = this.dataERjiCenter[index - 1];
                this.map.flyTo({
                    center: item.lnglat,
                    zoom: 10.236066429327346,
                    bearing: 9,
                    pitch: 40,
                    speed: 1.04,
                });
                this.CengJi = 2;
                this.isWangGeDelete("grid2_1")
                this.isWangGeDelete("grid4_1")
                this.isWangGeDelete("grid2");
                this.isWangGeDelete("grid4");
                this.isWangGeDelete("grid5");
                this.isWangGeDelete("grid6_line")
                this.isAddGrid3();


                this.removeMarker(this.marker);
                if (this.CengJi === 1) {
                    for (let i = 0; i < this.markerBox.keyArea.length; i++) {
                        let item = this.markerBox.keyArea[i];
                        item.setLngLat(this.markerData.keyArea[i].lnglat);
                    }
                    this.addVueMarker(this.markerBox.keyArea, this.$store.state.baseMap)
                } else if (this.CengJi === 2) {
                    for (let i = 0; i < this.markerBox.keyArea.length; i++) {
                        let item = this.markerBox.keyArea[i];
                        item.setLngLat(this.markerData.keyArea[i].lnglattwo)
                    }
                    this.addVueMarker(this.markerBox.keyArea, this.$store.state.baseMap)
                } else {
                    this.removeMarker(this.markerBox)
                }

                this.WangGeName();
                this.setChongXiongShi(this.dataChuXiongCenter);
                this.setYiJiXian(this.dataCXSZ);

            },
            flyBack() {
                this.map.flyTo({
                    center: [101.4378613585036, 25.22803040580237],
                    zoom: 9.075275623016852,
                    bearing: 64.06271162427151,
                    pitch: 60,
                    speed: 1.04,
                });
                this.isWangGeDelete("grid3_1");
                this.isWangGeDelete("grid3");
                this.isWangGeDelete("grid4");
                this.isWangGeDelete("grid5");
                this.isWangGeDelete("grid6");
                this.isWangGeDelete("grid6_line")

                this.isAddGrid2()
                this.CengJi = 1;
                this.WangGeName();
                this.removeMarker(this.marker);
                this.setChongXiongShi(this.dataChuXiongCenter);
                this.setYiJiXian(this.dataZM);
                this.addVueMarker(this.markerBox.keyArea, this.$store.state.baseMap)
            },
            //****************************************************************************一级
            //一级网格一级县
            setYiJiXian(e) {
                this.marker.YiJianXian = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e;
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item.lnglat,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: YiJianXian
                    }
                    this.marker.YiJianXian.push(this.makeVueMarker(option))
                }
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.YiJianXian, map);
            },
            //一级楚雄市
            setChongXiongShi(e) {
                this.marker.ChongXiongShiTuMarker = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e;
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item.lnglat,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: ChongXiongShiTuMarker
                    }
                    this.marker.ChongXiongShiTuMarker.push(this.makeVueMarker(option))
                }
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ChongXiongShiTuMarker, map);
            },
            //一级企业党组织
            setQiYe(e) {
                this.marker.QiYeDangZuZhiMarker = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: QiYeDangZuZhiMarker
                    }
                    this.marker.QiYeDangZuZhiMarker.push(this.makeVueMarker(option))
                }
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.QiYeDangZuZhiMarker, map);
            },
            //一级机关党组织
            setJiGuan(e) {
                this.marker.JiGuanDangMarker = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e;
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: JiGuanDangMarker
                    }
                    this.marker.JiGuanDangMarker.push(this.makeVueMarker(option))
                }
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.JiGuanDangMarker, map);
            },
            //一级事业单位党组织
            setShiYeDanWei(e) {
                this.marker.ShiYeDanWeiMarker = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e;
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: ShiYeDanWeiMarker
                    }
                    this.marker.ShiYeDanWeiMarker.push(this.makeVueMarker(option))
                }
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.ShiYeDanWeiMarker, map);
            },
            //学校党组织
            setXueXiao(e) {
                this.marker.XueXiaoDangMarker = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: XueXiaoDangMarker
                    }

                    this.marker.XueXiaoDangMarker.push(this.makeVueMarker(option))
                }
                let map = this.$store.state.baseMap;
                this.addVueMarker(this.marker.XueXiaoDangMarker, map);
            },
            //点击镇呈现的网格中的社区图标点击
            setJieDaoCenter(e) {
                this.marker.JieDaoCenter = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e;
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item.lnglat,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: JieDaoCenter
                    }
                    this.marker.JieDaoCenter.push(this.makeVueMarker(option))
                    let map = this.$store.state.baseMap;
                    this.addVueMarker(this.marker.JieDaoCenter, map);
                }
            },
            //六级图标
            setSixTu(e,SixWanGeMaker) {
                this.marker.SixWanGeMaker = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e;
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item.lnglat,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: SixWanGeMaker
                    }
                    this.marker.SixWanGeMaker.push(this.makeVueMarker(option))
                    let map = this.$store.state.baseMap;
                    this.addVueMarker(this.marker.SixWanGeMaker, map);
                }
            },
            //东瓜镇图标点击
            setDongGuaZhenDianJi(e) {
                this.marker.DongGuaDianJiMarker = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e;
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item.lnglat,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: DongGuaDianJiMarker
                    }
                    this.marker.DongGuaDianJiMarker.push(this.makeVueMarker(option))
                    let map = this.$store.state.baseMap;
                    this.addVueMarker(this.marker.DongGuaDianJiMarker, map);
                }
            },
            //6级图标点击弹窗
            setSixDianJianPop(e) {
                this.marker.SixCengDianJiMarker = [];
                let _vue = this;
                let path = this.$route.path;
                this.data = e;
                for (let i in this.data) {
                    let item = this.data[i];
                    let option = {
                        lnglat: item.lnglat,
                        props: {'d': item, 'path': path, '_vue': _vue},
                        vuecp: SixCengDianJiMarker
                    }
                    this.marker.SixCengDianJiMarker.push(this.makeVueMarker(option))
                    let map = this.$store.state.baseMap;
                    this.addVueMarker(this.marker.SixCengDianJiMarker, map);
                }
            },
            listBtn(index) {
                if (this.CengJi === 1) {
                    if (index == 0) {
                        if (!this.btnData[0].isChecked) {
                            this.isAddGrid2_1()
                        } else {
                            this.isWangGeDelete("grid2_1")
                        }
                    } else if (index == 1) {
                        if (!this.btnData[1].isChecked) {
                            this.setQiYe(this.dataQiYe);

                        } else {
                            this.removeMarker(this.marker.QiYeDangZuZhiMarker);
                        }
                    } else if (index == 2) {
                        if (!this.btnData[2].isChecked) {
                            this.setJiGuan(this.dataJiGuan);

                        } else {
                            this.removeMarker(this.marker.JiGuanDangMarker);
                        }
                    } else if (index == 3) {
                        if (!this.btnData[3].isChecked) {
                            this.setShiYeDanWei(this.dataShiYeDaWei);

                        } else {
                            this.removeMarker(this.marker.ShiYeDanWeiMarker);
                        }
                    } else if (index == 4) {
                        if (!this.btnData[4].isChecked) {
                            this.setXueXiao(this.dataXueXiao);

                        } else {
                            this.removeMarker(this.marker.XueXiaoDangMarker);
                        }
                    }
                    this.btnData[index].isChecked = !this.btnData[index].isChecked

                }
                if (this.CengJi == 2) {

                    if (index == 0) {
                        if (!this.btnData[0].isChecked) {
                            this.isAddGrid3_1()

                        } else {
                            this.isWangGeDelete("grid3_1")
                        }
                    } else if (index == 1) {
                        if (!this.btnData[1].isChecked) {
                            this.setQiYe(this.dataERqiye);

                        } else {
                            this.removeMarker(this.marker.QiYeDangZuZhiMarker);
                        }
                    } else if (index == 2) {
                        if (!this.btnData[2].isChecked) {
                            this.setJiGuan(this.dataERJiGuan);

                        } else {
                            this.removeMarker(this.marker.JiGuanDangMarker);
                        }
                    } else if (index == 3) {
                        if (!this.btnData[3].isChecked) {
                            this.setShiYeDanWei(this.dataERShiYe);

                        } else {
                            this.removeMarker(this.marker.ShiYeDanWeiMarker);
                        }
                    } else if (index == 4) {
                        if (!this.btnData[4].isChecked) {
                            this.setXueXiao(this.dataERXueXiao);

                        } else {
                            this.removeMarker(this.marker.XueXiaoDangMarker);
                        }
                    }
                    this.btnData[index].isChecked = !this.btnData[index].isChecked
                }
                if (this.CengJi === 3) {

                    if (index == 0) {
                        if (!this.btnData[0].isChecked) {
                            this.isAddGrid4_1()
                        } else {
                            this.isWangGeDelete("grid4_1")
                        }
                    } else if (index == 1) {
                        if (!this.btnData[1].isChecked) {
                            this.setQiYe(this.dataSanqiye);

                        } else {
                            this.removeMarker(this.marker.QiYeDangZuZhiMarker);
                        }
                    } else if (index == 2) {
                        if (!this.btnData[2].isChecked) {
                            this.setJiGuan(this.dataSanJiGuan);

                        } else {
                            this.removeMarker(this.marker.JiGuanDangMarker);
                        }
                    } else if (index == 3) {
                        if (!this.btnData[3].isChecked) {
                            this.setShiYeDanWei(this.dataSanShiYe);

                        } else {
                            this.removeMarker(this.marker.ShiYeDanWeiMarker);
                        }
                    } else if (index == 4) {
                        if (!this.btnData[4].isChecked) {
                            this.setXueXiao(this.dataSanXueXiao);

                        } else {
                            this.removeMarker(this.marker.XueXiaoDangMarker);
                        }
                    }
                    this.btnData[index].isChecked = !this.btnData[index].isChecked
                }

            },
            handleChange(value, selectedData) {
                this.text = selectedData.map(o => o.label).join(', ');
            },
            //楚雄州网格一级，第一层地图
            grid2() {
                this.addBorderLayer(grid1)
                const grid2Features = grid2.map(d => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [d]
                        }
                    }
                });
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
                        'fill-color': 'rgba(254, 5, 5, 0.06)'
                    }
                })
            },
            grid2_1() {
                const grid2_1Features = grid2.map(d => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [d]
                        }
                    }
                });
                this.map.addLayer({
                    id: 'grid2_1',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid2_1Features
                        }
                    },
                    paint: {
                        'line-width': 4,
                        'line-color': 'rgba(255, 213, 213, 0.2)'
                    }
                })
            },
            //点击镇委下呈现的具体网格
            //四级**************************************************************
            grid4() {
                const grid4Features = grid4.map(d => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [d.points]
                        }
                    }
                })
                this.map.addLayer({
                    id: 'grid4',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid4Features,
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(254, 5, 5, 0.06)',
                        'fill-outline-color': '#B94A46'
                    }
                })
            },
            grid4_1() {

                const grid4Features = grid4.map(d => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [d.points]
                        }
                    }
                })
                this.map.addLayer({
                    id: 'grid4_1',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid4Features,
                        }
                    },
                    paint: {
                        'line-color': 'rgba(254, 5, 5, 0.5)'
                    }
                })
            },
            //点击社区呈现具体地图
            //5级**************************************************************
            grid5(index) {
                this.Grid5Index = index;
                let num = [];
                for (let i = 0; i < grid4.length; i++) {
                    num.push(grid4[i].id);
                }
                let grid5Features = [];
                for (let i in grid5) {
                    if (grid5[i].pid === num[index]) {

                        grid5Features.push({
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [grid5[i].points]
                            }
                        });
                    }
                }
                this.map.addLayer({
                    id: 'grid5',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid5Features,
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(254, 5, 5, 0.06)',
                        'fill-outline-color': '#B94A46'
                    }
                })

            },
            //点击党支部呈现的地图 6级
            grid6(index) {
                let num = [];
                for (let i = 0; i < grid5.length; i++) {
                    num.push(grid5[i].id);
                }
                let grid6Features = [];
                let grid6Features_line = [];

                if (this.Grid5Index == 2) {
                    index += 8;
                }
                for (let i in grid6) {
                    if (grid6[i].pid === num[index]) {

                        grid6Features.push({
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [grid6[i].points]
                            }
                        });
                        grid6Features_line.push({
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: grid6[i].points
                            }
                        });
                    }

                }
                this.map.addLayer({
                    id: 'grid6',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid6Features,
                        }
                    },
                    paint: {
                        'fill-color': 'rgba(254, 5, 5, 0.1)',

                    }
                });
                this.map.addLayer({
                    id: 'grid6_line',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: grid6Features_line,
                        }
                    },
                    paint: {
                        'line-color': '#B94A46',
                        'line-width': 2,
                    }
                })
            },
            //控制级联导航
            changeType(index, item, level) {
                this.currentLevel = level + 1;
                this.$nextTick(() => {
                    if (this.currentLevel === 4) {
                        /*this.currentLevel =0*/
                        return
                    }
                    this.btnData.map(item => item.isChecked = false)
                    this.$refs['LeftDaoHang' + this.currentLevel].current = -1;
                    this.$set(this, 'source' + this.currentLevel, this['dataSource' + this.currentLevel][index]);
                })
                if (level == 0) {
                    this.showData = [];
                    /* this.CenterName = item.name*/
                    if (index == 0) {
                        this.currentLevel = 0;
                        this.flyBack();
                    } else if (index == index) {
                        this.fly(index);
                    }
                } else if (level == 1) {
                    this.fly2(index)
                } else if (level == 2) {
                    this.fly3(index)
                } else if (level == 3) {
                    this.fly4(index)
                }

                if (this.showData[level]) {
                    this.showData.splice(level, this.showData.length - level);
                }
                this.showData.push(item.name);
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
            //三级网格所需，暂时名字
            grid7() {
                var flag = 1;
                var point = {lat: 25.131977490786454, lng: 101.53325778647172};
                for (let i = 0; i < grid2.length; i++) {
                    var list = grid2[i];
                    var result = this.isptinpoly(point, list);
                    if (result == true) {
                        flag++;
                        if (!this.map.getLayer("grid2") && flag != 2) {
                            this.ShiGrid = list;

                        }
                    }
                }

            },
            //三级网格，点击市县委呈现的网格
            grid3() {
                var ShiGrid = this.ShiGrid;
                var i = 0;
                var zxzzbData = this.zxzbData;
                var XZPoint = [];
                const grid3Features = grid3.map(d => {
                    var point = {lat: zxzzbData[i].point[1], lng: zxzzbData[i].point[0]}
                    var result = this.isptinpoly(point, ShiGrid);
                    if (result == true) {
                        XZPoint.push(point);
                        var obj = {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [zxzzbData[i].grid]
                            }
                        }
                        i++;
                        return obj;
                    }
                    i++;
                })

                this.XZPoint = XZPoint;

                var arr = []
                for (let j = 0; j < grid3Features.length; j++) {
                    if (grid3Features[j] != undefined) {
                        arr.push(grid3Features[j])
                    }
                }
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
                        'fill-color': 'rgba(254, 5, 5, 0.2)'
                    }
                })
                this.map.on('click', 'grid3', (e) => {
                    //console.log(e);
                    //this.sanjiTanchuang = true;
                })
            },
            grid3_1() {
                var ShiGrid = this.ShiGrid;
                var i = 0;
                var zxzzbData = this.zxzbData;
                var XZPoint = [];
                const grid3Features = grid3.map(d => {
                    var point = {lat: zxzzbData[i].point[1], lng: zxzzbData[i].point[0]}
                    var result = this.isptinpoly(point, ShiGrid);
                    if (result == true) {
                        XZPoint.push(point);
                        var obj = {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [zxzzbData[i].grid]
                            }
                        }
                        i++;
                        return obj;
                    }
                    i++;
                })
                this.XZPoint = XZPoint;
                var arr = []
                for (let j = 0; j < grid3Features.length; j++) {
                    if (grid3Features[j] != undefined) {
                        arr.push(grid3Features[j])
                    }
                }

                this.map.addLayer({
                    id: 'grid3_1',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: arr
                        }
                    },
                    paint: {
                        'line-color': 'rgba(254, 5, 5, 0.5)'
                    }
                })
                this.map.on('click', 'grid3', (e) => {
                    //console.log(e);
                    //this.sanjiTanchuang = true;
                })
            },
            //计算目标数组的中心点坐标
            calcCenterCrd(crdList) {
                let total = crdList.length;
                let X = 0, Y = 0, Z = 0;
                for (let i in crdList) {
                    let lat, lng, x, y, z, item = crdList[i];
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
                let tempLng = Math.atan2(Y, X);
                let Hyp = Math.sqrt(X * X + Y * Y);
                let tempLat = Math.atan2(Z, Hyp);
                return [tempLng * 180 / Math.PI, tempLat * 180 / Math.PI];
            },
            //获取所有的中心点坐标
            getZxdzb() {
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
            //添加三个特殊区域扎点
            addKeyAreaMarker() {
                this.axios({
                    url: window.baseURL + '/cxKeyArea'
                }).then(d => {
                    this.markerData.keyArea = d.data;
                    for (let i in this.markerData.keyArea) {
                        let options = {
                            lnglat: this.CengJi === 1 ? this.markerData.keyArea[i].lnglat : this.markerData.keyArea[i].lnglattwo,
                            vuecp: keyArea,
                            props: {
                                d: this.markerData.keyArea[i],
                            }
                        }

                        this.markerBox.keyArea.push(this.makeVueMarker(options))
                    }
                    try {
                        this.addVueMarker(this.markerBox.keyArea, this.$store.state.baseMap)
                    } catch (err) {
                        console.log(err);
                    }

                })
            },
            //添加外边框layer
            addBorderLayer(crdlist) {
                this.removeBorderLayer()
                this.map.addLayer({
                    "id": "BorderLine-1",
                    "type": "line",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": crdlist
                            }
                        }
                    },
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "#B94A46",
                        "line-width": 12
                    }
                })
                this.map.addLayer({
                    "id": "BorderLine-2",
                    "type": "line",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                                "type": "LineString",
                                "coordinates": crdlist
                            }
                        }
                    },
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": "#FFFFFF",
                        "line-width": 2
                    }
                })
            },
            removeBorderLayer() {
                if (this.map.getLayer('BorderLine-1')) {
                    this.map.removeLayer('BorderLine-1');
                    this.map.removeSource('BorderLine-1');
                    this.map.removeLayer('BorderLine-2');
                    this.map.removeSource('BorderLine-2');
                }
            },

        }
    }
</script>

<style scoped lang="scss">
    .zu-zhi-jian-she {
        width: 3840px;
        height: 1023px;
    }

    .svg {
        position: absolute;
        top: 95px;
        left: 645px;
    }

    .DaoHangTOP {
        position: absolute;
        left: 688px;
        top: 110px;
        text-shadow: 1px 1px 15px #F70028, -1px -1px 15px #F70028;
        font-size: 38px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
    }

    .bottomMiddle {
        position: absolute;
        bottom: 37px;
        left: 2300px;
        height: 90px;
        width: 600px;

        div {
            span {
                margin-right: 15px;
                font-size: 22px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(254, 255, 254, 1);

                img {
                    position: relative;
                    top: 5px;
                }
            }
        }
    }

    .page-header {
        background: url("../assets/common/images/ZuZhiJianShe/bg_zzjs_Middle@2x.png") no-repeat center center;
        background-size: 100% 100%;
        width: 964px;
        height: 146px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 112px;
    }

    .page-header-item {
        text-align: center;
        flex: 1;

        span {
            font-size: 14px;
            color: rgba(255, 255, 255, .7);;
            -webkit-text-stroke: 0px rgba(255, 255, 255, 1);
            text-stroke: 0px rgba(255, 255, 255, 1);
        }
    }

    .page-header-item > div:first-child {
        font-size: 22px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);

        img {
            margin-right: 5px;
        }
    }

    .page-header-item > div:nth-child(2) {
        margin-top: -10px;
        font-size: 42px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 173, 100, 1);
        text-shadow: 2px 0 2px rgba(87, 32, 17, 1), 0 -2px 2px rgba(87, 32, 17, 1), -2px 0 2px rgba(87, 32, 17, 1), 0 2px 2px rgba(87, 32, 17, 1);

    }

    .page-header-item > div:last-child {
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
        margin-bottom: 10px;
    }

    .nav {
        display: flex;
        position: absolute;
        top: 172px;
        left: 615px;
        background: linear-gradient(135deg, rgba(31, 49, 72, .3) 0%, rgba(47, 72, 105, .3) 100%);
        border: 6px solid rgba(83, 124, 139, 0.3);
        border-radius: 4px;
        z-index: 1;
    }

    .defaultTwo {
        width: 240px;
        overflow: hidden;
        display: flex;
    }

    .hoverHid:hover {
        background: linear-gradient(135deg, rgba(31, 49, 72, .7) 0%, rgba(47, 72, 105, .7) 100%);

        .defaultTwo {
            width: auto;
        }
    }

</style>
