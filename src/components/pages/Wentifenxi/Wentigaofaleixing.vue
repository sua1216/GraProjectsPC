<template>
    <!--问题高发类型-->
    <div class="wentigaofaleixing">
        <div>
            <div style="position: relative;top: 0px;left: 0px;">
                <span style="font-size: 28px;font-weight: bold;">问题高发类型</span>
<!--                <Button :type="dlBtnType" @click="dl" class="wtgflxBtn">大类</Button>-->
<!--                <Button :type="xlBtnType" @click="xl" class="wtgflxBtn">小类</Button>-->

                <span class="line line12"></span>
                <span class="line2"></span>
            </div>
        </div>
        <div>
            <KeHeOne></KeHeOne>
        </div>


    </div>
</template>

<script>
    import KeHeOne from "./KeHeOne.vue"
    export default {
        name: "Wentigaofaleixing",
        data: function () {
            return {
                dlBtnType: "primary",
                xlBtnType: "default",
                rank:{},
                goodRank:'',
                lowRank:''
            }
        },
        components: {
            "KeHeOne":KeHeOne
        },
        methods: {
            dl: function () {
                this.dlBtnType = "primary"
                this.xlBtnType = "default"
            },
            xl: function () {
                this.dlBtnType = "default"
                this.xlBtnType = "primary"
            }
        }
    }
</script>

<style scoped>
    .wentigaofaleixing {
        margin-top: 20px;
        width: 600px;
        padding-left: 20px;
    }

    .wtgflxBtn {
        margin-left: 20px;
    }

    .line {
        position: absolute;
        top: 20px;
        right: 0px;
        display: inline-block;
        width: 260px;
        height: 2px;
        background-color: rgba(255,255,255,0.2);
    }

    .line12 {
        width: 390px;
    }

    .line2 {
        position: absolute;
        top: 13px;
        right: 0px;
        display: inline-block;
        width: 3px;
        height: 15px;
        background-color: rgba(255,255,255,0.5);
    }
</style>