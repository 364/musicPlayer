<!-- 专辑 -->
<template>
  <div class="album">
    <ul v-if="data.length">
      <li
        v-for="(item,index) in data"
        :key="item.id"
        @mouseenter="isHover=index"
        @mouseleave="isHover=null"
        @click="$router.push('/album/'+item.id)"
      >
        <div class="coverImg">
          <img v-lazy="item.picUrl" alt="album-img" ref="coverImg" />
          <div class="count">
            <span>{{item.publishTime | formatTime}}</span>
            <transition name="fade">
              <i class="el-icon-video-play" v-show="isHover==index"></i>
            </transition>
          </div>
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="artists">{{ item | getArtists }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "album-list",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {},
  data() {
    return {
      isHover: null
    };
  },
  computed: {},
  created() {},
  watch: {},
  methods: {
    handleChangeImgH() {
      // 改变专辑图片高度 父组件调用
      this.$nextTick(() => {
        setTimeout(() => {
          const list = this.$refs.coverImg;
          list.map(item => {
            if (item.width != item.height && item.height < 500) {
              item.style.height = item.width + "px";
            }
          });
        }, 500);
      });
    }
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
.album {
  ul {
    display: grid;
    grid-template-columns: repeat(5, 19%);
    grid-gap: 10px;
    li {
      padding: 10px;
      cursor: pointer;
      overflow: hidden;
      border-radius: 10px;
      box-sizing: border-box;
      box-shadow: 0 0 15px fade(#000, 5%);
      font-size: 13px;
      line-height: 22px;
      width: 100%;
      &:hover {
        box-shadow: 0 0 15px fade(#000, 12%);
      }
      .coverImg {
        color: #fff;
        font-size: 12px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        position: relative;
        width: 100%;
        .count {
          position: absolute;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          bottom: 0;
          padding: 5px 10px;
          box-sizing: border-box;
          & > i {
            font-size: 30px;
          }
        }
        img {
          position: relative;
          width: 100%;
          object-fit: cover;
        }
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 25px;
      }
      .artists {
        color: #888;
      }
    }
  }
}
</style>