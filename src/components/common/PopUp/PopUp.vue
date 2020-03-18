<template>
    <div :style="maskStyle" class="pop-up-mask" ref="mask">
        <div :style="{width:width+'px',height:height+'px',marginTop:(windowHeight-height)/2+'px'}" class="pop-up-content" ref="content">
            <slot></slot>
            <span @click="close" class="fa fa-close"></span>
        </div>
    </div>
</template>
<script>
    /*
        弹窗组件使用文档
            弹窗组件需要id来区分不同的组件渲染
            弹窗组件如果需要再次弹出，建议重写弹窗组件
    */
    //操作一级组件，一级组件列表
    export default {
        name:'popup',
        data(){
            return {
                windowWidth:window.innerWidth,
                windowHeight:window.innerHeight,
                maskStyle:{
                    width:window.innerWidth+'px',
                    height:window.innerHeight+'px'
                }
            }
        },
        props:{
            width:Number,
            height:Number,
            flag:Boolean
        },
        components:{

        },
        watch:{
            windowWidth(){
                console.log('hello')
                this.set('maskStyle','width',window.innerWidth)
                this.set('maskStyle','height',window.innerHeight)
            },
            windowHeight(){
                this.set('maskStyle','width',window.innerWidth)
                this.set('maskStyle','height',window.innerHeight)
            }
        },
        methods:{
            init(){
                window.onresize = () => {
                    this.windowWidth = window.innerWidth
                    this.windowHeight = window.innerHeight
                }
            },
            close(){
                //关闭弹窗，触发父级的事件
                this.$emit('close')
            }
        },
        mounted(){
            this.init()
        }

    }
</script>
<style lang="scss">
    @import '../../../../node_modules/font-awesome/css/font-awesome.css';
    .pop-up-mask{
        position:fixed;top:0;left:0;background:rgba(0,0,0,.8);
        .pop-up-content{
            position:relative;margin:auto;background:rgb(2, 19, 47);border-radius:20px;border:1px solid rgb(110, 194, 255);overflow:auto;color:white;
            span{position:absolute;right:10px;top:5px;}
        }

    }

</style>