<template>
    <div :style="{
        width:width + 'px',
        height:height + 'px',
        background:state ? color[1] : color[0]
    }" class="slide-bar" @click="toggle">
        <div :style="{
            width:height - 4 + 'px',
            height:height - 4  +'px',
            transform:'translateX('+(state ? (width-height-2 + 'px') : '2px')+')'
        }" :a="state" class="bar-ball"></div>
    </div>
</template>
<script>
    export default {
        name:'',
        props:{
            initState:Boolean,
            width:Number,
            height:Number,
            color:Array
        },
        data(){
            return {
                state:this.initState
            }
        },
        methods:{
            toggle(status){
            	if(status==false){
		            this.state = false;
		            this.$emit('toggle',this.state)
					return
				}
                this.state = !this.state
                this.$emit('toggle',this.state)
            }
        }
    }
</script>
<style lang="scss">
    .slide-bar{
        background:black;border-radius:100px;transition:all .2s linear;border:2px solid rgba(255,249,244,0.5);
        .bar-ball{background:white;border-radius:50%;transition:all .2s linear;border:1px solid rgba(0,0,0,.2);};
    }
</style>