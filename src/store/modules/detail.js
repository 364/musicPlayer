import * as TYPES from "@/store/types";
import * as API from "@/api";

const detail = {
  state: {
    playDetail: {},
    singerDetail: {},
    comment: {
      page: 1,
      pageSize: 20
    },
    mvDetail: {},
    songList: [],
    songOptions: {
      play: false,
      current: 0,
      order: 3,
      showList: false,
      showLyrics: true,
      lyricsList:[],
      default: {
        name: "DO RE MI FA SO LA XI",
        artists: "Enjoy music Enjoy life",
        picUrl: require("@/assets/images/artists.jpg")
      }
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
      state.playDetail = data;
    },
    [TYPES.MUTATIONS_GET_SINGER_DETAIL](state, data) {
      state.singerDetail = Object.assign({}, state.singerDetail, data);
    },
    [TYPES.MUTATIONS_GET_COMMENT](state, data) {
      state.comment = Object.assign({}, data, {
        page: state.comment.page,
        pageSize: state.comment.pageSize
      });
    },
    [TYPES.MUTATIONS_SET_COMMENT_PAGE](state, data) {
      state.comment = Object.assign({}, state.comment, data);
    },
    [TYPES.MUTATIONS_GET_MV_DETAIL](state, data) {
      state.mvDetail = data;
    },
    [TYPES.MUTATIONS_GET_SONG_DETAIL](state, data) {
      // let songList = data[0].songs.map((item, index) =>
      //   Object.assign({}, item, data[1].data[index])
      // );
      state.songList = data;
    },
    [TYPES.MUTATIONS_INIT_SONG_LIST](state) {
      state.songList = [];
      state.songOptions = Object.assign({}, state.songOptions, {
        play: false,
        current: 0,
        url: {}
      });
    },
    [TYPES.MUTATIONS_SET_SONG_OPTIONS](state, data) {
      state.songOptions = Object.assign({}, state.songOptions, data);
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
      Promise.all([
        API.singerDetail(param),
        API.singerAlbum(param),
        API.singerDesc(param)
      ]).then(res => {
        if (res.length) {
          const { artist, hotSongs } = res[0];
          const { hotAlbums } = res[1];
          const { introduction } = res[2];
          const data = { artist, hotSongs, hotAlbums, introduction };
          commit(TYPES.MUTATIONS_GET_SINGER_DETAIL, data);
        }
      });
    },
    [TYPES.ACTIONS_GET_MV_DETAIL]({ commit }, param) {
      // mv详情
      return new Promise((resolve, rej) => {
        API.mvDetail(param).then(res => {
          commit(TYPES.MUTATIONS_GET_MV_DETAIL, res.data);
          resolve();
        });
      });
    },
    [TYPES.ACTIONS_GET_SONG_DETAIL]({}, param) {
      // 音乐详情
      const { id: ids } = param;
      const val =
        Object.prototype.toString.call(ids) === "[object Array]"
          ? ids.join()
          : ids;
      return new Promise((resolve, rej) => {
        // Promise.all([
        //   API.songDetail({ ids: val }),
        //   API.songUrl({ id: val })
        // ]).then(res => {
        //   if (res.length) {
        //     commit(TYPES.MUTATIONS_GET_SONG_DETAIL, res);
        //     resolve();
        //   }
        // });
        API.songDetail({ ids: val }).then(res => {
          resolve(res.songs);
        });
      });
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
