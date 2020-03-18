<template>
    <div class="ZhengJianYouXia">
        <div class="list-item">
            <div class="icon">
                <img v-show="d.title == 1"
                     :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_1@2x.png')" alt="">
                <img v-show="d.title == 2"
                     :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_2@2x.png')" alt="">
                <img v-show="d.title == 3"
                     :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_3@2x.png')" alt="">
                <img v-show="d.title == 4"
                     :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_4@2x.png')" alt="">
                <img v-show="d.title == 5"
                     :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_5@2x.png')" alt="">
                <img v-show="d.title == 6"
                     :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_6@2x.png')" alt="">
                <img v-show="d.title == 7"
                     :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_7@2x.png')" alt="">
            </div>
            <div class="name">
                <a :title="d.type">
                    <p>{{d.type}}</p>
                </a>

            </div>
            <div>
                <p class="xb_icon eye"
                   style=" width:23px;height:17px;opacity:0.5;margin-right: 10px; color: rgba(255, 255, 255, .5);margin-left: 50px;"></p>
            </div>
            <div class="detail">
                <p>{{d.detail}}</p>
            </div>
            <div>
                <p class="xb_icon comment-alt-lines"
                   style=" width:19px;height:19px;opacity:0.5;margin-right: 18px;color: rgba(255, 255, 255, .5) "></p>
            </div>
            <div class="num">
                <p>{{d.num}}</p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ZhengJianYouXia",
        props: {
            d: Object,

        },
        methods: {}
    }
</script>

<style lang="scss">
    //修改
    a {
        text-decoration: none;
        color: rgba(254, 255, 254, 1);
        cursor: default;
    }

    a:hover {
        color: rgba(254, 255, 254, 1);
    }

    .ZhengJianYouXia {
        height: 65px;
        line-height: 65px;
        border-bottom: 1px solid rgba(255, 255, 255, .2);

        .list-item {
            display: flex;
            justify-content: space-around;
            font-size: 22px;

            .icon {
                width: 35px;
                margin-top: 5px;

                img {
                    width: 36px;
                    margin-top: 10px;
                }

            }

            .name {
                width: 250px;
                color: rgba(254, 255, 254, 1);
                margin-left: 25px;

                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: left;
                    font-weight: bold;
                }
            }

            .detail {
                width: 100px;
                color: rgba(255, 255, 255, 1);
                font-weight: bold;

                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 24px;
                    line-height: 65px;
                    font-weight: bold;
                }
            }

            .num {
                width: 70px;
                font-weight: bold;
                font-size: 24px;
                color: rgba(255, 255, 255, 1);

            }

        }
    }
</style>