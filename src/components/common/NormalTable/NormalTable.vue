<template>
    <div class="line-table" :style="{
        width:width+'px',
        height:height+'px'
    }">
        <div class="header">
            <div>
                <h1 :style="{
                    fontSize:tableStyle.titleSize?tableStyle.titleSize+'px':''
                }">{{header}}</h1>
            </div>
            <div>
                <slot name="head"></slot>
            </div>
        </div>
        <table :style="styles">
            <thead>
                <slot name="thead"></slot>
            </thead>
            <tbody v-if="tbody" :style="{
                textAlign:tableStyle.contentAlign?tableStyle.contentAlign:'left'
            }">
            <tr @click="operation($event)" v-for="(data,i) in decorationLists" :key="i">
                <td v-for="(v,k) in data" :key="k" :v="v" :k="k">
                    <span :data-id="data['id']" :data-ac="k" v-if="k!='id'">{{v}}</span>
                </td>
            </tr>
            </tbody>
            <tbody v-if="!tbody">
                <slot name="tbody"></slot>
            </tbody>
        </table>
        <div class="footer">
            <div @click="change($event)">
                <p v-show="page>1" data-ac="prev">上一页</p>
                <p data-ac="next">下一页</p>
            </div>
        </div>
    </div>
</template>

<script>
    /*
        width:Number                    //表格容器的宽度
        height:Number                   //表格容器的高度
        header:String                   //表格标题
        tableHead:Array                 //thead内容
        content:Array                   //tbody内容
        tableStyle:{
            titleSize:Number            //标题字体大小
            titleAlign:String,          //标题对齐方式,
            contentAlign:String         //表格内容对齐方式
        }
     */
    export default {
        name:'',
        data(){
            return {
                page:1,
                decorationHead:[],
                decorationLists:[]
            }
        },
        props:{
            width:Number,
            height:Number,
            header:String,
            tableHead:Array,
            content:Array,
            tbody:Boolean,
            styles:String,
            tableStyle:{
                type:Object,
                default(){
                    return {
                        height:0,
                        scroll:true,
                        titleSize:48,
                        titleAlign:'left'
                    }
                }
            }
        },
        watch:{
            content(){
                this.decorationLists = []
                for(let i in this.content){
                    this.decorationLists.push(this.content[i])
                }
            }
        },
        methods:{
            init(){
                this.decorationLists = []
                for(let i in this.content){
                    this.decorationLists.push(this.content[i])
                }
            },
            change(e){
                if(e.target.dataset.ac){
                    let ac = e.target.dataset.ac
                    if(ac == 'prev'){
                        this.page--;
                    }
                    if(ac == 'next'){
                        this.page++;
                    }
                    this.$emit('change',this.page)
                }
            },
            operation(e){
                console.log(e.target.dataset);
                if(e.target.dataset.ac){
                    let ac = e.target.dataset.ac
                    if(ac == 'operation'){
                        let casetype = e.target.parentNode.parentNode.querySelector('[data-ac="type"]').innerHTML;
                        this.$emit('operation',e.target.dataset.id,casetype)
                    }
                }
            }
        },
        mounted(){
            this.init()
        }
    }
</script>

<style scoped lang="scss">
    .line-table{
        margin:0 auto;color:white;overflow: hidden;overflow-y: auto;padding-right: 35px;
        .header{
            display:flex;align-items:center;justify-content: space-between;margin:0 20px;
            div{
                &:nth-child(1){
                    h1{color:#d6e9ff;text-align: left;text-shadow:0 0 20px #145f87, 0 0 20px #145f87, 0 0 20px #145f87;}
                }
                &:nth-child(2){

                }
            }
        }
        table{
            font-size:18px;border-collapse: collapse;width:100%;
            thead{
                tr{border-bottom:2px solid white;height:55px;color:#2ACEFF;}
            }
            tbody{
                tr{
                    &:last-child{border-bottom:1px solid white;}
                    border-bottom:1px dashed white;height:55px;
                    td{
                        margin:10px 0;text-align: center;
                        &:last-child{
                            span[data-ac='operation']{background:#173c51;padding:5px 10px;border:1px solid #42647c;border-radius:6px;}
                        }
                    }
                }
            }
        }
        .footer{
            margin:20px 0;
            &>div{
                width:500px;height:32px;line-height:32px;margin:auto;display: flex;justify-content: center;vertical-align:bottom;
                p{margin:0 10px;cursor:pointer;user-select:none;}
            }
        }
    }
</style>