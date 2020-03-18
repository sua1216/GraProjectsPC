<template>
    <!--问题高发社区-->
    <div class="wentigaofashequ">
        <div style="font-size: 28px;font-weight: bold;position: relative;top: 0px;left: 0px;">
            问题高发社区
            <span class="line line12"></span>
            <span class="line2"></span>
        </div>
        <div>
            <WentigaofashequZhuZhuangTu></WentigaofashequZhuZhuangTu>
        </div>
    </div>
</template>

<script>
    import WentigaofashequZhuZhuangTu from "./WentigaofashequZhuZhuangTu.vue"
    export default {
        name: "Wentigaofashequ",
        components:{
            "WentigaofashequZhuZhuangTu":WentigaofashequZhuZhuangTu
        }
    }
</script>

<style scoped>
    .wentigaofashequ {
        width: 600px;
        padding-left: 20px;
    }

    .line {
        position: absolute;
        top: 20px;
        right: 0px;
        display: inline-block;
        height: 2px;
        background-color: rgba(255,255,255,0.2);
    }

    .line12 {
        width: 380px;
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