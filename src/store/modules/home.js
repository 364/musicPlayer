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
      { title: "歌单", route: "/home/song" }
    ],
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_BANNER](state, data) {
      state.banners = data;
    },
    [TYPES.MUTATIONS_GET_PLAYLIST](state, data) {
      state.playlist = data;
    },
    [TYPES.MUTATIONS_GET_NEWSONG](state, data) {
      let newData = data.slice(0, 9);
      state.songList = newData;
    },
    [TYPES.MUTATIONS_GET_MV](state, data) {
      let newData = data.slice(0, 3);
      state.mvList = newData;
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_BANNER]({ commit }) {
      API.banner().then(res => {
        commit(TYPES.MUTATIONS_GET_BANNER, res.banners);
      });
    },
    [TYPES.ACTIONS_GET_PLAYLIST]({ commit }, data) {
      API.playlist(data).then(res => {
        commit(TYPES.MUTATIONS_GET_PLAYLIST, res.result);
      });
    },
    [TYPES.ACTIONS_GET_NEWSONG]({ commit }, data) {
      API.newsong(data).then(res => {
        commit(TYPES.MUTATIONS_GET_NEWSONG, res.result);
      });
    },
    [TYPES.ACTIONS_GET_MV]({ commit }, data) {
      API.mv(data).then(res => {
        commit(TYPES.MUTATIONS_GET_MV, res.result);
      });
    }
  }
};

export default home;
