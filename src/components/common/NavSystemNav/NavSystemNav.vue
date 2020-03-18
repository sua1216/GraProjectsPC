<template>
    <!--这里不使用v-for渲染是因为每一个效果可能不同-->
    <div class="system-nav" :class="{noTranslate:showPage}">
        <div class="system-nav-item" @mouseenter="enter(1)" @mouseleave="leave(1)" :class="{'dom-float':isAnimation}" @click="navSkip(1)">
            <div class="system-img-box">
                <img :src="require('@image/SystemNav/wsf1@2x.png')" :class="{'scale-circle':isAnimation}">
                <img :src="require('@image/SystemNav/wzq2@2x.png')" :class="{'rotate-three-blue':isAnimation}">
                <img :src="require('@image/SystemNav/wzq1@2x.png')" :class="{'rotate-three-white':isAnimation}">
                <img :src="require('@image/SystemNav/icon1_bd@2x.png')">
                <img :src="require('@image/SystemNav/icon1_zd_zz@2x.png')" :class="{'pointer-rotate':isAnimation}">
            </div>
            <div class="system-nav-title" :class="{'font-color-emphasize':isAnimation}">社会治理云图</div>
        </div>
        <div class="system-nav-item" @mouseenter="enter(2)" @mouseleave="leave(2)" :class="{'dom-float':isAnimation_2}" @click="navSkip(2)">
            <div class="system-img-box">
                <img :src="require('@image/SystemNav/wsf1@2x.png')" :class="{'scale-circle':isAnimation_2}">
                <img :src="require('@image/SystemNav/wzq3@2x.png')" >
                <img :src="require('@image/SystemNav/wzq2@2x.png')" :class="{'rotate-three-blue':isAnimation_2}">
                <img :src="require('@image/SystemNav/wzq1@2x.png')" :class="{'rotate-three-white':isAnimation_2}">
                <img :src="require('@image/SystemNav/icon2_bd@2x.png')">
                <img :src="require('@image/SystemNav/icon2_sm@2x.png')" :class="{'rotate-radar':isAnimation_2}">
            </div>
            <div class="system-nav-title" :class="{'font-color-emphasize':isAnimation_2}">分析研判系统</div>
        </div>
        <div class="system-nav-item" @mouseenter="enter(3)" @mouseleave="leave(3)" :class="{'dom-float':isAnimation_3}" @click="navSkip(3)">
            <div class="system-img-box">
                <img :src="require('@image/SystemNav/wsf1@2x.png')" :class="{'scale-circle':isAnimation_3}">
                <img :src="require('@image/SystemNav/wzq3@2x.png')" >
                <img :src="require('@image/SystemNav/wzq2@2x.png')" :class="{'rotate-three-blue':isAnimation_3}">
                <img :src="require('@image/SystemNav/wzq1@2x.png')" :class="{'rotate-three-white':isAnimation_3}">
                <img :src="require('@image/SystemNav/icon2_bd@2x.png')">
                <img :src="require('@image/SystemNav/icon3_zd@2x.png')" :class="{'rotate-general':isAnimation_3}">
            </div>
            <div class="system-nav-title" :class="{'font-color-emphasize':isAnimation_3}">监控预警系统</div>
        </div>
        <!--<div class="system-nav-item" @mouseenter="enter(4)" @mouseleave="leave(4)" :class="{'dom-float':isAnimation_4}">
            <div class="system-img-box">
                <img :src="require('@image/SystemNav/wsf1@2x.png')" :class="{'scale-circle':isAnimation_4}">
                <img :src="require('@image/SystemNav/wzq2@2x.png')" :class="{'rotate-three-blue':isAnimation_4}">
                <img :src="require('@image/SystemNav/wzq1@2x.png')" :class="{'rotate-three-white':isAnimation_4}">
                <img :src="require('@image/SystemNav/icon4_stop@2x.png')">
            </div>
            <div class="system-nav-title">自助BI分析系统</div>
        </div>-->
        <div class="system-nav-item" @mouseenter="enter(5)" @mouseleave="leave(5)" :class="{'dom-float':isAnimation_5}" @click="navSkip(5)">
            <div class="system-img-box">
                <img :src="require('@image/SystemNav/wsf1@2x.png')" :class="{'scale-circle':isAnimation_5}">
                <img :src="require('@image/SystemNav/wzq2@2x.png')" :class="{'rotate-three-blue':isAnimation_5}">
                <img :src="require('@image/SystemNav/wzq1@2x.png')" :class="{'rotate-three-white':isAnimation_5}">
                <img :src="require('@image/SystemNav/icon5_bd@2x.png')">
                <img :src="require('@image/SystemNav/icon5_zd_1@2x.png')" :class="{'rotate-exponent-2':isAnimation_5}">
                <img :src="require('@image/SystemNav/icon5_zd_2@2x.png')" :class="{'rotate-exponent-1':isAnimation_5}">
            </div>
            <div class="system-nav-title" :class="{'font-color-emphasize':isAnimation_5}">指数评价系统</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavSystemNav",
        data(){
            return{
                isAnimation:false,
                isAnimation_2:false,
                isAnimation_3:false,
                isAnimation_4:false,
                isAnimation_5:false
            }
        },
        mounted(){

        },
        computed:{
            showPage(){
                return this.$store.state.showPage
            }
        },
        methods:{
            navSkip(i){
                switch (i) {
                    case 1:
                        this.$router.push({path:'/djyl/zhengzhijianshe'});
                        this.$store.state.showPage = false;
                        break;
                    case 2:
                        this.isAnimation_2 = true;
                        window.location.href = 'http://cx.bddeve.xbcx.com.cn/dsj_wjjkq_web/web/judged/index/index#/wenTiAll';
                        break;
                    case 3:
                        this.isAnimation_3 = true;
                        window.location.href = 'http://cx.bddeve.xbcx.com.cn/dsj_wjjkq_web/web/warning/index/index#/communityWarning';
                        break;
                    case 5:
                        this.isAnimation_5 = true;
                        window.location.href = 'http://cx.bddeve.xbcx.com.cn/dsj_wjjkq_web/web/exponent/index/index#/total';
                        break;
                    default:
                        break;
                }
            },
            enter(i){
                switch (i) {
                    case 1:
                        this.isAnimation = true;
                        break;
                    case 2:
                        this.isAnimation_2 = true;
                        break;
                    case 3:
                        this.isAnimation_3 = true;
                        break;
                    case 4:
                        this.isAnimation_4 = true;
                        break;
                    case 5:
                        this.isAnimation_5 = true;
                        break;
                    default:
                        break;
                }
            },
            leave(i){
                switch (i) {
                    case 1:
                        this.isAnimation = false;
                        break;
                    case 2:
                        this.isAnimation_2 = false;
                        break;
                    case 3:
                        this.isAnimation_3 = false;
                        break;
                    case 4:
                        this.isAnimation_4 = false;
                        break;
                    case 5:
                        this.isAnimation_5 = false;
                        break;
                    default:
                        break;



                }
            },
        }
    }
