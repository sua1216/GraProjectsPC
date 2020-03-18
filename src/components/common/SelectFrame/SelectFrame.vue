<template>
    <div @blur="hidelist" tabindex="1" :style="{
        width:width+'px',
        height:height+'px',
        fontSize:selectFrameStyle.fontSize?selectFrameStyle.fontSize+'px':''
    }" class="select-frame">
        <div  :style="{
            height:height+'px'
        }"
             @click="toggleList" class="select-content">

            <p>{{selectLabel}}</p>
            <span :style="{
                transition:'all .2s linear',

                transform:`rotate(${!listShow ? '90deg' : '0deg'})`
            }"></span>
        </div>
        <transition-group name="select-list" tag="ul" v-show="listShow"  class="select-list">
            <li :style="{
                height:height+'px',
                width:width+'px',
                lineHeight:height+'px'
            }" @click="changeSelect(i)"
                v-for="(list,i) in lists" :key="list.label+i">
                {{list.label}}
            </li>
        </transition-group>
    </div>
</template>
<script>
    export default {
        name:'select-frame',
        data(){
            return {
                listShow:false,
                selectLabel:'全部',
                selectValue:''
            }
        },
        watch:{
            lists(){
                this.selectLabel = this.lists[0].label;
                this.selectValue = this.lists[0].value
            }
        },
        props:{
            width:Number,
            height:Number,
            lists:Array,
            selectFrameStyle:{
                type:Object,
                default(){
                    return {
                        fontSize:10,
                        fontColor:'white'
                    }
                }
            }
        },
        methods:{
            toggleList(){
                this.listShow = !this.listShow
            },
            changeSelect(i){

                this.selectValue = this.lists[i].value
                this.selectLabel = this.lists[i].label

                this.listShow = false
                this.$emit('getValue',this.selectValue,this.selectLabel)
            },
            hidelist(){
                this.listShow=false;
            }
        }
    }
</script>
<style lang="scss">
    .select-frame{
        box-shadow: inset 0 0 20px 0 #FF614D;border-radius:5px;background:rgba(71,22,16,0.95);position:relative;
        color:white;
        .select-content{
            display:table;text-align: center;width:100%;cursor:pointer;user-select:none;border: 1px solid #FF5944;height:100%;
            p{
                width:100%;display:table-cell;vertical-align: middle;overflow:hidden;padding-right: 16px;
            }
            span{
                content:'';margin-top:8px;margin-left:8px;border-width:8px;border-style:solid;border-bottom:0px;border-color: #aad0ff transparent transparent transparent;position: absolute;top: 7.5px;right: 10px;
            }
        }
        .select-list{
            transition:all .2s linear;position:absolute;   background:rgba(71,22,16,0.95);border: 1px solid #FF5944;margin-top: 10px;z-index:10;
            height: 330px;overflow-y: auto;
            li{
                transition:all .2s linear;text-align: center;list-style:none;
                &:hover{
                    color: #fff;cursor:pointer;
                }
            }
        }
    }
</style>