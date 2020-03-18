<template>
    <div class="KeHeOne">
        <div class="county">
            <p class="title" style="  font-size:24px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:30px;opacity:0.8">中心党组织  <span>TOP 3</span></p>
            <div v-for="(l,i) in rank.county" :key="i" class="bar-container">
                <KeHeTwo :d="l" :i="i" />
            </div>
        </div>
        <div class="town">
            <p class="title" style="  font-size:24px;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:30px;opacity:0.8">成员党组织  <span>TOP 3</span></p>
            <div v-for="(l,i) in rank.town" :key="i" class="bar-container">
                <KeHeTwo :d="l" :i="i" />
            </div>
        </div>
    </div>
</template>

<script>
   import KeHeTwo from "./KeHeTwo.vue";
    export default {
        name: "KeHeOne",
        data() {
            return {
                rank: {},
            }
        },
        components: {
            KeHeTwo
        },
        methods: {
              req(){
                this.axios({
                    url:window.baseURL + '/officeAssets'
                }).then(d => {
                    this.rank = d.data
                    //追加颜色
                    let color1 = [
                        ['rgba(204, 11, 6, 0)','rgba(204, 11, 6, 1)'],
                        ['rgba(203, 72, 20, 0)','rgba(203, 72, 20, 1)'],
                        ['rgba(255, 225, 40, 0)','rgba(255, 225, 40, 1)']
                    ]
                    let color2 = [
                        ['rgba(4, 130, 226, 0)','rgba(4, 130, 226, 1)'],
                        ['rgba(20, 165, 203, 0)','rgba(20, 165, 203, 1)'],
                        ['rgba(137, 152, 161, 0)','rgba(137, 152, 161, 1)']
                    ]
                    for(let i in this.rank){
                        for(let j in this.rank[i]){
                            if(i == 'county'){
                                this.rank[i][j].color = color1[j]
                            }
                            if(i == 'town'){
                                this.rank[i][j].color = color2[j]
                            }
                        }
                    }
                })
            }
        },
            mounted() {
                    this.req()
            }
        }

</script>

<style lang="scss" scoped>
    .KeHeOne{
        display:flex;justify-content:space-between;width:514px;
        margin-top: 15px;
        .county{
            margin-right: 50px;
        }
        .title{

            span{
                margin-left: 40px;
            }
        }
        .bar-container{margin:20px 0;
        }
    }
</style>