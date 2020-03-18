<template>
    <div class="citizen-complaint-list-item">
        <div class="list-item">
            <div class="icon">
                <img v-show ="d.title == 1" :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_1@2x.png')" alt="">
                <img v-show ="d.title == 2" :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_2@2x.png')" alt="">
                <img v-show ="d.title == 3" :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_3@2x.png')" alt="">
                <img v-show ="d.title == 4" :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_4@2x.png')" alt="">
                <img v-show ="d.title == 5" :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_5@2x.png')" alt="">
                <img v-show ="d.title == 6" :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_6@2x.png')" alt="">
                <img v-show ="d.title == 7" :src="require('../../../assets/common/images/ZhengZhiJianShe/icon_zzjs_pm_7@2x.png')" alt="">
            </div>
            <div class="name">
                <p>{{d.type}}</p>
            </div>
            <div>
                <p class="xb_icon eye" style="margin-right: 18px;"></p>
            </div>
            <div class="detail">
                <p>{{d.detail}}</p>
            </div>
            <div>
                <p class="xb_icon comment-alt-lines" style="margin-right: 18px;"></p>
            </div>
            <div class="num">
                <p>{{d.num}}</p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "CitizenComplaintListItem",
        props:{
            d:Object,

        },
        methods:{

        }
    }
</script>

<style lang="scss">
    .citizen-complaint-list-item{
        height:65px;line-height: 65px;
        .list-item{
            display:flex;justify-content:space-around;font-size:22px;border-bottom:1px solid rgba(255, 255, 255, .2);
            .icon{
                width:35px;margin-top:5px;
                img{
                    width:25px;
                }

            }
            .name{
                width:250px;color:rgba(254, 255, 254, 1);
                p{
                    overflow:hidden;text-overflow:ellipsis;white-space: nowrap;text-align: left;font-weight:bold;
                }
            }
            .detail{
                width:120px;color:rgba(255,255,255,1);
                p{
                    overflow:hidden;text-overflow:ellipsis;white-space: nowrap;font-size:24px;line-height:65px;font-weight:bold;
                }
            }
            .num {
                p {
                    color: rgba(255, 255, 255, 1);
                    width: 70px;
                    font-weight: bold;
                    font-size: 24px;
                }
            }

        }
    }

</style>