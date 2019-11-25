<!-- 排行榜 -->
<template>
  <div class="rank">
    <div class="main">
      <div v-for="(item,index) in rankList" :key="index">
        <h2>{{ item.name }}</h2>
        <ul :class="{ 'mult':item.all }">
          <li
            v-for="cItem in item.data"
            :key="cItem.id"
            @mouseover="isHover = cItem.id"
            @mouseleave="isHover = null"
            @click="handleToDetail(cItem)"
          >
            <div class="info">
              <img v-lazy="cItem.coverImgUrl" />
              <transition name="fade">
                <div class="mask" v-show="isHover == cItem.id">
                  <i class="el-icon-video-play"></i>
                </div>
              </transition>
              <h5 class="count">
                <i class="el-icon-headset"></i>
                {{ cItem.playCount | playCount(-1) }}
              </h5>
            </div>
            <div class="tracks">
              <div v-if="cItem.tracks.length" class="songs">
                <div v-for="(tItem,index) in cItem.tracks" :key="tItem.first">
                  <span>{{ index + 1 }}</span>
                  <span>
                    {{ tItem.first }} -
                    <b>{{ tItem.second }}</b>
                  </span>
                </div>
              </div>
              <div v-else class="info">
                <h3>{{ cItem.name }}</h3>
                <h5>{{ cItem.updateFrequency }}</h5>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { allToplist } from "@/api";
import { rankType } from "@/utils/enum";
export default {
  name: "rank",
  components: {},
  data() {
    return {
      rankType,
      rankList: [],
      isHover: null
    };
  },
  computed: {},
  created() {
    this.handleGetData();
  },
  watch: {},
  methods: {
    async handleGetData() {
      let rankList = [];
      const res = await allToplist();
      if (res.code == 200) {
        const { list } = res;
        const featureList = list.filter(item => item.ToplistType);
        const worldList = list.filter(item => !item.ToplistType);
        rankList.push({ name: "特色榜", data: featureList });
        rankList.push({ name: "全球榜", data: worldList, all: true });
        this.rankList = rankList;
      }
    },
    handleToDetail(item) {
      for (let i in this.rankType) {
        if (rankType[i] == item.name) {
          this.$router.push("/rank/" + item.id + "/" + i);
        }
      }
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
@import "~@/assets/style/variable.less";
.rank {
  height: calc(100% - @footer-height);
  overflow: hidden;
  .main {
    padding: 20px;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    > div {
      margin-bottom: 40px;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 15px));
      grid-gap: 20px;
      &.mult {
        grid-template-columns: repeat(3, calc(33.3% - 15px));
        li {
          .mask {
            font-size: 30px;
          }
          .info {
            flex: 3;
          }
        }
      }
      li {
        display: flex;
        background: #f7f7f7;
        &:hover {
          background: #f1f1f1;
          cursor: pointer;
        }
        .mask {
          position: absolute;
          width: 100%;
          height: 100%;
          background: fade(#000, 50%);
          top: 0;
          left: 0;
          color: fade(#fff, 80%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }
        .info {
          flex: 2;
          position: relative;
          .count {
            position: absolute;
            bottom: 5px;
            left: 5px;
            margin: 0;
            color: #fff;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
          }
          img {
            width: 100%;
          }
        }
        .tracks {
          flex: 7;
          > div {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-around;
            box-sizing: border-box;
            padding: 10px;
          }
          .songs {
            > div {
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              display: -webkit-box;
            }
            b {
              font-weight: 400;
              color: #999;
            }
          }
          .info {
            > * {
              margin: 0;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              display: -webkit-box;
            }
          }
        }
      }
      @media screen and (max-width: 1200px) {
        &.mult {
          grid-template-columns: repeat(2, calc(50% - 10px));
        }
        li {
          .info {
            flex: 3;
          }
        }
      }
    }
  }
}
</style>  