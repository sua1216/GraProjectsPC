<template>
    <div class="unit-rank">
        <div class="county">
            <div v-for="(l,i) in rank.county" :key="i" class="bar-container">
                <KeHeTwo :d="l" :i="i"/>
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
            req() {
                var sum = 315;

                var arr = [];

                arr.push((88/sum*100).toFixed(2))
                arr.push((66/sum*100).toFixed(2))
                arr.push((60/sum*100).toFixed(2))
                arr.push((57/sum*100).toFixed(2))
                arr.push((47/sum*100).toFixed(2))

                var obj = {
                    county: [
                        {
                            "color": ["#E27D23", "rgb(97,71,56)"],
                            name: "市容环境",
                            score: 88,
                            percent:arr[0]
                        },
                        {
                            "color": ["#E27D23", "rgb(97,71,56)"],
                            name: "宣传广告",
                            score: 66,
                            percent:arr[1]
                        },
                        {
                            "color":
                                ["#E27D23", "rgb(97,71,56)"],
                            name:"街面秩序",
                            score:60,
                            percent:arr[2]
                        },
                        {
                            "color": ["rgba(255,255,255,0.6)", "rgb(74,80,89)"],
                            name: "施工管理",
                            score: 57,
                            percent:arr[3]
                        },
                        {
                            "color": ["rgba(255,255,255,0.6)", "rgb(74,80,89)"],
                            name: "市场管理",
                            score: 47,
                            percent:arr[4]
                        }
                    ]
                }
                //console.log(obj)
                this.rank = obj;
            }
        },
        mounted() {
            this.req()
        }
    }

</script>

<style lang="scss" scoped>
    .unit-rank {
        width: 580px;
        margin-top: 10px;

        .title {
            span {
                margin-left: 40px;
            }
        }

        .bar-container {
            margin: 20px 0;
        }
    }
</style>