<template>
    <div class="left-shaixuan">
        <div :class="['li',flag1?'li1':'li2']" @click="choose1">
            <img :src="img1">
            <div style="width: 150px;height: 150px;">
                <div class="li-right">
                    <div style="font-size: 36px">楚雄州</div>
                </div>
            </div>
        </div>
        <div :class="['li',flag2?'li1':'li2']" @click="choose2">
            <img :src="img2">
            <div style="width: 150px;height: 150px;">
                <div class="li-right">
                    <div style="font-size: 50px;">10</div>
                    <div style="font-size: 36px;">县市网格</div>
                </div>
            </div>
        </div>
        <div :class="['li',flag3?'li1':'li2']" @click="choose3">
            <img :src="img3">
            <div style="width: 150px;height: 150px;">
                <div class="li-right">
                    <div style="font-size: 50px;">103</div>
                    <div style="font-size: 36px;">乡镇网格</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Left",
        data() {
            return {
                img1: require("../../../../public/images/icon_wgjs_whole_Selection@2x.png"),
                img2: require("../../../../public/images/icon_wgjs_city_Unchecked@2x.png"),
                img3: require("../../../../public/images/icon_wgjs_country_Selection@2x.png"),
                flag1:true,
                flag2:false,
                flag3:false,
            }
        },
        methods: {
            choose1: function (e) {
                this.flag1=true;
                this.flag2=false;
                this.flag3=false;
                this.img1 = require("../../../../public/images/icon_wgjs_whole_Selection@2x.png");
                this.img2 = require("../../../../public/images/icon_wgjs_city_Unchecked@2x.png");
                this.img3 = require("../../../../public/images/icon_wgjs_country_Selection@2x.png");
                this.$emit('changeCeng',1)
            },
            choose2: function () {
                this.flag1=false;
                this.flag2=true;
                this.flag3=false;
                this.img1 = require("../../../../public/images/icon_wgjs_whole_Unchecked@2x.png");
                this.img2 = require("../../../../public/images/icon_wgjs_city_Selection@2x.png");
                this.img3 = require("../../../../public/images/icon_wgjs_country_Selection@2x.png");
                this.$emit('changeCeng',2)
            },
            choose3: function () {
                this.flag1=false;
                this.flag2=false;
                this.flag3=true;
                this.img1 = require("../../../../public/images/icon_wgjs_whole_Unchecked@2x.png");
                this.img2 = require("../../../../public/images/icon_wgjs_city_Unchecked@2x.png");
                this.img3 = require("../../../../public/images/icon_wgjs_country_Uncheck@2x.png");
                this.$emit('changeCeng',3)
            }
        }
    }
</script>

<style scoped>
    .left-shaixuan {
        display: inline-block;
        width: 300px;
        font-weight: bold;
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
        width: 150px;
    }
    .li1 {
        color: #FF9E2C;
    }
    .li2 {
        color: rgba(255,255,255,0.5);
    }
    /*#FF9E2C*/
</style>