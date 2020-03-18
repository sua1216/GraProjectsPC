<template>
    <div class="real-time-case-list-item">
        <div class="ico">
            <img :src="o.icon">
        </div>
        <div class="ct-info">
            <div class="top">
                <p>
                    <span>{{o.type}}</span>
                    <span :style="{
                        border:o.state == 1 ? '2px solid #FFC820' : '2px solid #FF4A12'
                    }">{{o.state == 1 ? '立案' : '发现'}}</span>
                </p>
                <p>{{o.name}}</p>
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
        name:'RealTimeCaseListItem',
        props:{
            o:Object
        }
    }
</script>
<style lang="scss">
    .real-time-case-list-item{
        width:555px;height:120px;background:black;display:flex;border-top:1px solid rgba(255, 255, 255, .1);
        .ico{
            width:120px;height:120px;
            img{
                width:80px;height:80px;background:pink;margin:20px;
            }
        }
        .ct-info{
            flex-grow: 1;
            p{
                overflow:hidden;text-overflow:ellipsis;white-space: nowr
            }
            div{
                display:flex;justify-content: space-between;color:white;align-items:center;height:60px;
                &.top{
                    p{
                        margin:0 10px;display:flex;align-items:center;
                        &:nth-child(1){
                            font-size:24px;font-weight: bold;
                            span{
                                &:nth-child(2){
                                    font-size:14px;
                                    border:1px solid #FF4A12;padding:1px 5px ;border-radius:5px;font-weight:normal;margin-left:25px;padding:1px 10px;
                                }
                            }
                        }

                    }
                }
                &.bottom{
                    p{
                        margin:0 10px;
                        &:nth-child(1){
                            font-size:20px;color:rgba(255, 255, 255, .75);width:230px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
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