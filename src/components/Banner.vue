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
        <img :src="item.imageUrl" ref="imgH" />
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
      type: Array
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
  },
};
</script>
<style lang='less' scoped>
.bannerBox {
  img {
    width: 100%;
  }
}
</style>