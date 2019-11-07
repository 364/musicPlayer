import * as TYPES from "@/store/types";
import * as API from "@/api";
const detail = {
  state: {
    playlist: {},
    singerList: {},
    comment: {
      page: 1,
      pageSize: 20
    }
  },
  getters: {
    [TYPES.GETTERS_GET_COMMENT_PARAMS](state) {
      // 获取评论参数
      const { page, pageSize } = state.comment;
      return {
        limit: pageSize,
        offset: (page - 1) * pageSize
      };
    }
  },
  mutations: {
    [TYPES.MUTATIONS_GET_PLAYLIST_DETAIL](state, data) {
      state.playlist = data;
    },
    [TYPES.MUTATIONS_GET_SINGER_DETAIL](state, data) {
      state.singerList = Object.assign({}, state.singerList, data);
    },
    [TYPES.MUTATIONS_GET_COMMENT](state, data) {
      state.comment = Object.assign({}, state.comment, data);
    },
    [TYPES.MUTATIONS_SET_COMMENT_PAGE](state, data) {
      state.comment = Object.assign({}, state.comment, data);
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_PLAYLIST_DETAIL]({ commit }, param) {
      // 歌单详情
      API.playListDetail(param).then(res => {
        commit(TYPES.MUTATIONS_GET_PLAYLIST_DETAIL, res.playlist);
      });
    },
    [TYPES.ACTIONS_GET_SINGER_DETAIL]({ commit }, param) {
      // 歌手详情
      // 热门歌曲
      Promise.all([API.singerDetail(param), API.singerAlbum(param)]).then(
        res => {
          if (res.length) {
            const { artist, hotSongs } = res[0];
            const { hotAlbums } = res[1];
            const data = { artist, hotSongs, hotAlbums };
            commit(TYPES.MUTATIONS_GET_SINGER_DETAIL, data);
          }
        }
      );
    },
    [TYPES.ACTIONS_GET_COMMENT_PLAYLIST]({ commit, getters }, param) {
      // 歌单评论
      let params = Object.assign(
        {},
        getters[TYPES.GETTERS_GET_COMMENT_PARAMS],
        param
      );
      API.playListComment(params).then(res => {
        commit(TYPES.MUTATIONS_GET_COMMENT, res);
      });
    },
    [TYPES.ACTIONS_GET_COMMENT_MUSIC]({ commit, getters }, param) {
      // 音乐评论
      let params = Object.assign(
        {},
        getters[TYPES.GETTERS_GET_COMMENT_PARAMS],
        param
      );
      API.musicComment(params).then(res => {
        commit(TYPES.MUTATIONS_GET_COMMENT, res);
      });
    },
    [TYPES.ACTIONS_GET_COMMENT_MV]({ commit, getters }, param) {
      // mv评论
      let params = Object.assign(
        {},
        getters[TYPES.GETTERS_GET_COMMENT_PARAMS],
        param
      );
      API.mvComment(params).then(res => {
        commit(TYPES.MUTATIONS_GET_COMMENT, res);
      });
    }
  }
};

export default detail;
