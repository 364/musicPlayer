<!-- 首页 -->
<template>
  <div class="home">
    <!-- 搜索框 -->
    <div :class="['searchBox',{'focus':isFocus}]">
      <i class="el-icon-search"></i>
      <input
        placeholder="请搜索"
        v-model="keywords"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
      />
      <i class="el-icon-circle-close" v-show="keywords.length" @click="handleClear"></i>
    </div>
    <!-- banner -->
    <el-carousel
      class="bannerBox"
      :interval="carousel.interval"
      :type="carousel.type"
      :arrow="carousel.arrow"
      :loop="carousel.loop"
      :height="carousel.height"
    >
      <el-carousel-item v-for="item in banners" :key="item.targetId">
        <img :src="item.imageUrl" ref="imgH" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="songList">
      <div class="title">
        <h3>推荐歌单</h3>
        <h1>Play List</h1>
      </div>
      <ul>
        <li v-for="item in playlist" :key="item.id">
          <div class="img">
            <img :src="item.coverImgUrl" />
            <span class="count">
              <i class="el-icon-headset"></i>
              {{ item.playCount }}
            </span>
          </div>
          <div class="name">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as TYPES from "@/store/types";

export default {
  name: "home",
  components: {},
  data() {
    return {
      isFocus: false,
      keywords: "",
      carousel: {
        height: "240px",
        interval: 5000,
        arrow: "hover",
        loop: true,
        type: "card"
      },
      playListParam: {
        limit: 6
      }
    };
  },
  computed: {
    ...mapState({
      banners: state => state.home.banners,
      playlist: state => state.home.playlist
    })
  },
  created() {
    this[TYPES.ACTIONS_GET_BANNER]();
    this[TYPES.ACTIONS_GET_PLAYLIST](this.playListParam);
  },
  methods: {
    ...mapActions([TYPES.ACTIONS_GET_BANNER, TYPES.ACTIONS_GET_PLAYLIST]),
    setImgH() {
      const arrImg = this.$refs.imgH;
      if (arrImg && arrImg.length) {
        console.log(
          arrImg[0].offsetHeight,
          arrImg[0].outerHeight,
          arrImg[0].height
        );
        this.carousel.height = arrImg[0].height + "px";
      }
    },
    handleFocus() {
      // 输入
      this.isFocus = true;
    },
    handleBlur() {
      // 失去焦点
      if (this.keywords == "") {
        this.isFocus = false;
      }
    },
    handleClear() {
      // 清空输入框
      this.keywords = "";
      this.isFocus = false;
    },
    handleSearch() {
      // 搜索
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
.home {
  min-height: 100vh;
  overflow: hidden;
  background-image: url("~@/assets/images/taylor.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top right;
  box-shadow: 0 0 50px 30px #ffffff inset;
  padding: @margin-t @margin-lr;
  .searchBox {
    height: @avator-size;
    line-height: @avator-size;
    position: relative;
    color: #999;
    width: @search-width;
    transition: width 0.3s;
    margin-bottom: @margin-lr;
    &.focus {
      width: @search-focus-width;
    }
    i {
      height: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      margin: 0 10px;
      top: 0;
      &.el-icon-circle-close {
        cursor: pointer;
        right: 10px;
      }
    }
    input {
      width: 100%;
      background: #f5f5f5;
      outline: none;
      border: 0;
      padding: 10px 20px;
      text-indent: 20px;
      border-radius: 50px;
      box-sizing: border-box;
    }
  }
  .bannerBox {
    img {
      width: 100%;
    }
  }
  .title {
    h3 {
      font-weight: 400;
      margin: 0;
    }
    h1 {
      margin: 10px 0;
    }
  }
  .songList {
    ul {
      display: flex;
      li {
        flex: 1;
        margin: 0 20px;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        .img {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          width: 100%;
          box-shadow: 0 0 15px fade(#000, 10%);
          .count {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 5px 10px;
            box-sizing: border-box;
            color: #fff;
          }
          img {
            vertical-align: middle;
            width: 100%;
          }
          &:hover {
            &:after {
              font-family: element-icons !important;
              content: "\E7C0";
              position: absolute;
              width: 100%;
              height: 100%;
              background: fade(#000, 40%);
              top: 0;
              left: 0;
              color: fade(#fff, 50%);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 50px;
            }
          }
        }
        .name {
          margin-top: 10px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>