<template>
    <DatePicker :style="styles" class="datepicker" :type="type?type:'date'"  :value="value?value:''" :placement="placement?placement:'bottom-start'"
                :placeholder="placeholder?placeholder:'时间'" :split-panels="splitpanels?splitpanels:false"
                v-model="times" :format="format?format:'yyyy-MM-dd'" :clearable="false"
                v-on:on-change="Rerender" :editable="false"  ></DatePicker>
</template>

<script>
    export default {
        name: "DatePickers",
        data(){
            return{
                times:this.value
            }
        },
        props:['type','value','vmodal','placement','placeholder','splitpanels','styles','format'],
        methods:{
            Rerender(){
                let time = this.$el.querySelector('input').value;
                this.$emit('on-change',time)
            }
        }
    }
</script>

<style scoped>
    .datepicker{position: relative;}
    .datepicker:after{
        content: '';
        display: inline-block;
        vertical-align: middle;
        margin-top: 8px;
        margin-left: 8px;
        width: 0;
        height: 0;
        border-width: 8px;
        border-style: solid;
        border-color: #aad0ff transparent transparent transparent;
        position: absolute;
        top: 7.5px;
        right: 10px;
    }
</style>