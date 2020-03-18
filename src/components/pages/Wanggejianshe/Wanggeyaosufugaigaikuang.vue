<template>
    <div class="wang-ge-yao-su-fu-gai-gai-kaung">
        <!--网格要素覆盖概况-->
        <div style="font-size:28px;margin: 13px 0px 28px 10px;font-weight: bold;">网格要素覆盖概况</div>
        <div class="row">
            <div class="li">
                <span class="icon">
                    <img src="../../../../public/images/circle.png" alt="">
                    <img src="../../../../public/images/home.png" alt="">
                </span>
                <span class="title">
                    <div>4151</div>
                    <div>房屋</div>
                </span>
                <img class="right-buttom-img" src="../../../../public/images/home.png" alt="">
            </div>
            <div class="li">
                <span class="icon">
                    <img src="../../../../public/images/circle.png" alt="">
                    <img src="../../../../public/images/address-card.png" alt="">
                </span>
                <span class="title">
                    <div>2846</div>
                    <div>户籍人口</div>
                </span>
                <img class="right-buttom-img" src="../../../../public/images/address-card.png" alt="">
            </div>
            <div class="li">
                <span class="icon">
                    <img src="../../../../public/images/circle.png" alt="">
                    <img src="../../../../public/images/hotel.png" alt="">
                </span>
                <span class="title">
                    <div>3697</div>
                    <div>企业</div>
                </span>
                <img class="right-buttom-img" src="../../../../public/images/hotel.png" alt="">
            </div>
        </div>

        <div class="row" style="margin-top: 28px">
            <div class="li">
                <span class="icon">
                    <img src="../../../../public/images/circle.png" alt="">
                    <img src="../../../../public/images/walking.png" alt="">
                </span>
                <span class="title">
                    <div>682</div>
                    <div>上访人员</div>
                </span>
                <img class="right-buttom-img" src="../../../../public/images/walking.png" alt="">
            </div>
            <div class="li">
                <span class="icon">
                    <img src="../../../../public/images/circle.png" alt="">
                    <img src="../../../../public/images/vote-yea.png" alt="">
                </span>
                <span class="title">
                    <div>7780</div>
                    <div>社区矫正</div>
                </span>
                <img class="right-buttom-img" src="../../../../public/images/vote-yea.png" alt="">
            </div>
            <div class="li">
                <span class="icon">
                    <img src="../../../../public/images/circle.png" alt="">
                    <img src="../../../../public/images/head-side.png" alt="">
                </span>
                <span class="title">
                    <div>239</div>
                    <div>涉毒人员</div>
                </span>
                <img class="right-buttom-img" src="../../../../public/images/head-side.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Wanggeyaosufugaigaikuang"
    }
</script>

<style scoped>
    .wang-ge-yao-su-fu-gai-gai-kaung {
        /*margin-top: 25px;*/
    }

    .row {
        display: flex;
        justify-content: space-around;
    }

    .row .li {
        position: relative;
        top: 0px;
        left: 0px;
        display: inline-block;
        padding: 20px;
        width: 230px;
        height: 130px;
        display: flex;
        border: 1px dashed rgba(255,255,255,0.5);
        background-color: rgba(255,255,255,0.1);
        overflow: hidden;
    }

    .icon {
        position: relative;
        top: 8px;
        left: 0px;
    }
    .icon img {
        position: absolute;
        left: -4px;
    }
    .icon img:nth-child(1) {
        width: 64px;
        height: 64px;
        top: 0px;
    }

    .icon img:nth-child(2) {
        width: 29px;
        height: 26px;
        top: 20px;
        left: 14px;
    }

    .title {
        position: absolute;
        top: 22px;
        left: 85px;
        line-height: 1.5;
    }

    .title span:nth-child(2) {
        margin-top: 5px;
    }


    .title div:nth-child(1) {
        color: #00D8FF;
        font-family: MyriadPro-Bold;
        font-weight: bold;
        font-size: 40px;
        line-height: 1;
     }

    .title div:nth-child(2) {
        font-size: 26px;
        color: rgba(255,255,255,0.6);
    }

    .right-buttom-img {
        position: absolute;
        bottom: 0px;
        right: 0px;
        display: inline-block;
        width: 100px;
        height: 80px;
        opacity: 0.2;
    }

</style>