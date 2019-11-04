import * as TYPES from "@/store/types";
import * as API from "@/api";
const detail = {
  state: {
    playlist: {},
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_PLAYLIST_DETAIL](state, data) {
      state.playlist = data;
    },
  },
  actions: {
    [TYPES.ACTIONS_GET_PLAYLIST_DETAIL]({ commit },param) {
      API.playListDetail(param).then(res => {
        commit(TYPES.MUTATIONS_GET_PLAYLIST_DETAIL, res.playlist);
      });
    },
  }
};

export default detail;
