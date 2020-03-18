<template>
    <div class="case-list-item">
        <div class="ico">
            <img :src="o.icon">
        </div>
        <div class="ct-info">
            <div class="top">
                <span>{{o.type}}</span>
                <span :style="{
                    border:o.state == 1 ? '2px solid #FFC820' : '2px solid #FF4A12'
                }">{{o.state == 1 ? '处置中' : '待处置'}}</span>
            </div>
            <div class="bottom">
                <p>{{o.addr}}</p>
                <p>{{o.time}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'',
        props:{
            o:Object
        },
        data(){
            return {

            }
        }
    }
</script>
<style lang="scss">
    .case-list-item{
        width:550px;height:120px;display:flex;border-top:1px solid rgba(255, 255, 255, .1);
        .ico{
            width:110px;height:110px;padding:20px;
            img{
                width:80px;height:80px;
            }
        }
        .ct-info{
            flex-grow: 1;
            div{
                display:flex;justify-content: space-between;color:white;align-items:center;height:60px;
                &:nth-child(1){
                    span{
                        margin:0 5px;
                        &:nth-child(1){
                            font-size:24px;font-weight: bold;
                        }
                        &:nth-child(2){
                            padding:1px 5px ;border-radius:5px;
                        }
                    }
                }
                &:nth-child(2){
                    p{
                        font-size:20px;margin:0 5px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
                        &:nth-child(1){
                            font-size:20px;color:rgba(255, 255, 255, .75);width:250px;
                        }
                        &:nth-child(2){
                            color:rgba(255, 255, 255, .5)
                        }
                    }
                }
            }
        }
    }
</style>