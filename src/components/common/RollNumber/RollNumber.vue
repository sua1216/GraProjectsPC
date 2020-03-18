<template>
    <transition-group name="list" class="container" :style="'height:'+height+'px;line-height:'+height+'px;'">
        <div v-for="(vl,key) of val" v-bind:key="key">
            <div :style="'transform: translateY('+calTransition(vl)+'px);transition:all 2s;height:'+height+'px'">
                <div v-for="el of all" v-bind:key="el">{{el}}</div>
            </div>
        </div>
    </transition-group>
</template>

<script>
    export default {
        name: "RollNumber",
        data(){
            return{
                all:[9,8,7,6,5,4,3,2,1,0,'.'],
                val:""+this.value,
            }
        },
        props:{
            value:[String, Number],
            height:Number
        },
        methods:{
            calTransition:function (vl) {
                let height = this.height;
                if(vl=='.'){
                    return -height*10
                }else{
                    vl = Number(vl)
                    return -height*(9-vl)
                }
            }
        },
        watch:{
            value:function(newval){
                newval = newval+"";
                this.val =  newval
            }
        }
    }
</script>

<style scoped lang="scss">
.container{
    display: flex;overflow: hidden;
}
.list-item {
    display: inline-block;
    margin-right: 10px;
}
.list-enter-active, .list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-to{
    opacity: 0;
    transform: translateY(40px);
}
</style>