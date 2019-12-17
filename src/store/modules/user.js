import * as TYPES from "@/store/types";
import * as API from "@/api";

const user = {
  state: {
    userInfo: {},
    isLogin: false,
    showLogin: false,
    loginInfo:{},
  },
  getters: {
  },
  mutations: {
    [TYPES.MUTATIONS_SET_SHOW_LOGIN](state, bool) {
      // 登录框显示
      state.showLogin = bool;
    },
    [TYPES.MUTATIONS_SET_LOGIN_STATE](state) {
      // 登录状态
      state.isLogin = !state.isLogin;
    },
    [TYPES.MUTATIONS_SET_LOGIN_INFO](state,data) {
      // 登录信息
      state.loginInfo = data;
    }
  },
  actions: {}
};

export default user;
