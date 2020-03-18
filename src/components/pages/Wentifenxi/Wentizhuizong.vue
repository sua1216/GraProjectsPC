<template>
    <!--问题追踪-->
    <div class="wentizhuizong">
        <div class="wentizhuizongTitle" @click="wtzz">
            问题追踪
            <img src="../../../../public/images/zhuzhuangtu.png" alt="">
            <span class="line line12"></span>
            <span class="line2"></span>
        </div>
        <ul>
            <li v-for="(item,index) in wentizhuizongData" :key="index" @click="chakanxiangqing(index)" class="wtzzLi">
                <img style="border-radius: 50%" :src="item.img"></img>
                <span>
                    <div style="display: flex;">
                        <span style="font-size: 24px;font-weight: bold;margin-left: 10px;flex: 2.5" :title="item.title">{{item.title}}</span>
                        <span style="font-size: 20px;color: rgba(255,255,255,0.5);flex: 3">{{item.time}}</span>
                        <span style="font-size: 18px;flex: 2;text-align: center" :class="[item.thing=='上报'?'shangbao':'qita',item.thing=='结案'?'jiean':'']">{{item.thing}}</span>
                    </div>

                    <div style="display: flex;margin-left: 10px;margin-top: 3px">
                        <span style="font-size: 20px;color: rgba(255,255,255,0.5);flex: 5.5;" :title="item.juti">{{item.juti}}</span>
                        <span style="font-size: 20px;color: rgba(255,255,255,1);flex: 2;text-align: center;font-weight: bold;" :title="item.name">{{item.name}}</span>
                    </div>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Wentizhuizong",
        data:function () {
            return {
                wentizhuizongData:[
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"上报",name:"王姐",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"受理",name:"王姐1",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"派遣",name:"王姐11",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"处置",name:"王姐12",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"结案",name:"王姐13",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"上报",name:"王姐",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"受理",name:"王姐1",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"派遣",name:"王姐11",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"处置",name:"王姐12",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"结案",name:"王姐13",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"上报",name:"王姐",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"受理",name:"王姐1",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"派遣",name:"王姐11",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"处置",name:"王姐12",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                    {img:require("../../../../public/images/timg.jpg"),title:"市容环境",thing:"结案",name:"王姐13",time:"09:12:30",juti:"发现有一处暴露垃圾，请派人处理"},
                ]
            }
        },
        methods:{
            wtzz:function () {//打开社会治理问题统计查询  的弹窗
                this.$emit('shzlwttjcx');
            },
            chakanxiangqing:function (index) {//查看详情   查看案件的详情
                this.$emit('ajxq',index);
            }
        }
    }
</script>

<style scoped>
    .wentizhuizong {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 438px;
        height: 500px;
    }

    ul {
        margin-top: 10px;
        height: 450px;
        overflow: auto;
    }

    .wentizhuizongTitle {
        position: relative;
        top: 0px;
        left: 0px;
        font-size: 28px;
    }

    .wentizhuizongTitle img {
        display: inline-block;
        width: 23px;
        height: 20px;
    }

    .wtzzLi {
        display: flex;
        margin-right: 20px;
        margin-top: 10px;
        border-bottom: 1px solid rgba(255,255,255,0.5);
        padding-bottom: 5px;
        margin-bottom: 5px;
    }
    .wtzzLi img {
        display: inline-block;
        width: 50px;
        height: 50px;
    }

    .line {
        position: absolute;
        top: 20px;
        right: 0px;
        display: inline-block;
        width: 270px;
        height: 2px;
        background-color: rgba(255,255,255,0.2);
    }

    .line2 {
        position: absolute;
        top: 13px;
        right: 1px;
        display: inline-block;
        width: 3px;
        height: 15px;
        background-color: rgba(255,255,255,0.5);
    }

    span {
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .shangbao:before {
        content: "";
        line-height: 36px;
    }

    .shangbao {
        border: 2px solid rgba(255,0,0,0.5);
        background-color: rgba(255,0,0,0.2);
        border-radius: 4px;
    }

    .qita {
        border: 2px solid #FFC820FF;
        border-radius: 4px;
        background-color: rgba(255,200,32,0.3);
        line-height: 36px;
    }

    .jiean {
        border: 2px solid rgba(255,255,255,0.1);
        border-radius: 4px;
        background-color: rgba(255,255,255,0.1);
        line-height: 36px;
    }
</style>