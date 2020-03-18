<template>
    <div class="normalModal">
        <Modal class="normalModal" v-model="md" scrollable :width="width" v-on:on-cancel="cancelit" :z-index="zIndex?zIndex:2000" >
            <slot></slot>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "NormalPopUp",
        props:['width','zIndex','modal'],
        data:function(){
            return{
                md:false
            }
        },
        mounted(){
            this.md = true
        },
        methods:{
          cancelit(){
              this.$emit('close')
          }
        }
    }
</script>

<style scoped lang="scss">
.normalModal/deep/.ivu-modal{
    margin-top: 250px;
    padding: 0;
    &:before,&:after{
        display: none;
    }
    .ivu-modal-content:before,.ivu-modal-content:after{
        display: none;
    }
}
</style>