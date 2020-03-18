<template>
    <div class="keHeTwo">
        <div class="title">
            <p>NO.{{i+1}}</p>
            <p>{{d.name}}</p>
            <p>{{d.score}}</p>
        </div>
        <div class="bar">
            <div :style="{
                width:100 - d.score + '%'
            }" class="liner"></div>
            <div :style="{
                width:d.score + '%',
                background:`linear-gradient(to right,${d.color[0]},${d.color[1]})`
            }" class="full"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "KeHeTwo.vue",
        created(){
           /* console.log(111111111111111111111,this.d)
            console.log(222222222222222222222,this.i)*/
        },
        props:{
            d:Object,
            i:Number
        },
        computed:{
            color(){
                if(this.i == 0){
                    return `linear-gradient(to right,rgba(212, 80, 38, 0),rgba(212, 80, 38, 1))`
                }
                if(this.i == 1){
                    return `linear-gradient(to right,rgba(212, 80, 38, 0),rgba(212, 80, 38, 1))`
                }
                if(this.i == 2){
                    return `linear-gradient(to right,rgba(212, 80, 38, 0),rgba(212, 80, 38, 1))`
                }
                return null
            }
        }
    }
</script>

<style lang="scss" scoped>
    .keHeTwo{
        width:250px;height:50px;
        .title{
            display: flex;justify-content: space-between;height:30px;
            p{
                font-size:20px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:30px;
                opacity:0.4;
                &:nth-child(2){
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
                height:20px;position:absolute;top:0;left:0;background:linear-gradient(to right,RGBA(212, 80, 38, 0),RGBA(212, 80, 38, 1));border-radius:1px;z-index:10;transition:all .2s linear;
            }
            .liner{
                position:absolute;top:10px;right:0;border:1px solid rgba(255, 255, 255, .2);z-index:9;
            }
        }
    }
</style>