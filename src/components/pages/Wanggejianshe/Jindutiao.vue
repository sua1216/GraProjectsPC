 <template>
    <!--进度条-->
    <div class="Jin-du-tiao">
        <div style="display: flex;">
            <div style="flex: 1;">
                <span :class="['xuHao',(dataLi.ranking==1||dataLi.ranking==2||dataLi.ranking==3)?'qianSan':'']">{{ dataLi.ranking }}</span>
                <span style="font-size: 24px">{{ dataLi.city }}</span>
            </div>
            <div style="flex: 1;text-align: right;">
                <span style="font-size: 24px;font-family: FuturaBT-Bold;font-weight: bold;">{{ dataLi.num }}</span>
                <span style="font-size: 18px;margin-left: 10px;">({{ dataLi.percent }})</span>
            </div>

        </div>
        <div style="display: flex;margin-bottom: 20px;padding-left: 10px;">
            <span :style="'width:'+dataLi.num+'%'" :class="['bold',(dataLi.ranking==1||dataLi.ranking==2||dataLi.ranking==3)?'qianSan2':'']"></span>
            <span :style="'width:'+(100-dataLi.num+'%')" class="little"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Jindutiao",
        props:["dataLi"]
    }
</script>

<style scoped>
    .xuHao {
        display: inline-block;
        width: 37px;
        height: 40px;
        font-size: 24px;
        font-family: FuturaBT-Bold;
        font-weight: bold;
        margin-right: 10px;
        text-align: center;
        color: #FEFFFE;
    }
    .qianSan {
        color: #FCC292;
        background-image: url('../../../../public/images/point_wgjs_zhzx@2x.png');
        background-repeat: no-repeat;
        background-size: 37px 40px;
        background-position: 0px -3px;
    }
    .bold {
        height: 10px;
        border: 1px solid rgba(255,255,255,0.2);
        background: -moz-linear-gradient(left, rgb(142,158,182) 0%, #444 100%);
        background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgb(142,158,182)), color-stop(100%,#444));
        background: -webkit-linear-gradient(left, rgb(142,158,182) 0%,#444 100%);
        background: -o-linear-gradient(left, rgb(142,158,182) 0%,#444 100%);
        background: -ms-linear-gradient(left, rgb(142,158,182) 0%,#444 100%);
        background: linear-gradient(to right, rgb(142,158,182) 0%,#444 100%);
    }
    .little {
        height: 2px;
        background-color: rgba(255,255,255,0.2);
        margin-top: 4px;
    }

    .bold:before {
        content: "";
    }
    .qianSan2 {
        background: -moz-linear-gradient(left, #FF8F16 0%, rgb(83,71,79) 100%);
        background: -webkit-gradient(linear, left top, right top, color-stop(0%,#FF8F16), color-stop(100%,rgb(83,71,79)));
        background: -webkit-linear-gradient(left, #FF8F16 0%,rgb(83,71,79) 100%);
        background: -o-linear-gradient(left, #FF8F16 0%,rgb(83,71,79) 100%);
        background: -ms-linear-gradient(left, #FF8F16 0%,rgb(83,71,79) 100%);
        background: linear-gradient(to right, #FF8F16 0%,rgb(83,71,79) 100%);
    }
</style>