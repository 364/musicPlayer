import * as TYPES from "@/store/types";
import * as API from "@/api";
const home = {
  state: {
    banners: [],
    playlist: []
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_BANNER](state, data) {
      state.banners = data;
    },
    [TYPES.MUTATIONS_GET_PLAYLIST](state, data) {
      state.playlist = data;
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
        commit(TYPES.MUTATIONS_GET_PLAYLIST, res.playlists);
      });
    }
  }
};

export default home;
