<template>
    <transition name="fades">
    <div class="img-gallery" :style="{
        width:wid+'px',
        height:hei+'px'
    }">
        <i class="ivu-icon ivu-icon-ios-close imgclose" @click="close"></i>
        <div class="img-gallery-pic-show" @mousewheel.native="wheel($event)">
            <!-- 用于图片展示 -->
            <img class="placeholder" ref="placeholder" @load="setwidth" style="visibility:hidden;" :src="lists[0]" />
            <transition-group tag="ul" name="gallery">
                <li :style="{
                    left:placeholderLeft+'px'
                }" v-show="i==index" v-for="(item,i) in lists" :key="item+i">
                    <div class="img-holder" @mousemove.stop="dragit($event)" @mouseleave="dragstart=false" @mouseup="dragstart=false" >
                        <img :style="'width:'+placeholderWidth+'px;transform: scale('+scale+') rotate('+rotate+'deg);left:'+dragleft+'px;top:'+dragtop+'px;'+
                        (refresh?'transition:all .38s;':'')"
                           draggable="true"  @mousedown.stop="draginit($event)" @contextmenu.prevent="rightclick"  @mouseup.stop="dragstart=false" :src="item" >
                    </div>

                </li>
            </transition-group>
            <div @click="toggle($event)" class="operation">
                <span data-ac="prev" class="prev">
                    <img data-ac="prev" src="data:image/png;base64,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" alt="">
                </span>
                <span data-ac="next" class="next">
                    <img data-ac="next" src="data:image/png;base64,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" alt="">
                </span>
            </div>
        </div>
        <div class="img-gallery-pic-map">
            <!-- 用于查看缩略图 -->
            <ul @click="changePic($event)">
                <li :style="{
                    opacity:i==index?1:0.4
                }" v-for="(item,i) in lists" :key="i">
                    <div class="small-img-box">
                        <img :data-index="i" :src="item">
                    </div>
                </li>
            </ul>
        </div>

    </div>
    </transition>
</template>

<script>
    export default {
        name:'img-gallery',
        props:{
            lists:Array,
            i:Number,
        },
        data(){
            return {
                index:0,
                windowWidth:window.innerWidth,
                windowHeight:window.innerHeight,
                placeholderLeft:0,
                placeholderWidth:0,
                enter:false,
                scale:1,
                rotate: 0,
                dragstart:false,
                dragleft:0,
                dragtop:0,
                last:{x:0,y:0},
                refresh:false
            }
        },
        computed:{
            wid(){
                return this.width?this.width:this.windowWidth
            },
            hei(){
                return this.height?this.height:this.windowHeight
            }
        },
        methods:{
            toggle(e){
                if(e.target.dataset.ac){/*上一张下一张*/
                    let ac = e.target.dataset.ac;
                    if(ac == 'prev')
                        this.index--;
                    if(ac == 'next')
                        this.index++;
                    this.index = (this.index+this.lists.length) % this.lists.length;
                    this.refresh=true;
                    this.$nextTick(()=>{
                        this.dragtop=0;
                        this.dragleft=0;
                        this.scale=1;
                        this.$nextTick(()=>{
                            this.refresh=false;
                        })
                    })

                }
            },
            changePic(e){/*点击缩略图*/
                if(e.target.dataset.index){
                    let i = e.target.dataset.index;
                    this.index = i;
                    this.refresh=true;/*恢复图片初始位置*/
                    this.$nextTick(()=>{
                        this.dragtop=0;
                        this.dragleft=0;
                        this.scale=1;
                        this.$nextTick(()=>{
                            this.refresh=false;
                        })
                    })
                }
            },
            close:function () {/*触发close事件，调用父组件相应方法关闭*/
                this.$emit('close')
            },
            setwidth:function () {/*设置图片宽度，可省略*/
                this.$nextTick(()=>{
                    this.placeholderLeft = this.$refs.placeholder.offsetLeft;
                    this.placeholderWidth = this.$refs.placeholder.offsetWidth;
                })
                
            },
            wheel:function (e) {/*滚轮放大缩小*/
                let times = -Number(Number(e.deltaY)/1000);
                if(this.scale<=0.3&&times<0||this.scale>=3&&times>0){return}
                this.scale =Number(this.scale)+times;
                this.scale = Number(this.scale).toFixed(2);
            },
            draginit:function(e){/*点击图片准备拖动，更改拖动状态*/
                e.preventDefault && e.preventDefault();/*阻止图片被拖动的默认事件*/
                this.dragstart=true;
                this.last.x=e.clientX;
                this.last.y=e.clientY;
            },
            dragit:function (e) {/*拖动开始，更改位置*/
                e.stopPropagation();
                if(!this.dragstart){return}
                this.dragleft += e.clientX-this.last.x;
                this.dragtop += e.clientY-this.last.y;
                this.last.x=e.clientX;
                this.last.y=e.clientY;
            },
            rightclick:function(){
                this.rotate+=90
            }
        },
        mounted(){
            if(this.i){this.index=this.i}
            window.addEventListener('mousewheel',this.wheel,false)
            window.onresize = () => {
                this.windowWidth = window.innerWidth;
                this.windowHeight = window.innerHeight;
                this.placeholderLeft = this.$refs.placeholder.offsetLeft;
                this.placeholderWidth = this.$refs.placeholder.offsetWidth;
            }
        }
    }
</script>

<style scoped lang="scss">
    @keyframes fadeins {
        from{opacity: 0}
        to{opacity: 1}
    }
    .img-gallery{
        position:fixed;top:0;left:0;background:rgba(0,0,0,.8);z-index:1000;animation: fadeins .5s;
        .img-gallery-pic-show{
            position:relative;width: 100%;height: 80%;
            ul{
                position:absolute;top:0;left:0;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;
                li{
                    position: absolute;width: 80%;justify-content: center;left: 10%!important;text-align: center;height: 80%;list-style: none;
                    .img-holder{
                        width: 100%;height: 100%;overflow: hidden;
                        img{
                            width: fit-content!important;height: 100%;object-fit: contain;transition: all 0s,transform .38s;position: relative;
                        }
                    }
                }
            }
            // 动画
            .gallery-enter{opacity:0;transform:scale(0,0);transform:translateY(-100%)}
            .gallery-enter-to{transition:all .5s linear;opacity:1;transform:scale(1,1)}
            .gallery-leave-to{opacity:0;transform:scale(0,0);transition:all .5s ease-in;}
            .gallery-leave{opacity:1;}

            .operation{
                span{
                    position:absolute;margin-top:-100px;cursor:pointer;
                    &.prev{top:50%;left:0;}
                    &.next{top:50%;right:0;}
                }
            }
        }
        .img-gallery-pic-map{
            margin-top:100px;
            ul{
                display:flex;justify-content:center;
                li{
                    list-style:none;margin:0 20px;width:100px;height:100px;transition:all .2s linear;cursor:pointer;
                    .small-img-box{
                        width:100px;height: 100%;
                        img{width: 100%;height: 100%;object-fit: cover}
                    }

                }
            }
        }
        .imgclose{
            position: absolute;right: 0;top: 0;z-index: 2000;cursor: pointer;
        }
    }
.fades-enter,.fades-leave-to{
    opacity: 0;
}
.fades-enter-to,.fades-leave{
    opacity: 1;
}
.fades-enter-active,.fades-leave-active{
    transition: all .5s;
}
</style>