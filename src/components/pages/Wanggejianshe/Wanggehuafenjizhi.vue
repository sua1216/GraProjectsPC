<template>
    <!--网格划分机制-->
    <div class="wang-ge-hua-fen-ji-zhi">
        <div class="contentBox">
            <div style="font-size: 28px;margin: 0px 0px 28px 10px;font-weight: bold;">网格划分机制</div>
            <div class="row">
                <span>
                    <div>1</div>
                    <div>楚雄州</div>
                </span>
                <img src="../../../../public/images/bg_wgjs_wghfjz_arrow@2x.png" alt="">
                <span>
                    <div>10</div>
                    <div>县市</div>
                </span>
                <img src="../../../../public/images/bg_wgjs_wghfjz_arrow@2x.png" alt="">
                <span>
                    <div>103</div>
                    <div>乡镇</div>
                </span>
            </div>

            <div class="row">
                <img src="../../../../public/images/bg_wgjs_wghfjz_arrow@2x.png" alt=""
                     style="transform: rotate(90deg);top: 0px;right: -283px">
            </div>

            <div class="row">
                <span>
                    <div>14848</div>
                    <div>基础网格</div>
                </span>
                <img src="../../../../public/images/bg_wgjs_wghfjz_arrow@2x.png" alt=""
                     style="transform: rotate(180deg);">
                <span>
                    <div>12347</div>
                    <div>村居民小组</div>
                </span>
                <img src="../../../../public/images/bg_wgjs_wghfjz_arrow@2x.png" alt=""
                     style="transform: rotate(180deg);">
                <span class="cun">
                    <div>1101</div>
                    <div>村（社区）</div>
                </span>
            </div>

            <!--网格要素覆盖概况-->
            <transition name="right-buttom" mode="out-in">
                <component v-bind:is="Wanggeyaosufugaigaikuang"></component>
            </transition>


        </div>
    </div>
</template>

<script>
    import Wanggeyaosufugaigaikuang from "./Wanggeyaosufugaigaikuang.vue"
    import Erjiwanggekaoshipaiming from "./Erjiwanggekaoshipaiming.vue"

    export default {
        name: "Wanggehuafenjizhi",
        data() {
            return {
                Wanggeyaosufugaigaikuang: Wanggeyaosufugaigaikuang
            }
        },
        props: [
            "right_buttom"
        ],
        components: {
            "Wanggeyaosufugaigaikuang": Wanggeyaosufugaigaikuang,
            "Erjiwanggekaoshipaiming": Erjiwanggekaoshipaiming
        },
        watch: {
            right_buttom(e) {
                if(this.right_buttom == 1){
                    this.Wanggeyaosufugaigaikuang = Wanggeyaosufugaigaikuang
                }else
                {
                    this.Wanggeyaosufugaigaikuang = Erjiwanggekaoshipaiming
                }
            }
        }
    }
</script>

<style scoped>
    .wang-ge-hua-fen-ji-zhi {
        padding: 13px 20px;
        height: 857px;
    }

    .contentBox {
        padding: 25px 20px;
        height: 100%;
        /*border: 1px solid #00B7EE;*/
    }

    .row {
        display: flex;
        justify-content: space-around;
    }

    .row span {
        display: inline-block;
        padding: 20px 0px;
        width: 200px;
        height: 120px;
        /*border: 1px solid black;*/
        text-align: center;
        background-image: url("../../../../public/images/bg_wgjs_wghfjz_1@2x.png");
        background-repeat: no-repeat;
        background-size: 200px 120px;
    }

    .cun {
        background-image: url("../../../../public/images/bg_wgjs_wghfjz_2@2x.png") !important;
        color: #FD250F;
    }

    .row img {
        display: inline-block;
        width: 40px;
        height: 60px;
        position: relative;
        top: 32px;
    }

    .row span div:nth-child(1) {
        font-size: 36px;
        line-height: 1;
        font-weight: bold;
    }

    .row span div:nth-child(2) {
        font-size: 22px;
        color: rgba(255,255,255,0.5);
    }
</style>