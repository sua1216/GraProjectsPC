<template>
    <div class="headnav" v-show="showHeader">
        <div v-if="!TopStyle" class="dgz">东瓜镇</div>
        <div class="left">
<!--            <div class="bktoWelcome" @click="$router.push('/welcome')"></div>-->
        </div>
        <div class="center" v-show="navOpenOrClose<0&&!isInWelcome&&!isJuhe&&TopStyle">
            <div class="btn-list" @click="openNav" :style="'background:url('+btnimg+') no-repeat center'"></div>
            <div class="head-title">{{renderdata[dataOnLevel1]&&renderdata[dataOnLevel1].largeName}}</div>
            <div class="labels">
                <div class="label" v-for="(val,key) in renderdata[dataOnLevel1]&&renderdata[dataOnLevel1].labels"
                     v-bind:key="'labels'+key" @click="changePos1" :to="val.url"
                     :class="[{'label-on':val.url.includes(dataOnLevel2)},navStyleForDJYL&&val.url.includes(dataOnLevel2)?'navStyleForDJYL':'']">
                    {{val.name}}
                </div>
            </div>
        </div>
        <div class="center-tit" v-show="navOpenOrClose>=0">
            <div class="btn-list" @click="openNav" :style="'background:url('+btnimg+') no-repeat center'"></div>
            <div class="head-title">{{renderdata[dataOnLevel1]&&renderdata[dataOnLevel1].headTitle}}</div>
        </div>
        <div class="right" v-if="!isJuhe">
            <div class="header-weather">
                <dateWeather></dateWeather>
            </div>
            <!--			<div class="header-right-switch" @click="showbignavs=!showbignavs" v-show="!isInWelcome&&!isJuhe">-->
            <!--				<img src="../../../assets/common/images/navimg/icon_system.png">-->
            <!--				<span class="btn_outer_glow"></span>-->
            <!--			</div>-->
<!--            <div class="change-password-btn" v-show="isStatusBtn">-->
<!--                <img :src="require('@image/icon_dl_zh.png')" @click="isStatusBox = !isStatusBox">-->
<!--                <div class="status-box" v-show="isStatusBox">-->
<!--                    <div>修改密码</div>-->
<!--                    <div @click="exitLogin">退出登陆</div>-->
<!--                </div>-->
<!--            </div>-->
        </div>

		<!--导航-->
        <div class="navBox" @click="navOpenOrClose=-140" :style="'transform:translateY('+navOpenOrClose+'%);'">
            <div class="nav-block" v-for="(val,key) in navBackgroundBox"
                 :style="{background:'url('+val.bg+') no-repeat center'}"
                 v-bind:key="'nav'+key" @mouseenter="navHover1=val.name" @mouseleave="navHover1=''">
<!--                <img :src="require('@image/navimg/bg_Highlight.png')">-->
                <div class="nav-holder">
					<div class="MyTitle">
						<div class="nav-icon" :style="{background:'url('+val.icon+') no-repeat center'}"></div>
						<div :class="['nav-tit',key==0?'nav-tit1':'',key==1?'nav-tit2':'']">{{renderdata[val.name].name}}</div>
					</div>

                    <div :class="'nav-box'+key">
                        <div class="links" v-for="(vl,key2) in renderdata[val.name].labels"
							 :style="{background:'url('+vl.bgi+') no-repeat center'}" v-bind:key="'links'+key2"
                             @click="changePos(key,key2,$event)" :to="vl.url" @mouseenter="hoverNav(key,key2,$event)" @mouseleave="resetHoverNav(vl,key,key2,$event)"
                             :class="{'links-on':navHover1===val.name&&navHover2===key2,
						'url-on':vl.url.includes(dataOnLevel1)&&vl.url.includes(dataOnLevel2)}">
