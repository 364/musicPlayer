<!-- banenr -->
<template>
  <el-carousel
    class="bannerBox"
    :interval="carousel.interval"
    :type="carousel.type"
    :arrow="carousel.arrow"
    :loop="carousel.loop"
    :height="carousel.height"
  >
    <a target="_blank" :href="item.url" v-for="item in banners" :key="item.imageUrl">
      <el-carousel-item>
        <img :src="item.imageUrl" ref="imgH"/>
        <span class="tag">{{item.typeTitle}}</span>
      </el-carousel-item>
    </a>
  </el-carousel>
</template>

<script>
export default {
  name: "banner",
  // props: ["carousel","banners"],
  props: {
    carousel: {
      type: Object
    },
    banners: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    setImgH() {
      const arrImg = this.$refs.imgH;
      if (arrImg && arrImg.length) {
        if (arrImg[0].height < 300) {
          this.carousel.height = arrImg[0].height + "px";
        }
      }
    }
  },
  mounted() {
    this.setImgH();
    window.addEventListener(
      "resize",
      () => {
        this.setImgH();
      },
      false
    );
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.bannerBox {
  /deep/ .el-carousel__item {
    overflow: visible;
  }
  img {
    width: 100%;
    position: relative;
  }
  .tag {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: -3px;
    color: #fff;
    font-size: 12px;
    padding: 3px 8px 2px;
    border-radius: 50px 0 0 50px;
    background: @theme-color;
  }
}
</style>