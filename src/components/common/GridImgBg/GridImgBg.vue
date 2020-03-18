<template>
    <div class="grid-img-bg" :style="{width:w +'px',height:h +'px',background:`url(${require('@/assets/common/images/rect_grid.png')})`}">
        <img style="position:absolute;top:0;left:0;" :src="require('@/assets/common/images/edges.png')" alt="">
        <img style="position:absolute;top:0;right:0;transform:rotate(90deg)" :src="require('@/assets/common/images/edges.png')" alt="">
        <img style="position:absolute;bottom:0;right:0;transform:rotate(180deg)" :src="require('@/assets/common/images/edges.png')" alt="">
        <img style="position:absolute;bottom:0;left:0;transform:rotate(-90deg)" :src="require('@/assets/common/images/edges.png')" alt="">
    </div>
</template>

<script>
    export default {
        name: "GridImgBg",
        props:['w','h']  //w为宽度,h为高度(记得给父元素设置相对定位)
    }
</script>

<style scoped>
    .grid-img-bg{
        position: absolute;
        z-index: 0;
        left: 0;
        top: 0;
    }
</style>