</script>

<style scoped>
    .rotate-exponent-2{
        animation: rotateExponent_2 8s linear infinite;

    }
    .rotate-exponent-1{
        animation: rotateExponent_1 8s linear infinite;
    }
    .pointer-rotate{
        animation: pointerRotate linear 3s infinite;
    }
    .no-click{
        cursor: not-allowed !important;
    }
    .font-color-emphasize{
        text-shadow: 0 0 20px rgba(255,66,0,0.7), 0 0 20px rgba(255,66,0,0.7), 0 0 20px rgba(255,66,0,0.7) !important;
    }
    .dom-float{
        transform: translateY(-40px);
    }
    .system-nav-title{
        text-align: center;
        font-size: 50px;
        font-weight: bold;
        margin-top: 81px;
        text-shadow: 0 0 20px rgba(255,66,0,0.4), 0 0 20px rgba(255,66,0,0.4), 0 0 20px rgba(255,66,0,0.4);
    }
    .system-nav-item{
        cursor: pointer;
        transition: .7s ;
        margin-right: 143px;
    }
    .system-img-box{
        position: relative;
        width: 488px;
        height: 488px;
    }
    .system-img-box img{
        position: absolute;
        z-index: 99;
        left: 0;
        top: 0;
    }
    .noTranslate{
        transform: translateY(0) !important;
        opacity: 1 !important;
    }
    .system-nav{
        display: flex;
        justify-content: center;
        padding-top: 248px;
        width: 3840px;
        height: 1023px;
        position: absolute;
        z-index: 96;
        opacity: 0;
        left: -600px;
        transition: 0.7s all;
        top: 0;
        transform: translateY(-100%);
        background: url("../../../assets/common/images/bg_xtdh.png") no-repeat;
    }
    .rotate-general{
        animation: rotate_1 linear 4s infinite;
    }
    .rotate-radar{
        animation: rotate_1 linear 1s infinite;
    }
    .rotate-three-blue{
        animation: rotate_2 linear 5s infinite;
    }
    .rotate-three-white{
        animation: rotate_1 linear 5s infinite;
    }
    .scale-circle{
        animation: scaleCircle linear 3s infinite;
    }
    @keyframes pointerRotate{
        0%{
            transform: rotate(0);
        }25%{
                     transform: rotate(-63deg);
                 }
        50%{
            transform: rotate(0deg);
        }75%{
                     transform: rotate(63deg);
                 }
        100%{
            transform: rotate(0);
        }


    }
    @keyframes scaleCircle{
        0%{
            transform:scale(1);
        }50%{
             transform: scale(1.05);
         }
        100%{
            transform: scale(1);
        }
    }
    @keyframes rotate_1 {
        from{
            transform: rotate(0);
        }to{
             transform: rotate(360deg);
         }
    }
    @keyframes rotate_2 {
        from{
            transform: rotate(0);
        }to{
             transform: rotate(-360deg);
         }
    }
    @keyframes rotateExponent_1{
        0%{
            transform: rotate(0);
        }
        2.5%{
            transform: rotate(-10deg);
        }
        7.5%{
            transform: rotate(55deg);
        }
        10%{
            transform: rotate(45deg);
        }
        25%{
            transform: rotate(45deg);
        }
        27.5%{
            transform: rotate(35deg);
        }
        32.5%{
            transform: rotate(100deg);
        }
        35%{
            transform: rotate(90deg);
        }

        50%{
            transform: rotate(90deg);
        }
        52.5%{
            transform: rotate(80deg);
        }
        58.5%{
            transform: rotate(145deg);
        }
        60%{
            transform: rotate(135deg);
        }

        75%{
            transform: rotate(135deg);
        }
        77.5%{
            transform: rotate(125deg);
        }
        82.5%{
            transform: rotate(190deg);
        }
        85%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(180deg);
        }
    }
    @keyframes rotateExponent_2{
        0%{
            transform: rotate(0);
        }
        2.5%{
            transform: rotate(20deg);
        }
        7.5%{
            transform: rotate(-110deg);
        }
        10%{
            transform: rotate(-90deg);
        }
        25%{
            transform: rotate(-90deg);
        }
        27.5%{
            transform: rotate(-70deg);
        }
        32.5%{
            transform: rotate(-200deg);
        }
        35%{
            transform: rotate(-180deg);
        }

        50%{
            transform: rotate(-180deg);
        }
        52.5%{
            transform: rotate(-160deg);
        }
        58.5%{
            transform: rotate(-290deg);
        }
        60%{
            transform: rotate(-270deg);
        }

        75%{
            transform: rotate(-270deg);
        }
        77.5%{
            transform: rotate(-250deg);
        }
        82.5%{
            transform: rotate(-380deg);
        }
        85%{
            transform: rotate(-360deg);
        }
        100%{
            transform: rotate(-360deg);
        }
    }
</style>