<!--                            <span :to="vl.url" class="link-icon xb_icon" :class="vl.icon"></span>-->
                            <img :src="[key==0?img1:img2]" :class="['imgKuang',vl.imgKuang2?'':'imgKuang2']" alt="">
                            <img :src="vl.img" alt="" class="daohangImg">
                            <span :to="vl.url" class="link-name" :style="'color:'+vl.color">{{vl.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>





        <transition name="fade">
            <div v-if="showbignavs" style="position: absolute;z-index: 1000;width: 3840px;height: 1017px;">
                <div class="nav-header-btns">
                    <div class="header-right-btns animated fadeIn" style="">
                        <a href="/dsj_wjjkq_web/web/core/login/logout"
                           class="header-right-btn header-right-logOut">退出登录</a>
                        <a href="/dsj_wjjkq_web/admin/setting/index/index?u=1&amp;g=1"
                           class="header-right-btn header-right-setting">
                            <img style="vertical-align: text-bottom;height: 16px;"
                                 src="../../../assets/common/images/navimg/home_icon_top_setting.svg">系统设置</a>
                    </div>
                    <div class="header-right-switch ac" @click="showbignavs=!showbignavs">
                        <img src="../../../assets/common/images/navimg/icon_system.png">
                        <span class="btn_outer_glow"></span>
                    </div>
                </div>
			</div>
		</transition>
        <div class="header-right-switch" @click="navPage">
            <img :src="require('@image/icon_system.png')">
        </div>
        <NavSystemNav></NavSystemNav>
        <topCloud></topCloud>
	</div>
</template>


<script>
    import dateWeather from './dateWeather.vue'
    import Vivus from 'vivus'
    import NavSystemNav from '@c/common/NavSystemNav/NavSystemNav.vue'
    import topCloud from '@c/common/TopCloud/TopCloud.vue'

    export default {
        name: "index",
        components: {dateWeather,NavSystemNav,topCloud},
        props: ["TopStyle"],
        data: function () {
            return {
                navStyleForDJYL:false,//用来专门控制党建引领模块的导航的样式的变量

                isSystemNav:false,
                isStatusBtn: true,
                isStatusBox: false,
                showbignavs: false,
                btnimg: require('@image/navimg/btn_back.png'),
                smallNavStatus: '',
                renderdata: {
                    'djyl': {
                        headTitle: '楚雄州城市治理一图全面感知平台',
                        largeName: '城市治理云图·党建引领',
                        name: '党建引领',
                        labels: [
                            {
                                img:require("../../../../public/images/pen-square-re@2x1.png"),
                                name: '组织体系',
                                blockname: '首页',
                                icon: 'map-li',
                                url: '/djyl/zuzhijianshe',
								bgi:require("../../../../public/images/bg_dh_dj_s@2x.png"),
                                color:"rgba(254, 173, 147, 1)",
                                imgKuang2:false
                            },
                            {
                                img:require("../../../../public/images/podium-re@2x.png"),
                                name: '组织活动',
                                blockname: '首页',
                                icon: 'map-li',
                                url: '/djyl/zhengzhijianshe',
                                bgi:require("../../../../public/images/bg_dh_dj_s@2x.png"),
                                color:"rgba(254, 255, 255, 1)",
                                imgKuang2:false
                            },
//                            {
//                                img:require("../../../../public/images/podium-re@2x.png"),
//                                name: '社会服务',
//                                blockname: '首页',
//                                icon: 'map-li',
//                                url: '/#/',
//                                bgi:require("../../../../public/images/bg_dh_dj_s@2x.png")
//                            },
//                            {
//                                img:require("../../../../public/images/podium-re@2x.png"),
//                                name: '社会治理',
//                                blockname: '首页',
//                                icon: 'map-li',
//                                url: '/#/',
//                                bgi:require("../../../../public/images/bg_dh_dj_s@2x.png")
//                            }
                        ]
                    },
                    'shzl': {
                        headTitle: '楚雄州城市治理一图全面感知平台',
                        largeName: '城市治理云图·社会治理',
                        name: '社会治理',
                        labels: [
							{
                                img:require("../../../../public/images/vector-square-re@2x.png"),
								name: '网格建设',
								icon: 'laugh-li',
								url: '/shzl/wanggejianshe',
								bgi:require("../../../../public/images/bg_dh_sh_s@2x.png"),
                                color:"rgba(254, 255, 255, 1)",
                                imgKuang2:false
							},
							{
                                img:require("../../../../public/images/send-backward-re@2x.png"),
								name: '问题分析',
								icon: 'laugh-li',
								url: '/shzl/wentifenxi',
								bgi:require("../../../../public/images/bg_dh_sh_s@2x.png"),
                                color:"rgba(254, 255, 255, 1)",
                                imgKuang2:false
							}/*, {
                                img:require("../../../../public/images/street-view-re@2x.png"),
								name: '全社会参与',
								icon: 'laugh-li',
								url: '/shzl/quanshehuicanyu',
								bgi:require("../../../../public/images/bg_dh_sh_s@2x.png")
							}*/
						]
                    }
                },
                dataOnLevel1: null,
                dataOnLevel2: null,
                navOpenOrClose: -140,
                navBackgroundBox: [
                    {
                        bg: require('../../../../public/images/bg_dh_dj_l@2x.png'),
                        icon: require('../../../../public/images/icon_dh_dh@2x.png'),
                        name: 'djyl'
                    },
                    {
                        bg: require('../../../../public/images/bg_dh_dj_x@2x.png'),
                        icon: require('../../../../public/images/icon_dh_sh@2x.png'),
                        name: 'shzl'
                    },
                    // {
                    // 	bg:require('@image/navimg/bg3.png'),
                    // 	icon:require('@image/navimg/nav_icon_big_4.png'),
                    // 	name:'wanggejianshe'
                    // },
                    // {
                    // 	bg:require('@image/navimg/bg4.png'),
                    // 	icon:require('@image/navimg/nav_icon_big_5.png'),
                    // 	name:'wentifenxi'
                    // }
                ],
                navHover1: null,
                navHover2: null,
                lastHoverDom: null,
                isInWelcome: false,
                img1:require("../../../../public/images/bg_dh_xz1@2x.png"),
                img2:require("../../../../public/images/bg_dh_xz_2@2x.png"),
            }
        },
        computed: {
            showHeader() {
                //网格扎点和数字城管信息员扎点点击了过后头部消失
                return !this.$store.state.isGridMarker && !this.$store.state.isInfoMarker
            }
        },
        mounted: function () {
            window.homevue = this;

            var div = document.querySelector(".url-on");

            var url = window.location.href;
            if(url.indexOf("zuzhijianshe")>0){
                this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x1.png')
                this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')
                this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                this.renderdata.djyl.labels[0].color="rgba(254, 173, 147, 1)"
                this.renderdata.djyl.labels[1].color="rgba(254, 255, 255, 1)"
                this.renderdata.shzl.labels[0].color="rgba(255, 255, 255, 1)"
                this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                this.renderdata.djyl.labels[0].imgKuang2=true
                this.renderdata.djyl.labels[1].imgKuang2=false
                this.renderdata.shzl.labels[0].imgKuang2=false
                this.renderdata.shzl.labels[1].imgKuang2=false
            }else if(url.indexOf("zhengzhijianshe")>0){
                this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x1.png')
                this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')
                this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                this.renderdata.djyl.labels[0].color="rgba(254, 255, 255, 1)"
                this.renderdata.djyl.labels[1].color="rgba(254, 173, 147, 1)"
                this.renderdata.shzl.labels[0].color="rgba(255, 255, 255, 1)"
                this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                this.renderdata.djyl.labels[0].imgKuang2=false
                this.renderdata.djyl.labels[1].imgKuang2=true
                this.renderdata.shzl.labels[0].imgKuang2=false
                this.renderdata.shzl.labels[1].imgKuang2=false
            }else if(url.indexOf("wanggejianshe")>0){
                this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x1.png')
                this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                this.renderdata.djyl.labels[0].color="rgba(254, 255, 255, 1)"
                this.renderdata.djyl.labels[1].color="rgba(254, 255, 255, 1)"
                this.renderdata.shzl.labels[0].color="rgba(165, 237, 255, 1)"
                this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                this.renderdata.djyl.labels[0].imgKuang2=false
                this.renderdata.djyl.labels[1].imgKuang2=false
                this.renderdata.shzl.labels[0].imgKuang2=true
                this.renderdata.shzl.labels[1].imgKuang2=false
            }else if(url.indexOf("wentifenxi")>0){
                this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x1.png')
                this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')

                this.renderdata.djyl.labels[0].color="rgba(254, 255, 255, 1)"
                this.renderdata.djyl.labels[1].color="rgba(254, 255, 255, 1)"
                this.renderdata.shzl.labels[0].color="rgba(255, 255, 255, 1)"
                this.renderdata.shzl.labels[1].color="rgba(165, 237, 255, 1)"

                this.renderdata.djyl.labels[0].imgKuang2=false
                this.renderdata.djyl.labels[1].imgKuang2=false
                this.renderdata.shzl.labels[0].imgKuang2=false
                this.renderdata.shzl.labels[1].imgKuang2=true
            }
        },
        methods: {
            navPage(){
                this.$store.state.showPage = !this.$store.state.showPage
            },
            exitLogin() {
                this.isStatusBox = false;
                localStorage.removeItem('user');
                // this.axios({
                // 	url:'http://sy.bddeve.xbcx.com.cn/dsj_sy_show/admin/core/login/logout'
                // }).then(d =>{
                // 	console.log('退出登录',d)
                // });
                this.$router.push('/login')
            },
            hoverthis(id) {
                new Vivus(id, {
                    type: 'delayed',
                    duration: 70,
                    animTimingFunction: Vivus.EASE
                });
            },

            hoverNav(key1,key2,e) {
                //console.log(e)
                this.navHover2 = key2;
                if(key1==0&&key2==0){
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x1.png')
                    this.renderdata.djyl.labels[0].color="rgba(254, 173, 147, 1)"
                    this.renderdata.djyl.labels[0].imgKuang2=true
                }else if(key1==0&&key2==1){
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x1.png')
                    this.renderdata.djyl.labels[1].color="rgba(254, 173, 147, 1)"
                    this.renderdata.djyl.labels[1].imgKuang2=true
                }else if(key1==1&&key2==0){
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x1.png')
                    this.renderdata.shzl.labels[0].color="rgba(165, 237, 255, 1)"
                    this.renderdata.shzl.labels[0].imgKuang2=true
                }else if(key1==1&&key2==1){
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x1.png')
                    this.renderdata.shzl.labels[1].color="rgba(165, 237, 255, 1)"
                    this.renderdata.shzl.labels[1].imgKuang2=true
                }
            },
            resetHoverNav(vl,key1,key2,e) {
                //console.log(e.target.classList)
                var classList = e.target.classList;
                var flag=0;
                for(var i=0;i<classList.length;i++){
                    if(classList[i]=='url-on'){
                        flag++;
                    }
                }
                if(key1==0&&key2==0&&flag==0){
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                    this.renderdata.djyl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.djyl.labels[0].imgKuang2=false
                }else if(key1==0&&key2==1&&flag==0){
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                    this.renderdata.djyl.labels[1].color="rgba(255, 255, 255, 1)"
                    this.renderdata.djyl.labels[1].imgKuang2=false
                }else if(key1==1&&key2==0&&flag==0){
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')
                    this.renderdata.shzl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[0].imgKuang2=false
                }else if(key1==1&&key2==1&&flag==0){
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')
                    this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[1].imgKuang2=false
                }
                this.navHover2 = ''
            },
            changePos1(e) {
                let to = e.toElement.getAttribute('to');
                console.log(e);
                console.log(to);
                if (to) {
                    if (to.indexOf("http") != -1) {
                        window.open(to)
                    } else {
                        this.smallNavStatus = 'hide';
                        this.$router.push(to);
                    }
                }


                var text = e.target.innerText;
                if(text=="网格建设"){
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x1.png')
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                    this.renderdata.djyl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.djyl.labels[1].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[0].color="rgba(165, 237, 255, 1)"
                    this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                    this.renderdata.djyl.labels[0].imgKuang2=false
                    this.renderdata.djyl.labels[1].imgKuang2=false
                    this.renderdata.shzl.labels[0].imgKuang2=true
                    this.renderdata.shzl.labels[1].imgKuang2=false
                }else if(text=="问题分析"){
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x1.png')
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')

                    this.renderdata.djyl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.djyl.labels[1].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[1].color="rgba(165, 237, 255, 1)"

                    this.renderdata.djyl.labels[0].imgKuang2=false
                    this.renderdata.djyl.labels[1].imgKuang2=false
                    this.renderdata.shzl.labels[0].imgKuang2=false
                    this.renderdata.shzl.labels[1].imgKuang2=true
                }else if(text=="组织体系"){
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x1.png')
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                    this.renderdata.djyl.labels[0].color="rgba(255, 173, 147, 1)"
                    this.renderdata.djyl.labels[1].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                    this.renderdata.djyl.labels[0].imgKuang2=true
                    this.renderdata.djyl.labels[1].imgKuang2=false
                    this.renderdata.shzl.labels[0].imgKuang2=false
                    this.renderdata.shzl.labels[1].imgKuang2=false
                }else if(text=="组织活动"){
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x1.png')
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                    this.renderdata.djyl.labels[0].color="rgba(254, 255, 255, 1)"
                    this.renderdata.djyl.labels[1].color="rgba(255, 173, 147, 1)"
                    this.renderdata.shzl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                    this.renderdata.djyl.labels[0].imgKuang2=false
                    this.renderdata.djyl.labels[1].imgKuang2=true
                    this.renderdata.shzl.labels[0].imgKuang2=false
                    this.renderdata.shzl.labels[1].imgKuang2=false
                }
            },
            changePos(key1,key2,e) {
                let to = e.toElement.getAttribute('to');
                console.log(e);
                console.log(to);
                if (to) {
                    if (to.indexOf("http") != -1) {
                        window.open(to)
                    } else {
                        this.smallNavStatus = 'hide';
                        this.$router.push(to);
                    }
                }


                if(key1==0&&key2==0){
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x1.png')
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                    this.renderdata.djyl.labels[0].color="rgba(255, 173, 147, 1)"
                    this.renderdata.djyl.labels[1].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[0].color="rgba(254, 255, 255, 1)"
                    this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                    this.renderdata.djyl.labels[0].imgKuang2=true
                    this.renderdata.djyl.labels[1].imgKuang2=false
                    this.renderdata.shzl.labels[0].imgKuang2=false
                    this.renderdata.shzl.labels[1].imgKuang2=false
                }else if(key1==0&&key2==1){
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x1.png')
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                    this.renderdata.djyl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.djyl.labels[1].color="rgba(255, 173, 147, 1)"
                    this.renderdata.shzl.labels[0].color="rgba(254, 255, 255, 1)"
                    this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                    this.renderdata.djyl.labels[0].imgKuang2=false
                    this.renderdata.djyl.labels[1].imgKuang2=true
                    this.renderdata.shzl.labels[0].imgKuang2=false
                    this.renderdata.shzl.labels[1].imgKuang2=false
                }else if(key1==1&&key2==0){
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x1.png')
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x.png')

                    this.renderdata.djyl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.djyl.labels[1].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[0].color="rgba(165, 237, 255, 1)"
                    this.renderdata.shzl.labels[1].color="rgba(255, 255, 255, 1)"

                    this.renderdata.djyl.labels[0].imgKuang2=false
                    this.renderdata.djyl.labels[1].imgKuang2=false
                    this.renderdata.shzl.labels[0].imgKuang2=true
                    this.renderdata.shzl.labels[1].imgKuang2=false
                }else if(key1==1&&key2==1){
                    this.renderdata.shzl.labels[1].img=require('../../../../public/images/send-backward-re@2x1.png')
                    this.renderdata.djyl.labels[0].img=require('../../../../public/images/pen-square-re@2x.png')
                    this.renderdata.djyl.labels[1].img=require('../../../../public/images/podium-re@2x.png')
                    this.renderdata.shzl.labels[0].img=require('../../../../public/images/vector-square-re@2x.png')

                    this.renderdata.djyl.labels[0].color="rgba(255, 255, 255, 1)"
                    this.renderdata.djyl.labels[1].color="rgba(255, 255, 255, 1)"
                    this.renderdata.shzl.labels[0].color="rgba(254, 255, 255, 1)"
                    this.renderdata.shzl.labels[1].color="rgba(165, 237, 255, 1)"

                    this.renderdata.djyl.labels[0].imgKuang2=false
                    this.renderdata.djyl.labels[1].imgKuang2=false
                    this.renderdata.shzl.labels[0].imgKuang2=false
                    this.renderdata.shzl.labels[1].imgKuang2=true
                }
            },
            openNav() {
                if (this.navOpenOrClose < 0) {
                    this.navOpenOrClose = 0;
                } else {
                    this.navOpenOrClose = -140
                }
            }
        },
        watch: {
            '$route.path': {
                handler: function (newval) {
                    if (newval == '/welcome' || newval == '/login') {
                        this.isInWelcome = true;
                        this.$parent.isInWelcome = true;
                        this.isStatusBtn = false
                    } else {
                        this.isInWelcome = false;
                        this.$parent.isInWelcome = false;
                        this.isStatusBtn = true
                    }
                    if (newval == '/juhe') {
                        this.isJuhe = true;
                        this.$parent.isJuhe = true;
                    } else {
                        this.isJuhe = false;
                        this.$parent.isJuhe = false;
                    }
                    this.smallNavStatus = 'hide';
                    console.log(newval);
                    this.dataOnLevel1 = newval.split("/")[1];
                    this.dataOnLevel2 = newval.split("/")[2];
                    if(this.dataOnLevel1=="djyl"){
                        this.navStyleForDJYL=true
                    }else {
                        this.navStyleForDJYL=false
                    }
                },
                immediate: true
            },
        }
    }
</script>

<style scoped lang="scss">
    .navStyleForDJYL {
        color: #fff;
        position: relative;
        background: RGBA(155, 65, 64, 1) !important;

        &:after {
            content: '';
            width: 100%;
            position: absolute;
            height: 10px;
            background: rgba(254, 173, 147, 1) !important;
            margin-top: 50px;
            left: 0;
            bottom: -15px;
        }
    }

    .daohangImg {
        display: inline-block;
        width: 52px;
        height: 52px;
        position: relative;
        top: 8px;
        left: 0px;
        margin-right: 5px;
    }

    .imgKuang {
        position: absolute;
        top: -42px;
        left: -40px;
        display: inline-block;
        width: 540px;
        height: 234px;
        pointer-events:none;
    }

    .imgKuang2 {
        display: none;
    }

    .noTranslate{
        transform: translateY(0) !important;
        opacity: 1 !important;
    }
    .header-right-switch{
        position: absolute;
        right: 25px;
        top: 45px;
        width: 70px;
        height: 70px;
        cursor: pointer;
        z-index: 40;
        background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-radius: 50%;
    }
	.header-weather {
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 99;
		left: 2530px;
	}

	.MyTitle {
		position: relative;
		top: 0px;
		left: 0px;
		display: inline-block;
		width: 100%;
		height: 168px;
		display: flex;
		text-align: center;
	}

    .dgz {
        color: white;
        font-weight: bold;
        font-size: 50px;
        line-height: 115px;
        text-align: left;
        text-indent: 500px;
    }

    .change-password-btn {
        position: relative;
        margin-left: 30px;
        cursor: pointer;
    }

    .status-box > div:hover {
        color: rgba(111, 233, 255, 1);
    }

    .status-box > div {
        width: 100%;
        text-align: center;
        line-height: 20px;
        margin-top: 20px;
    }

    .status-box {
        font-size: 20px;
        position: absolute;
        right: 0;
        bottom: -115px;
        width: 131px;
        height: 100px;
        box-shadow: 5px 3px 16px 2px rgba(11, 19, 27, 1);
        border: 2px solid rgba(53, 143, 177, 1);
        background: linear-gradient(-61deg, rgba(53, 76, 101, 0.4), rgba(22, 35, 49, 0.4));
    }

    .headnav {
        z-index: 18;
        height: 115px;
        width: 3240px;
        position: absolute;
        top: 0;
        left: 600px;
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 640px 1fr 700px;
        grid-column-gap: 100px;
        grid-template-areas: "left center right";
    }

    .left {
        grid-area: left;

        .bktoWelcome {
            cursor: pointer;
            height: 70px;
            width: 70px;
            background: url("../../../assets/common/images/navimg/icon_fh.png") center no-repeat;
            background-size: 100%;
            align-self: center;
            margin: 20px 0 0 30px;
        }
    }

    .center {
        grid-area: center;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 10;
    }

    .center-tit {
        grid-area: center;
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-rows: 100%;
        grid-template-columns: 96px auto;
        position: relative;
        z-index: 99;
    }

   .center-tit .head-title {
       margin-left: -440px;
   }

    .right {
        grid-area: right;
        display: flex;
        align-items: center;
    }

    .btn-list {
        margin-left: -440px;
        cursor: pointer;
        height: 96px;
        width: 96px;
    }

    .head-title {
        /*margin-left: -250px;*/
        font-size: 64px;
        font-weight: bold;
        color: rgba(227, 237, 248, 1);
        text-shadow:-2px 0 black,
        0 2px black,
        2px 0 black,
        0 -2px black;
    }

    .labels {
        /*margin-left: -250px;*/
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 50px;

        .label {
            color: #fff;
            font-size: 34px;
            font-weight: bold;
            border-radius: 2px;
            min-width: 120px;
            height: 50px;
            text-align: center;
            margin-right: 30px;
            padding: 0 25px;
            cursor: pointer;
            text-shadow:-2px 0 black,
            0 2px black,
            2px 0 black,
            0 -2px black;
        }

        .label-on {
            color: #fff;
            position: relative;
            background: rgba(255, 127, 13, 0.5);

            &:after {
                content: '';
                width: 100%;
                position: absolute;
                height: 10px;
                background: rgba(255, 97, 18, 1);
                margin-top: 50px;
                left: 0;
                bottom: -15px;
            }
        }
    }

    .navBox {
        position: absolute;
        left: -600px;
		z-index: 95;
        display: flex;
        justify-content: center;
        width: 3840px;
        height: 1023px;
        padding-top: 180px;
        box-sizing: border-box;
        background: rgba(5, 19, 26, 0.8);
        transform: translateY(-140%);
        transition: all 1s ease;
    }

    .nav-block {
        width: 1306px;
        height: 752px;
        position: relative;
		z-index: 95;
        margin: 0 77px;
        margin-top: 50px;
        transform: scale(1);
        padding: 30px;
    }

    .nav-block > img {
        position: absolute;
        top: -70px;
        left: -70px;
        display: none;
    }

    .nav-block:hover > img {
        display: block;
    }

    .nav-icon {
        width: 168px;
        height: 168px;
		position: absolute;
		top: 10px;
		left: 450px;
    }

    .nav-tit {
        font-size: 76px;
        font-weight: bold;
        color: #fff;
		position: absolute;
		top: 40px;
		left: 600px;
    }

    .nav-tit1 {
        text-shadow:0 0 0.2em #f87,
        -0 -0 0.2em #f87;
    }

    .nav-tit2 {
        text-shadow:0 0 0.2em rgba(255,255,255,0.5),
        -0 -0 0.2em rgba(255,255,255,0.5);
    }

    .nav-holder {
        position: absolute;
		top: 50px;
		left: 0px;
		z-index: 95;
		width: 100%;
    }

	.nav-box0,.nav-box1 {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
	}

	.nav-box0 div,.nav-box1 div {
		text-align: center;
		margin-left: 60px;
		margin-bottom: 25px;
	}

	.nav-box0 div:nth-child(1),
	.nav-box1 div:nth-child(1),
    .nav-box1 div:nth-child(3),
	.nav-box0 div:nth-child(3)
	{
		margin-left: 180px;
	}

    .links {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
		width: 460px;
		height: 150px;
		line-height: 150px;
        align-items: center;
        box-sizing: border-box;
        color: #D6E9FF;
        font-size: 50px;
        cursor: pointer;

        .link-icon {
            display: inline-block;
            width: 57px;
            height: 57px;
            font-size: 36px;
        }

    }

    .links:hover > .link-name {
        /*color: rgba(254, 173, 147, 1);*/
        /*font-weight: bolder;*/
    }

    .links-on, .url-on {
        /*background: url("../../../assets/common/images/navimg/index_list_hover.png") center center no-repeat;*/
        /*background-size: 100% 100%;*/
        /*background-position-y: 7px;*/
        /*color: rgba(254, 173, 147, 1);*/
    }

    .links-on {
        /*color: rgba(254, 173, 147, 1);*/
        /*font-weight: bolder;*/
    }

    .header-right-switch {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        cursor: pointer;
        z-index: 999;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        top: 25px;
        right: 25px;
    }

    .nav-layer {
        position: absolute;
        width: 100%;
        height: 1017px;
        left: 0;
        top: 0;
        background: rgba(5, 19, 26, 0.8);
        z-index: 2;
        transition: all 1s ease;
        transform: translateY(-100%);
    }

    .nav-container {
        position: absolute;
        z-index: 4;
        display: flex;
        justify-content: center;
        padding-top: 310px;
        box-sizing: border-box;
        width: 100%;
        height: 1017px;
        overflow: hidden;
    }

    .nav-container-layer {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(5, 19, 26, 0.7);
        z-index: 2;
    }

    .nav-menu {
        position: relative;
        height: 620px;
        transition: all 1s ease;
        animation-delay: 1s;
        transform: translateY(0%) scale(0.7);
        margin-top: -100px;
        color: #337ab7;
        text-decoration: none;
        background-color: transparent;
    }

    .nav-menu-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 553px;
        height: 616px;
        cursor: pointer;
        color: #d6e9ff;
        font-size: 52px;
        margin: 0 10px;
        background: url(../../../assets/common/images/navimg/nav_card_normal.png) no-repeat;

        &:hover {
            transform: translateY(-25px) !important;
            background: url(../../../assets/common/images/navimg/nav_card_selected.png) no-repeat;
        }
    }

    .nav-menu-icon {
        width: 260px;
        margin-bottom: 70px;
    }

    .nav-menu-name {
        text-shadow: 0 0 50px #4a90e3;
    }

    .nav-header-btns {
        position: absolute;
        top: 0;
        right: 0;
    }

    .header-right-btns {
        position: absolute;
        width: 200px;
        right: 85px;
        top: 18px;
        z-index: 5;
    }

    .header-right-btn {
        display: inline-block;
        vertical-align: middle;
        height: 27px;
        line-height: 25px;
        margin-right: 5px;
        border: 1px solid rgb(196, 223, 255);
        border-radius: 5px;
        background-color: rgba(196, 223, 255, 0.251);
        font-size: 14px;
        color: #c4dfff;
        cursor: pointer;
        padding: 0 10px;
    }

    .slideInDown {
        transform: translateY(0);
    }

    .st0 {
        fill: none;
        stroke: #fff;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-miterlimit: 10;
    }


    * {

    }
</style>
