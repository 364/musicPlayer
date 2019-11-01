<!-- 搜索条 -->
<template>
  <div class="nav">
    <div :class="['searchBox',{'focus':this.keywords.length}]">
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
    <!-- v-show="isShow" -->
    <div
      class="searchlist"
      v-show="isShow"
      @mouseover="isShow=true"
      @mouseleave="isFocus?'':isShow=false"
    >
      <h3>{{ !keywords.length ?'热搜榜':'在线音乐' }}</h3>
      <ul v-if="!keywords.length">
        <li
          v-for="(item,index) in searchHot"
          :key="item.score+item.searchWord"
          @click="handleSearch($event,item.searchWord)"
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
      <div v-else class="searchMatch">
        <div v-if="searchMatch.order">
          <div v-for="item in searchMatch.order" :key="item">
            <div class="title" v-if="searchMatch[item]">
              <i :class="['iconfont',searchType[item]['icon']]"></i>
              <span>{{searchType[item]['name']}}</span>
            </div>
            <ul>
              <li
                v-for="cItem in searchMatch[item]"
                :key="cItem.id"
                @click="handleSearch($event, {keywords:cItem.name,type:searchType[item]['type']})"
              >{{ cItem.name }} {{(cItem.artists||cItem.artist) | getArtists(' - ')}}</li>
            </ul>
          </div>
        </div>
        <div v-else class="empty">搜索结果为空~</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as TYPES from "@/store/types";
import { mapState, mapActions } from "vuex";
import { searchType } from "@/utils/enum";

export default {
  name: "Search",
  data() {
    return {
      isFocus: false,
      isShow: false,
      keywords: "",
      searchType
    };
  },
  computed: {
    ...mapState({
      navList: state => state.home.navList,
      searchHot: state => state.search.searchHot,
      searchKey: state => state.search.searchKey,
      searchMatch: state => state.search.searchMatch
    })
  },
  watch: {
    keywords(keywords) {
      if (keywords.length) {
        this[TYPES.ACTIONS_GET_SEARCH_LIST]({
          keywords,
          isMatch: true
        });
      }
    }
  },
  created() {
    this[TYPES.ACTIONS_GET_SEARCH_DEFAULT]();
  },
  methods: {
    handleFocus() {
      // 输入
      this.isFocus = true;
      this.isShow = true;
    },
    handleBlur() {
      // 失去焦点
      setTimeout(() => {
        this.isFocus = false;
        this.isShow = false;
      }, 100);
    },
    handleClear() {
      // 清空输入框
      this.keywords = "";
      this.isFocus = false;
    },
    handleSearch(e, key) {
      // 搜索
      this.isFocus = false;
      this.isShow = false;
      this.$refs.input.blur();
      if (Object.prototype.toString.call(key) == "[object Object]") {
        this.keywords = key.keywords;
        this[TYPES.ACTIONS_GET_SEARCH_LIST](
          Object.assign({}, key, { isMatch: false })
        );
      } else {
        const keywords = key
          ? key
          : this.keywords.length
          ? this.keywords
          : this.searchKey;
        if (this.keywords !== keywords) {
          this.keywords = keywords;
          this[TYPES.ACTIONS_GET_SEARCH_LIST]({ keywords, isMatch: false });
        }
      }
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
        right: 0px;
      }
    }
    input {
      width: 100%;
      background: #f5f5f5;
      outline: none;
      border: 0;
      padding: 10px 30px;
      border-radius: 50px;
      box-sizing: border-box;
      color: #333;
      text-overflow: ellipsis;
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
    overflow-x: hidden;
    z-index: 999;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    width: 30%;
    max-height: 400px;
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
        width: 5%;
        text-align: center;
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
    .searchMatch {
      padding: 0 10px;
      li {
        font-size: 12px;
        text-overflow: ellipsis;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        color: #777;
      }
      .title {
        padding: 10px;
        i {
          font-size: 13px;
          margin-right: 3px;
        }
      }
      .empty {
        padding: 10px;
        margin-bottom: 20px;
        color: #777;
      }
    }
  }
}
</style>