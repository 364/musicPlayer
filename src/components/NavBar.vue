<!-- 固定头 -->
<template>
  <div class="nav">
    <div :class="['searchBox',{'focus':isFocus}]">
      <i class="el-icon-search"></i>
      <input
        :placeholder="searchKey||'请搜索'"
        v-model="keywords"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
        ref="input"
      />
      <i class="el-icon-circle-close" v-show="keywords.length" @click="handleClear"></i>
    </div>
    <ul class="navlist" v-show="$route.path.includes('home')">
      <router-link
        tag="li"
        v-for="item in navList"
        :key="item.title"
        :to="item.route"
      >{{ item.title }}</router-link>
    </ul>
    <div class="history">
      <i class="el-icon-arrow-left"></i>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div
      class="searchlist"
      v-show="isFocus||isShow"
      @mouseover="isShow=true"
      @mouseleave="isShow=false"
    >
      <h3>热搜榜</h3>
      <ul>
        <li
          v-for="(item,index) in searchHot"
          :key="item.score+item.searchWord"
          @click="handleSearch(item.searchWord)"
        >
          <span class="order">{{ index+1 }}</span>
          <div class="text">
            <div>
              <span>{{ item.searchWord }}</span>
              <span class="count">{{ item.score }}</span>
              <img :src="item.iconUrl " />
            </div>
            <div>{{ item.content }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as TYPES from "@/store/types";
import { mapState, mapActions } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      isFocus: false,
      isShow: false,
      keywords: ""
    };
  },
  computed: {
    ...mapState({
      navList: state => state.home.navList,
      searchHot: state => state.search.searchHot,
      searchKey: state => state.search.searchKey
    })
  },
  created() {
    this[TYPES.ACTIONS_GET_SEARCH_DEFAULT]();
  },
  watch: {},
  methods: {
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
    handleSearch(key) {
      // 搜索
      this.isFocus = false;
      this.isShow = false;
      this.$refs.input.blur();
      console.log(key)
      // this[TYPES.ACTIONS_GET_SEARCH_LIST]({ keywords });
    },
    ...mapActions([
      TYPES.ACTIONS_GET_SEARCH_LIST,
      TYPES.ACTIONS_GET_SEARCH_DEFAULT
    ])
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .navlist {
    position: absolute;
    left: 50%;
    transform: translateX(-52%);
    li {
      display: inline-block;
      margin: 0 10px;
      padding: 0 10px;
      cursor: pointer;
      line-height: @avator-size;
      &:hover {
        color: @theme-color;
      }
      &.router-link-active {
        font-weight: bold;
        color: @theme-color;
        border-bottom: 2px solid @theme-color;
      }
    }
  }
  .searchBox {
    height: @avator-size;
    position: relative;
    color: #999;
    width: @search-width;
    transition: width 0.3s;
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
  .history {
    i {
      color: #999;
      border: 1px solid #ccc;
      margin-left: 10px;
      cursor: pointer;
      padding: 2px;
      &:hover {
        color: @theme-color;
        border: 1px solid @theme-color;
      }
    }
  }
  .searchlist {
    position: absolute;
    top: @avator-size * 2;
    z-index: 999;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    width: 30%;
    height: 400px;
    overflow-y: auto;
    > h3 {
      margin-left: 20px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      &:hover {
        background: #fafafa;
      }
      .order {
        padding: 0 15px 0 10px;
        font-size: 16px;
        color: #777;
      }
      .text {
        :first-child {
          font-size: 13px;
          .count {
            color: #ccc;
            margin: 0 10px;
          }
        }
        :last-child {
          font-size: 12px;
          margin-top: 5px;
          color: #999;
        }
        img {
          vertical-align: baseline;
          height: 10px;
        }
      }
    }
  }
}
</style>