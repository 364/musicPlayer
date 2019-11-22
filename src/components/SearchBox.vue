<!-- 搜索 -->
<template>
  <div class="search">
    <!-- 搜索框 -->
    <div :class="['searchBox',{'focus':isFocus||keywords.length}]">
      <i class="el-icon-search"></i>
      <input
        :placeholder="searchDefKey||'请搜索'"
        v-model.trim="keywords"
        autocomplete="off"
        autocapitalize="off"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch($event,keywords,true)"
        @input="handleQuery"
        ref="input"
      />
      <i class="el-icon-circle-close" v-show="keywords.length" @click="handleClear"></i>
    </div>
    <div
      class="searchlist"
      v-show="isShow"
      @mouseover="isShow=true"
      @mouseleave="isFocus?'':isShow=false"
    >
      <h3>{{ !keywords.length ?'热搜榜':'在线音乐' }}</h3>
      <!-- 热搜榜 -->
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
      <!-- 搜索建议 -->
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
                v-html="highLight(cItem)"
                @click="handleSearchSuggest($event, {keywords:cItem.name,type:searchType[item]['type']})"
              ></li>
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
  name: "searchbox",
  components: {},
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
      searchHot: state => state.search.searchHot,
      searchDefKey: state => state.search.searchDefKey,
      searchMatch: state => state.search.searchMatch
    })
  },
  created() {
    this[TYPES.ACTIONS_GET_SEARCH_DEFAULT]();
  },
  watch: {},
  methods: {
    highLight(item) {
      // 高亮搜索建议
      let str = item.name;
      str += (item.alias || []).join("");
      str += this.$root.getArtists(item, " - ");
      return str.replace(
        new RegExp(this.keywords, "g"),
        `<span class="highlight">${this.keywords}</span>`
      );
    },
    handleQuery(e) {
      // 搜索建议
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (this.keywords.length) {
          this[TYPES.ACTIONS_GET_SEARCH_LIST]({
            keywords: this.keywords,
            isMatch: true
          });
        }
      }, 100);
    },
    handleFocus() {
      // 输入
      this.isFocus = true;
      this.isShow = true;
      if (this.keywords.length) {
        this.handleQuery();
      }
    },
    handleBlur() {
      // 失去焦点
      setTimeout(() => {
        this.isFocus = false;
        this.isShow = false;
      }, 200);
    },
    handleClear() {
      // 清空输入框
      this.keywords = "";
      this.isFocus = false;
    },
    handleSearch(e, key, enter) {
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
          : this.searchDefKey;
        if (this.keywords !== keywords || enter) {
          this.keywords = keywords;
          this[TYPES.ACTIONS_GET_SEARCH_LIST]({ keywords, isMatch: false });
        }
      }
      if (this.$route.path !== "/search") {
        this.$router.push("/search");
      }
    },
    handleSearchSuggest(){
      // 搜索建议点击
    },
    ...mapActions([
      TYPES.ACTIONS_GET_SEARCH_LIST,
      TYPES.ACTIONS_GET_SEARCH_DEFAULT
    ])
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.search {
  width: 22%;
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
        /deep/ .alias {
          color: #aaa;
          margin-left: 3px;
        }
        /deep/ .highlight {
          color: @theme-color;
          font-weight: 500;
        }
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