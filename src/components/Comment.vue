<!-- 评论 -->
<template>
  <div :class="['comment',{'dark':method=='dark'}]" v-if="Object.keys(comment).length">
    <!-- 写评论 -->
    <div class="send">
      <el-input
        type="textarea"
        placeholder="请输入评论"
        v-model="textarea"
        maxlength="50"
        show-word-limit
      ></el-input>
      <el-button type="primary" size="mini" class="btn">提交</el-button>
    </div>
    <!-- 精彩评论  -->
    <div v-if="comment.hotComments&&comment.hotComments.length">
      <h5>精彩评论</h5>
      <ul>
        <li v-for="item in comment.hotComments" :key="item.commentId">
          <img :src="item.user.avatarUrl" alt="avatarUrl" class="avatar" />
          <div>
            <div class="nickname">{{ item.user.nickname }}</div>
            <div class="content">{{ item.content }}</div>
            <div class="time">
              <span>{{ item.time | formatTime('YYYY-MM-DD HH:mm') }}</span>
              <span class="like">
                <i class="iconfont icon-good"></i>
                ({{ item.likedCount }})
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 最新评论 -->
    <div v-if="comment.comments">
      <h5>最新评论</h5>
      <ul>
        <li v-for="item in comment.comments" :key="item.commentId">
          <img :src="item.user.avatarUrl" alt="avatarUrl" class="avatar" />
          <div>
            <div class="nickname">{{ item.user.nickname }}</div>
            <div class="content">{{ item.content }}</div>
            <div class="time">
              <span>{{ item.time | formatTime('YYYY-MM-DD HH:mm') }}</span>
              <span>
                <i class="iconfont icon-good"></i>
                ({{ item.likedCount }})
              </span>
            </div>
          </div>
        </li>
      </ul>
      <pagination :comment="comment" @handleGetData="handleGetData" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import Pagination from "@/components/Pagination";

export default {
  name: "comment",
  components: {
    Pagination
  },
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    method: {
      type: String,
      default: "light"
    }
  },
  data() {
    return {
      textarea: ""
    };
  },
  computed: {
    ...mapState({
      comment: state => state.detail.comment
    })
  },
  created() {
    this.handleGetData();
  },
  watch: {},
  methods: {
    handleGetData(update) {
      // console.log(this.id);
      this[TYPES["ACTIONS_GET_COMMENT_" + this.type.toUpperCase()]]({
        id: this.id
      });
      if (update) {
        this.$emit("handleScrollTop");
      }
    },
    handleResetPage() {
      this[TYPES.MUTATIONS_SET_COMMENT_PAGE]({ page: 1 });
    },
    ...mapMutations([TYPES.MUTATIONS_SET_COMMENT_PAGE]),
    ...mapActions([
      TYPES.ACTIONS_GET_COMMENT_PLAYLIST,
      TYPES.ACTIONS_GET_COMMENT_MUSIC,
      TYPES.ACTIONS_GET_COMMENT_MV
    ])
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    this.handleResetPage();
  }, //生命周期 - 销毁完成
  activated() {
    //如果页面有keep-alive缓存功能，这个函数会触发
    this.handleGetData();
  },
  deactivated() {
    this.handleResetPage();
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.comment {
  &.dark {
    color: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    .nickname {
      color: #fff;
    }
    li {
      border-top: 0px;
    }
    /deep/ .el-pagination__jump {
      color: #fff;
    }
  }
  .send {
    padding-top: 10px;
    text-align: right;
    .btn {
      margin-top: 10px;
    }
  }
  li {
    display: flex;
    border-top: 1px solid #f1f1f1;
    padding: 10px;
    align-items: center;
    font-size: 12px;
    flex: 1;
    > div {
      width: 100%;
    }
    .nickname {
      color: #555;
    }
    .avatar {
      width: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .content {
      padding: 10px 0 5px;
    }
    .time {
      display: flex;
      justify-content: space-between;
      color: #aaa;
      .like {
        cursor: pointer;
        &:hover {
          color: @theme-color;
        }
      }
    }
  }
}
</style>