<template>
    <!--二级网格考试排名-->
    <div class="er-ji-wang-ge-kao-shi-pai-ming">
        <div style="font-size: 28px;margin: 13px 0px 10px 10px;font-weight: bold;">二级网格考核排名 TOP10</div>
        <div class="content">
            <div class="left">
                <div v-for="(item,key) in data1" :key="key">
                    <Jindutiao :dataLi="item"></Jindutiao>
                </div>
            </div>
            <div class="right">
                <div v-for="(item,key) in data2" :key="key+'--'">
                    <Jindutiao :dataLi="item"></Jindutiao>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Jindutiao from "./Jindutiao.vue"
    export default {
        name: "Erjiwanggekaoshipaiming",
        data(){
            return {
                data3:[
                    {ranking:1,city:"楚雄市",num:98,percent:"98%"},
                    {ranking:2,city:"姚安县",num:97,percent:"97%"},
                    {ranking:3,city:"永仁县",num:96,percent:"96%"},
                    {ranking:4,city:"元谋县",num:95,percent:"95%"},
                    {ranking:5,city:"武定县",num:94,percent:"94%"},
                ],
                data4:[
                    {ranking:6,city:"禄丰县",num:93,percent:"93%"},
                    {ranking:7,city:"大姚县",num:92,percent:"92%"},
                    {ranking:8,city:"牟定县",num:91,percent:"91%"},
                    {ranking:9,city:"双柏县",num:90,percent:"90%"},
                    {ranking:10,city:"南华县",num:90,percent:"90%"}
                ],
                data5:[
                    {ranking:1,city:"鹿城镇",num:99,percent:"99%"},
                    {ranking:2,city:"东瓜镇",num:99,percent:"99%"},
                    {ranking:3,city:"紫溪镇",num:97,percent:"97%"},
                    {ranking:4,city:"三街镇",num:96,percent:"96%"},
                    {ranking:5,city:"八角镇",num:95,percent:"95%"},
                ],
                data6:[
                    {ranking:6,city:"中山镇",num:95,percent:"95%"},
                    {ranking:7,city:"大过口乡",num:93,percent:"93%"},
                    {ranking:8,city:"新村镇",num:93,percent:"93%"},
                    {ranking:9,city:"子午镇",num:91,percent:"91%"},
                    {ranking:10,city:"吕合镇",num:90,percent:"90%"}
                ],
            }
        },
        components:{
            'Jindutiao':Jindutiao
        },
        computed:{//实时监听store中的对应数据
            data1(){
                var num = this.$store.state.num;
                var list="";
                if(num==2){
                    list=this.data3
                }else if(num==3){
                    list=this.data5
                }
                return list;
            },
            data2(){
                var num = this.$store.state.num;
                var list="";
                if(num==2){
                    list=this.data4
                }else if(num==3){
                    list=this.data6
                }
                return list;
            }
        }
    }
</script>

<style scoped>
    .content {
        display: flex;
    }
    .left {
        flex: 1;
        margin: 10px;
        /*border: 1px solid #ccc;*/
    }
    .right {
        flex: 1;
        margin: 10px;
        /*border: 1px solid #ccc;*/
    }
</style>