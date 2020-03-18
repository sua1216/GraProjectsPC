<template>
    <div class="left-shaixuan">
        <div class="back" @click="back">
            <img src="../../../../public/images/back.png" alt="">
            <span>返回</span>
        </div>
        <div :class="['li',flag1?'li1':'li2']" @click="choose1">
            <img :src="img1">
            <div style="width: 250px;height: 150px;">
                <div class="li-right">
                    <div style="font-size: 50px;">309</div>
                    <div style="font-size: 36px">村/社区网格</div>
                </div>
            </div>
        </div>
        <div :class="['li',flag2?'li1':'li2']" @click="choose2">
            <img :src="img2">
            <div style="width: 250px;height: 150px;">
                <div class="li-right">
                    <div style="font-size: 50px;">560</div>
                    <div style="font-size: 36px;">村小组</div>
                </div>
            </div>
        </div>
        <div :class="['li',flag3?'li1':'li2']" @click="choose3">
            <img :src="img3">
            <div style="width: 250px;height: 150px;">
                <div class="li-right">
                    <div style="font-size: 50px;">460</div>
                    <div style="font-size: 36px;">基层网格</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Left2",
        data() {
            return {
                img1: require("../../../../public/images/icon_wgjs_city_Selection@2x.png"),
                img2: require("../../../../public/images/icon_wgjs_country_Selection@2x.png"),
                img3: require("../../../../public/images/most1.png"),
                flag1:true,
                flag2:false,
                flag3:false,
            }
        },
        props:["num"],
        watch:{
            num(newdata,olddata){
                switch (newdata) {
                    case 1:{
                        this.flag1=true;
                        this.flag2=false;
                        this.flag3=false;
                        this.img1 = require("../../../../public/images/icon_wgjs_city_Selection@2x.png");
                        this.img2 = require("../../../../public/images/icon_wgjs_country_Selection@2x.png");
                        this.img3 = require("../../../../public/images/most1.png");
                        break;
                    }
                    case 2:{
                        this.flag1=false;
                        this.flag2=true;
                        this.flag3=false;
                        this.img1 = require("../../../../public/images/icon_wgjs_city_Unchecked@2x.png");
                        this.img2 = require("../../../../public/images/icon_wgjs_country_Uncheck@2x.png");
                        this.img3 = require("../../../../public/images/most1.png");
                        break;
                    }
                    case 3:{
                        this.flag1=false;
                        this.flag2=false;
                        this.flag3=true;
                        this.img1 = require("../../../../public/images/icon_wgjs_city_Unchecked@2x.png");
                        this.img2 = require("../../../../public/images/icon_wgjs_country_Selection@2x.png");
                        this.img3 = require("../../../../public/images/most2.png");
                        break;
                    }
                }
            }
        },
        methods: {
            choose1: function (e) {
                this.flag1=true;
                this.flag2=false;
                this.flag3=false;
                this.img1 = require("../../../../public/images/icon_wgjs_city_Selection@2x.png");
                this.img2 = require("../../../../public/images/icon_wgjs_country_Selection@2x.png");
                this.img3 = require("../../../../public/images/most1.png");
                this.$emit('changeCeng2',1)
            },
            choose2: function () {
                this.flag1=false;
                this.flag2=true;
                this.flag3=false;
                this.img1 = require("../../../../public/images/icon_wgjs_city_Unchecked@2x.png");
                this.img2 = require("../../../../public/images/icon_wgjs_country_Uncheck@2x.png");
                this.img3 = require("../../../../public/images/most1.png");
                this.$emit('changeCeng2',2)
            },
            choose3: function () {
                this.flag1=false;
                this.flag2=false;
                this.flag3=true;
                this.img1 = require("../../../../public/images/icon_wgjs_city_Unchecked@2x.png");
                this.img2 = require("../../../../public/images/icon_wgjs_country_Selection@2x.png");
                this.img3 = require("../../../../public/images/most2.png");
                this.$emit('changeCeng2',3)
            },
            back:function () {
                this.$emit('back')
            }
        }
    }
</script>

<style scoped>
    .left-shaixuan {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
        width: 400px;
        font-weight: bold;
    }

    .back {
        position: absolute;
        top: -252px;
        left: 30px;
        z-index: 99999;
        padding: 15px;
        border: 1px solid rgba(255,255,255,0.5);
        border-radius: 5px;
        font-size: 24px;
        box-shadow: 0 0 2px 2px #ccc;
        cursor: pointer;
        display: inline-block;
        width: 150px;
        cursor: pointer;
        background-color: rgb(34,54,72);
    }

    .back img {
        position: absolute;
        top: 16px;
        left: 20px;
        display: inline-block;
        width: 35px;
        height: 35px;
        margin-right: 10px;
    }

    .back span {
        margin-left: 60px;
    }

    .li {
        display: flex;
    }

    .li img {
        display: inline-block;
        width: 150px;
        height: 150px;
    }

    .li-right {
        position: relative;
        top: 50%;
        left: 0px;
        transform: translateY(-50%);
        width: 250px;
    }
    .li1 {
        color: #FF9E2C;
    }
    .li2 {
        color: rgba(255,255,255,0.5);
    }
    /*#FF9E2C*/
</style>