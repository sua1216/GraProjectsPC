<template>
    <div class="native-progress-bar">
        <div class="bar">
            <div :style="{
                width:100 - d.score + '%'
            }" class="line"></div>
            <div :style="{
                width:d.score + '%'
            }" :class="'full full' + i + ' ' + color"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NativeProgressBar.vue",
        props:{
            d:Object,
            i:Number,
            color: {
                type: String,
                default: ''
            },
        },
        mounted(){
            // console.log(this.color)
        }
    }
</script>

<style lang="scss">
    .native-progress-bar{
        width:340px;height:20px;
        .title{
            display: flex;justify-content: space-between;height:30px;
            p{
                margin:0;font-size:22px;height:30px;line-height:30px;
                &:nth-child(1){
                    width:100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
                }
                &:nth-child(3){
                    width:50px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: right;
                }
            }
        }
        .bar{
            height:20px;position:relative;
            .full{
                height:20px;position:absolute;top:0;left:0;background:linear-gradient(to right,rgba(122, 136, 147, 0.05) 0,rgba(122, 136, 147, 1) calc(100% - 5px), #97a6ae calc(100% - 5px), #97a6ae 100%);border-radius:1px;z-index:10;transition:all .2s linear;
            }
            .full1{
                background:linear-gradient(to right,rgba(211, 80, 38, 0.05) 0,rgba(211, 80, 38, 1) calc(100% - 5px), #f17e58 calc(100% - 5px), #f17e58 100%);
                &.blue{
                    background:linear-gradient(to right,rgba(211, 80, 38, 0.05) 0,rgba(20, 130, 255, 0.9) calc(100% - 5px), #5898F1 calc(100% - 5px), #5898F1 100%);
                }
            }
            .full2{
                background:linear-gradient(to right,rgba(216, 147, 62, 0.05) 0,rgba(216, 147, 62, 1) calc(100% - 5px), #f1ae58 calc(100% - 5px), #f1ae58 100%);
                &.blue{
                    background:linear-gradient(to right,rgba(216, 147, 62, 0.05) 0,rgba(35, 173, 212, 0.9) calc(100% - 5px), #58D0F1 calc(100% - 5px), #58D0F1 100%);
                }
            }
            .line{
                position:absolute;top:10px;right:0;border:1px solid rgba(255, 255, 255, .2);z-index:9;
            }
        }
    }
</style>