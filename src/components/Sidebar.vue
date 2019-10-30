<template>
  <div class="sidebar">
    <!-- 头像 -->
    <div class="user" @click="toLogin">
      <div class="avatar">
        <div></div>
        <span>未登录</span>
      </div>
      <i class="iconfont icon-logout logout" v-show="isLogin"></i>
    </div>
    <!-- 导航 -->
    <ul class="menu">
      <li v-for="item in menuList" :key="item.title">
        <div class="title">{{ item.title }}</div>
        <ul v-if="item.content&&item.content.length" class="submenu">
          <router-link
            tag="li"
            v-for="cItem in item.content"
            :key="cItem.route"
            :to="cItem.route"
          >
            <div>
              <i :class="['iconfont',cItem.icon]"></i>
              <span>{{ cItem.text }}</span>
            </div>
          </router-link>
        </ul>
      </li>
    </ul>
    <!-- <Login /> -->
  </div>
</template>

<script>
import Login from "./Login";
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  components: {
    Login
  },
  data() {
    return {
      isLogin: false
    };
  },
  computed: {
    ...mapGetters(["menuList"])
  },
  methods: {
    toLogin() {}
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/variable.less";
.sidebar {
  overflow: hidden;
  box-sizing: border-box;
  width: @sidebar-width;
  padding-bottom: @footer-height;
  @media screen and (max-width:1200px){
    width: @sidebar-small-width;
  }
  .user {
    font-size: @small-size;
    cursor: pointer;
    margin: @margin-t @margin-lr;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: @base-weight;
      &:hover {
        text-decoration: underline;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        background: fade(#000, 5%);
        width: @avator-size;
        height: @avator-size;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
    .logout {
      color: #ccc;
    }
  }
  .menu {
    overflow: auto;
    height: calc(100% - @footer-height - @avator-size);
    color: @base-color;
    > li {
      padding: 25px;
      padding-right: 0;
      &:first-child {
        padding-top: 0;
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      }
      > .title {
        font-size: 15px;
        font-weight: @base-weight;
        padding-bottom: 15px;
      }
      .submenu {
        li {
          cursor: pointer;
          height: @submenu-height;
          line-height: @submenu-height;
          transition: all 0.5s;
          i {
            width: 30px;
            margin-right: 20px;
          }
          &.router-link-active {
            position: relative;
            background: linear-gradient(
              to right,
              transparent,
              @theme-color-1,
              @theme-color-5
            );
            &:after {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              width: 3px;
              height: 100%;
              background: @theme-color;
            }
          }
        }
      }
    }
  }
}
</style>
