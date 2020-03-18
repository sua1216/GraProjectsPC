<template>
    <div class="citizen-progress-bar">
        <div class="title">
            <p :class="[i==0||i==1||i==2?'p1':'']">{{i+1}}</p>
            <p>{{d.name}}</p>
            <p>{{d.score}}</p>
            <p style="font-size: 18px">({{d.percent}}%)</p>
        </div>
        <div class="bar">
            <div :style="{
                width:(315-d.score)/315*100 + '%'
            }" class="liner"></div>
            <div :style="{
                width:d.score/315*100 + '%',
                background:`linear-gradient(to right,${d.color[0]},${d.color[1]})`
            }" class="full"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "KeHeTwo.vue",
        created() {
            /* console.log(111111111111111111111,this.d)
             console.log(222222222222222222222,this.i)*/
        },
        props: {
            d: Object,
            i: Number
        },
        computed: {}
    }
</script>

<style lang="scss" scoped>
    .citizen-progress-bar {
        width: 580px;
        height: 50px;
        margin-bottom: 32px;
        .title {
            display: flex;
            justify-content: space-between;
            height: 40px;

            p {
                font-size: 24px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 30px;
                opacity: 0.8;

                &:nth-child(2) {
                    width: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: rgba(255,255,255,0.8);
                }

                &:nth-child(3) {
                    width: 50px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: right;
                    color: rgba(255,255,255,0.9);
                }
            }

            p:nth-child(1) {
                font-weight: bold;
                flex: 0.48;
                text-align: center;
                color: #FCC292;
            }

            p:nth-child(2) {
                margin-left: 10px;
                flex: 5;
            }

            p:nth-child(3) {
                flex: 1;
                font-weight: bold;
            }

            p:nth-child(4) {
                margin-left: 5px;
            }

        }

        .bar {
            height: 20px;
            position: relative;

            .full {
                height: 10px;
                position: absolute;
                top: 0;
                left: 0;
                background: linear-gradient(to right, RGBA(212, 80, 38, 0), RGBA(212, 80, 38, 1));
                border-radius: 1px;
                z-index: 10;
                transition: all .2s linear;
                border: 1px solid rgba(255,255,255,0.2);
            }

            .liner {
                position: absolute;
                top: 4px;
                right: 0;
                border: 1px solid rgba(255, 255, 255, .05);
                z-index: 9;
            }
        }
    }

    .p1 {
        background-image: url("../../../../public/images/point_wgjs_zhzx@2x.png");
        background-repeat: no-repeat;
        background-size: 37px 40px;
        background-position: 0 -5px;
    }

</style>