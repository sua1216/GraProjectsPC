<template>
    <div class="grid-right">
        <div class="bk">
        <div class="daohang-right">
            <div class="daohang-right-line">

            </div>
            <ul>

                <li v-for="(item,index) in dataSource" :key="'data_list_' + index" @click="change(index, item)">
                    <div class="light-icon">
                        <div class="svg">
                            <svg>
                                <!--动画-->
                                <g class="animate">
                                    <circle cx="20" cy="45" r="5" fill="#FFC435FF" style="fill-opacity:1">
                                        <animate attributeName="r" from="5" to="20" dur="3s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" from="1" to="0" dur="3s"
                                                 repeatCount="indefinite"/>
                                    </circle>
                                </g>
                                <g class="animate">
                                    <circle cx="20" cy="45" r="5" fill="#FFC435FF" style="fill-opacity:1">
                                        <animate attributeName="r" from="5" to="20" dur="3s" begin="1.5s"
                                                 repeatCount="indefinite"/>
                                        <animate attributeName="opacity" from="1" to="0" dur="3s" begin="1.5s"
                                                 repeatCount="indefinite"/>
                                    </circle>
                                </g>
                                <!--气泡-->
                                <g>
                                    <circle cx="20" cy="45" r="5" fill="#FFC435FF" style="fill-opacity:1"></circle>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="changzhu">
                        <svg>
                            <!--动画-->
                            <g class="animate">
                                <circle cx="20" cy="45" r="7" fill="#FEFFFEFF" style="fill-opacity:.5">
                                    <!--       <animate attributeName="r" from="5" to="25" dur="3s" repeatCount="indefinite"/>
                                           <animate attributeName="opacity" from="1" to="0" dur="3s" repeatCount="indefinite"/>-->
                                </circle>
                            </g>
                            <g class="animate">
                                <circle cx="20" cy="45" r="12" fill="#FEFFFEFF" style="fill-opacity:.2">
                                    <!--  <animate attributeName="r" from="5" to="25" dur="3s" begin="1.5s" repeatCount="indefinite"/>
                                      <animate attributeName="opacity" from="1" to="0" dur="3s" begin="1.5s" repeatCount="indefinite"/>-->
                                </circle>
                            </g>
                            <!--气泡-->
                            <g>
                                <circle cx="20" cy="45" r="12" fill="#B5B5B5" style="fill-opacity:.2"></circle>
                            </g>
                        </svg>
                    </div>

                    <div class="weigui-icon" :class="{ active: current === index }" >
                        <div class="svg2">
                            <svg>
                                <!--动画-->
                                <g class="animate">
                                    <circle cx="20" cy="45" r="5" fill="#FFBC3C" style="fill-opacity:1">
                                        <animate attributeName="r" from="5" to="20" dur="3s" repeatCount="indefinite"/>
                                        <animate attributeName="opacity" from="1" to="0" dur="3s"
                                                 repeatCount="indefinite"/>
                                    </circle>
                                </g>
                                <g class="animate">
                                    <circle cx="20" cy="45" r="5" fill="#FFBC3C" style="fill-opacity:1">
                                        <animate attributeName="r" from="5" to="20" dur="3s" begin="1.5s"
                                                 repeatCount="indefinite"/>
                                        <animate attributeName="opacity" from="1" to="0" dur="3s" begin="1.5s"
                                                 repeatCount="indefinite"/>
                                    </circle>
                                </g>
                                <!--气泡-->
                                <g>
                                    <circle cx="20" cy="45" r="5" fill="#FFC435FF" style="fill-opacity:1"></circle>
                                </g>
                            </svg>
                        </div>
                        <a :title="item.name">
                        <p class="p2"   v-if="level < 1">
                            {{ item.name }} </p> </a>

                        <a  :title="item.name">
                         <p class="p3" :title="item.name" v-if="level >= 1" >
                            {{ item.name }}</p>
                        </a>
                        <div class="bg-holder"></div>
                    </div>
                </li>
            </ul>
        </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "LeftDaoHang",
        data: function () {
            return {
                index: 0,
                current: 0,

            }
        },
        props: {
            level: {
                type: Number,
                require: true
            },
            dataSource: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {},
        methods: {
            change(index, item) {
                this.current = index;
                this.$emit('changeType', index, item, this.level)
            },
        }
    }
</script>
<style scoped lang="scss">
    a{
        text-decoration: none;
        color:#333;
    }
    .changzhu {
        position: absolute;
        top: 0;
        left: 25px;
        z-index: 2;
    }

    .svg2 {
        position: absolute;
        top: 0;
        left: 25px;
    }
    .bk{
   /*    background-color: #00B7EE;
        opacity: 0.9;
        z-index: -30;*/
    }

    .grid-right {
        width: 240px;
        height: 831px;
        * {
            word-break: keep-all;
        }
       .daohang-right:hover{
       }
        .daohang-right {
            overflow-x: hidden;
            overflow-y: auto;
            position: relative;
            height: 842px;
            width: 240px;

            li {
               /* padding: 33px 50px;*/
                padding-left: 50px;
                padding-top: 35px;
                padding-bottom: 20px;
                list-style: none;
                cursor: pointer;
                position: relative;

                &:last-child .weigui-icon {
                    border-bottom: none;
                }

                .light-icon {
                    display: none;
                    position: absolute;
                    left: 25px;
                    top: 0;
                    height: 100%;
                    width: 28px;

                }

            }

            ul li:hover .light-icon {
                display: block;
            }

            ul li:hover .bg-holder {
                display: block;
            }
            ul li:last-child{
                width: 290px;
            }
        }

        .daohang-right-line {
            height: 200%;
            width: 2px;
            position: absolute;
            left: 45px;
            top: 0;
            background: rgba(255, 255, 255, 0.26);
        }

        .weigui-icon {
            margin-left: 20px;
            width: 100px;

            .svg2 {
                display: none;
            }
        }
        .weigui-icon.active .svg2 {
            display: block;
        }
        .weigui-icon.active .bg-holder {
            display: block;
        }

    }

    .p2 {
        overflow: hidden;
        text-overflow:ellipsis;
        width: 130px;
    /*    height: 28px;*/
        line-height: 28px;
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        opacity:0.7;
        color: rgba(255, 255, 255, 1);
        position: relative;
        z-index: 2;
    }

    .p3 {
       overflow: hidden;
        text-overflow:ellipsis;
        width: 130px;
        font-size: 24px;
        height: 28px;
        line-height: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        opacity: 0.7;
        color: rgba(255, 255, 255, 1);
        position: relative;
        z-index: 2;
    }

    .bg-holder {
        display: none;
        width: 240px;
        height: 50px;
        z-index: 0;
        position: absolute;
        top: 58%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url("../../../assets/common/images/DaoHang/bg_djyl_zzjs_xz_m@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    /deep/ *::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(67, 147, 204, 0.93);
        background: #535353;
    }
    /deep/ *::-webkit-scrollbar {/*滚动条整体样式*/
        width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
        height:0px;
    }
</style>