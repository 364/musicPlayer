<!-- 歌单 -->
<template>
  <div class="songList">
    <!-- 筛选条件 -->
    <div class="category">
      <div class="title">
        <div>{{title.filter.title}}</div>
        <ul>
          <li
            v-for="item in title.filter.content"
            :key="item.tag"
            @click="handleChangeTag({filter:item.tag})"
            :class="{'active':item.tag===title.filter.active}"
          >{{item.name}}</li>
        </ul>
      </div>
      <filter-cat :category="category.content[category.tag]" @handleChange="handleChange" />
    </div>
    <!-- 筛选结果 -->
    <div class="playlist">
      <div class="title">
        <div>{{title.list.title}}</div>
        <ul>
          <li
            v-for="item in title.list.content"
            :key="item.tag"
            @click="handleChangeTag({list:item.tag})"
            :class="{'active':item.tag===title.list.active}"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="list" ref="scroll">
      <load-more :load="load">
        <ul ref="list">
          <li v-for="item in playList" :key="item.id">
            <img v-lazy="item.coverImgUrl" />
            <div>{{ item.name }}</div>
          </li>
        </ul>
      </load-more>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import * as TYPES from "@/store/types";
import LoadMore from "@/components/LoadMore";
import FilterCat from "@/components/FilterCat";

export default {
  name: "songList",
  components: {
    LoadMore,
    FilterCat,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      title: state => state.playlist.title,
      playList: state => state.playlist.playList,
      load: state => state.playlist.load,
      category: state => state.playlist.category
    })
  },
  created() {
    this[TYPES.ACTIONS_GET_PLAY_LIST]();
    this[TYPES.ACTIONS_GET_PLAYLIST_CATEGORY]();
  },
  watch: {},
  methods: {
    handleChange(e) {
      const { dataset } = e.target;
      this[TYPES.MUTATIONS_CHANGE_PALYLIST_TAG](dataset);
    },
    handleChangeTag(obj) {
      this[TYPES.MUTATIONS_CHANGE_PALYLIST_TITLE](obj);
    },
    ...mapActions([
      TYPES.ACTIONS_GET_PLAY_LIST,
      TYPES.ACTIONS_GET_PLAYLIST_CATEGORY
    ]),
    ...mapMutations([
      TYPES.MUTATIONS_CHANGE_PALYLIST_TITLE,
      TYPES.MUTATIONS_CHANGE_PALYLIST_TAG
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
.songList {
  padding: 0 20px;
  height: @auto-height;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 20px;
    ul {
      li {
        cursor: pointer;
        font-size: 14px;
        display: inline-block;
        margin-left: 10px;
        &.active {
          color: @theme-color;
        }
      }
    }
  }
  .list {
    height: 82%;
    overflow-y: auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 18%;
        margin: 5px;
        padding: 10px;
        cursor: pointer;
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 15px fade(#000, 5%);
        &:hover{
          box-shadow: 0 0 15px fade(#000, 12%);
        }
        img {
          width: 100%;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>