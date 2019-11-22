import * as TYPES from "@/store/types";
import * as API from "@/api";

const home = {
  state: {
    banners: [],
    playlist: [],
    songList: [],
    mvList: [],
    navList: [
      { title: "推荐", route: "/home/recommend" },
      { title: "歌手", route: "/home/singer" },
      { title: "歌单", route: "/home/playlist" }
    ]
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_BANNER](state, data) {
      // banner
      state.banners = data;
    },
    [TYPES.MUTATIONS_GET_PLAYLIST](state, data) {
      // 推荐歌单
      state.playlist = data;
    },
    [TYPES.MUTATIONS_GET_MV](state, data) {
      // 推荐mv
      let newData = data.slice(0, 3);
      state.mvList = newData;
    },
    [TYPES.MUTATIONS_GET_NEWSONG](state, data) {
      // 推荐新音乐
      let newData = data.slice(0, 9);
      state.songList = newData;
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_BANNER]({ commit }) {
      // banner
      API.banner().then(res => {
        commit(TYPES.MUTATIONS_GET_BANNER, res.banners);
      });
    },
    [TYPES.ACTIONS_GET_PLAYLIST]({ commit }, data) {
      // 推荐歌单
      API.playlist(data).then(res => {
        commit(TYPES.MUTATIONS_GET_PLAYLIST, res.result);
      });
    },
    [TYPES.ACTIONS_GET_MV]({ commit }, data) {
      // 推荐mv
      API.mv(data).then(res => {
        commit(TYPES.MUTATIONS_GET_MV, res.result);
      });
    },
    [TYPES.ACTIONS_GET_NEWSONG]({ commit }, data) {
      // 推荐新音乐
      API.newsong(data).then(res => {
        commit(TYPES.MUTATIONS_GET_NEWSONG, res.result);
      });
    }
  }
};

export default home;
