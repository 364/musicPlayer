<!-- 歌单 -->
<template>
  <div class="songList">
    <!-- 筛选条件 -->
    <div class="category" v-show="category.content[category.tag].length">
      <!-- 标题 -->
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
      <!-- 内容 -->
      <filter-cat :category="category.content[category.tag]" @handleChange="handleChange" />
    </div>
    <!-- 筛选结果 -->
    <div class="playlist">
      <!-- 标题 -->
      <div class="title">
        <div>{{title.list.title}}</div>
        <ul>
          <li
            v-for="item in title.list.content"
            :key="item.tag"
            :class="{'active':item.tag===title.list.active}"
            @click="handleChangeTag({list:item.tag})"
          >{{item.name}}</li>
        </ul>
      </div>
      <!-- 内容 -->
      <div class="list" ref="scroll" v-show="playList.length">
        <load-more :load="load">
          <ul ref="list">
            <li
              v-for="(item,index) in playList"
              :key="item.id+item.createTime"
              @mouseenter="isHover=index"
              @mouseleave="isHover=null"
              @click="$router.push(`/playlist/${item.id}`)"
            >
              <!-- <img v-lazy="item.coverImgUrl" /> -->
              <div class="coverImg" v-lazy:background-image="item.coverImgUrl">
                <span class="count">
                  <i class="el-icon-headset"></i>
                  {{item.playCount | playCount}}
                </span>
                <transition name="fade">
                  <i class="el-icon-video-play" v-show="isHover==index"></i>
                </transition>
              </div>
              <div>{{ item.name }}</div>
            </li>
          </ul>
        </load-more>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import * as TYPES from "@/store/types";
import LoadMore from "@/components/LoadMore";
import FilterCat from "@/components/FilterCat";
import _ from "lodash";

export default {
  name: "song-list",
  components: {
    LoadMore,
    FilterCat
  },
  data() {
    return {
      isHover: null,
      box: null,
      scroll: null,
      scrollH: 0
    };
  },
  computed: {
    ...mapState({
      title: state => state.playlist.title,
      playList: state => state.playlist.playList,
      load: state => state.playlist.load,
      category: state => state.playlist.category
    })
  },
  watch: {
    playList(val) {
      if (val.length) {
        this.handleChangeImgH();
      }
    }
  },
  created() {
    // 获取歌单分类和内容
    this[TYPES.ACTIONS_GET_PLAY_LIST]();
    this[TYPES.ACTIONS_GET_PLAYLIST_CATEGORY]();
    window.addEventListener("resize", this.handleChangeImgH);
  },
  mounted() {
    this.box = this.$refs.list;
    this.scroll = this.$refs.scroll;
    // 监听滚动 / 是否加载更多
    this.scroll.addEventListener("scroll", _.debounce(this.handleScroll, 1000));
  },
  methods: {
    handleScroll() {
      // 滚动
      const { finish, loading } = this.load;
      const clientH = this.box.clientHeight;
      const scrollH = this.scroll.scrollTop + this.scroll.clientHeight;
      if (scrollH - clientH > 50 && !finish && !loading) {
        // 加载中
        this[TYPES.MUTATIONS_SET_PLAYLIST_LOAD]({ loading: true });
        this.handleMore(true);
      }
      this.scrollH = this.scroll.scrollTop;
    },
    handleMore(tag) {
      // 加载下一页
      tag
        ? this[TYPES.MUTATIONS_CHANGE_PLAYLIST_PAGE]()
        : this[TYPES.MUTATIONS_SET_PLAYLIST_INIT]();
      this[TYPES.ACTIONS_GET_PLAY_LIST]();
      tag ? null : (this.scroll.scrollTop = 0);
    },
    handleChange(e) {
      // 改变分类
      const { dataset } = e.target;
      this[TYPES.MUTATIONS_CHANGE_PALYLIST_TAG](dataset);
      this.handleMore();
    },
    handleChangeTag(obj) {
      // 改变标题
      this[TYPES.MUTATIONS_CHANGE_PALYLIST_TITLE](obj);
      if (Object.keys(obj)[0] == "list") {
        this.handleMore();
      }
    },
    handleChangeImgH() {
      // 改变图片高度
      this.$nextTick(() => {
        const node = this.$refs.list.querySelectorAll(".coverImg");
        if (node && node.length) {
          const coverImgW = node[0].clientWidth;
          node.forEach(item => {
            item.style.height = coverImgW + "px";
          });
          // console.log(node,coverImgW);
        }
      });
    },
    ...mapActions([
      TYPES.ACTIONS_GET_PLAY_LIST,
      TYPES.ACTIONS_GET_PLAYLIST_CATEGORY
    ]),
    ...mapMutations([
      TYPES.MUTATIONS_SET_PLAYLIST_INIT,
      TYPES.MUTATIONS_CHANGE_PALYLIST_TITLE,
      TYPES.MUTATIONS_CHANGE_PALYLIST_TAG,
      TYPES.MUTATIONS_SET_PLAYLIST_LOAD,
      TYPES.MUTATIONS_CHANGE_PLAYLIST_PAGE
    ])
  },
  activated() {
    if (this.scrollH > 0) {
      this.scroll.scrollTo(0, this.scrollH);
    }
  },
  deactivated() {
    window.removeEventListener("resize", this.handleChangeImgH);
    this.scroll.removeEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleChangeImgH);
    this.scroll.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.songList {
  height: @auto-height;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 10px;
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
  .category {
    padding: 0 20px;
  }
  .playlist {
    height: @auto-height;
    overflow: hidden;
    .title {
      padding: 0 20px;
    }
    .list {
      padding: 10px 20px;
      height: 92%;
      overflow-y: auto;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 19%;
          padding: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          overflow: hidden;
          border-radius: 10px;
          box-sizing: border-box;
          box-shadow: 0 0 15px fade(#000, 5%);
          font-size: 13px;
          line-height: 22px;
          &:hover {
            box-shadow: 0 0 15px fade(#000, 12%);
          }
          .coverImg {
            margin-bottom: 10px;
            background-repeat: no-repeat;
            background-size: cover;
            color: #fff;
            font-size: 12px;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
            box-sizing: border-box;
            padding: 5px 10px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            & > i {
              font-size: 30px;
            }
          }
        }
      }
    }
  }
}
</style>