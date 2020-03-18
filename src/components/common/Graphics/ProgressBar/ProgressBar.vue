<template>
    <div :style="{
        width:width + 'px',
        height:height + 'px'
    }" class="progress-bar">
        <div :style="{
            fontSize : fontSize + 'px'
        }" class="header-title">
            <span v-show="rankNum">{{i+1}}</span>
            <span>{{l.name}}</span>
        </div>
        <div class="progress">
            <div :style="{
                        height:height + 'px',
                        width:(max == 0 ? 0 : (l.value / max * 100)) + '%'
                    }" :class="{'full':true,'yellow':rank ? (i<3) : false,'blue':rank ? (i>=3) : true}"></div>
            <div :style="{
                        top:(height - 2) / 2 + 'px',
                        width:(max == 0 ? 0 : (100 - l.value / max * 100)) + '%'

                    }" class="lines"></div>
        </div>
        <div :style="{
            fontSize:fontSize + 'px'
        }" class="data">
            <span>{{l.value}} {{ l.unit ? l.unit : '' }}</span>
            <span v-if="percent">({{l.percent}}%)</span>
        </div>
        <div class="btn" v-if="isBtn">
            <p @click="handler" :class="{'xb_icon shuliang':popup}"></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        props:{
            width:Number,
            height:Number,
            fontSize:{
                type:Number,
                default:24,
            },
            l:Object,
            i:Number,
            max:Number,
            rank:Boolean,
            rankNum:{
                type:Boolean,       //默认有,
                default(){
                    return true
                }
            },
            popup:{
                type:Boolean,       //默认有,
                default(){
                    return true
                }
            },
            percent:{
                type:Boolean,       //默认有,
                default(){
                    return true
                }
            },
            isBtn:{
                type:Boolean,       //默认有,
                default(){
                    return true
                }
            },
        },
        methods:{
            handler(){
                this.$emit('popupHandler')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .progress-bar{
        display:flex;
        &>div{
            margin:0 10px;
        }
        .header-title{
            /*line-height:30px;*/
            &>span{
                &:nth-child(1){
                    color:rgba(255, 195, 106, 1);padding:0 10px;display:inline-block;width:50px;
                }
                &:nth-child(2){
                    color:white;
                }
            }
        }
        .progress{
            flex-grow: 1;position:relative;
            .full{
                position:absolute;top:0;left:0;transition:all .2s linear;
            }
            .lines{
                position:absolute;right:0;height:2px;background:rgba(255, 255, 255, .2);
            }
            .yellow{
                background:linear-gradient(to right,rgba(255, 179, 57, 0.05) 0, rgba(255, 179, 57, 0.9) calc(100% - 10px), #FFC36A calc(100% - 10px), #FFC36A 100%);
            }
            .blue{
                background:linear-gradient(to right ,rgba(4, 130, 226, 0.05) 0, rgba(4, 130, 226, 0.9) calc(100% - 10px), #00B7EE calc(100% - 10px), #00B7EE 100%)
            }
        }
        .data{

        }
        .btn{
            p{
                color:#5A8ED0;cursor:pointer;
            }
        }
    }
</style>