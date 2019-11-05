import * as TYPES from "@/store/types";
import * as API from "@/api";
const detail = {
  state: {
    playlist: {},
    comment: {
      pageSize: 20
    }
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_PLAYLIST_DETAIL](state, data) {
      state.playlist = data;
    },
    [TYPES.MUTATIONS_GET_COMMENT](state, data) {
      state.comment = Object.assign({}, state.comment, data);
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_PLAYLIST_DETAIL]({ commit }, param) {
      API.playListDetail(param).then(res => {
        commit(TYPES.MUTATIONS_GET_PLAYLIST_DETAIL, res.playlist);
      });
    },
    [TYPES.ACTIONS_GET_COMMENT_PLAYLIST]({ commit }, param) {
      API.playListComment(param).then(res => {
        commit(TYPES.MUTATIONS_GET_COMMENT, res);
      });
    },
    [TYPES.ACTIONS_GET_COMMENT_MUSIC]({ commit }, param) {
      API.musicComment(param).then(res => {
        commit(TYPES.MUTATIONS_GET_COMMENT, res);
      });
    },
    [TYPES.ACTIONS_GET_COMMENT_MV]({ commit }, param) {
      API.mvComment(param).then(res => {
        commit(TYPES.MUTATIONS_GET_COMMENT, res);
      });
    }
  }
};

export default detail;
