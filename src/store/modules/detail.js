import * as TYPES from "@/store/types";
import * as API from "@/api";
import Filter from "@/filter";

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
      current: -1,
      order: 3,
      audio: null,
      showList: false,
      showLyrics: false,
      lyricsList: [],
      lyricsIndex: 0,
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
    },
    [TYPES.GETTERS_GET_CURRENT_SONG](state) {
      // 获取当前歌曲
      return state.songList[state.songOptions.current];
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
    },
    [TYPES.MUTATIONS_SET_SONG_LYRICS](state, data) {
      const { lyric } = data;
      const lyricsList = Filter.getLyrics(lyric);
      state.songOptions.lyricsList = lyricsList;
    },
    [TYPES.MUTATIONS_SET_SONG_ORDER](state, data) {
      let current = state.songOptions.current + data;
      switch (state.songOptions.order) {
        case 0:
          // 顺序播放
          if (current < 0 || current > state.songList.length - 1) {
            current = current < 0 ? 0 : state.songList.length - 1;
            return;
          }
          break;
        case 1:
          // 列表循环
          if (current < 0 || current > state.songList.length - 1) {
            current = current < 0 ? state.songList.length - 1 : 0;
          }
          break;
        case 3:
          // 随机播放
          current = Math.round(Math.random() * (state.songList.length - 1));
          break;
        default:
          // 单曲循环
          break;
      }
      console.log(current)
      if (state.songOptions.order == 2 && state.songOptions.current > 0) return;
      state.songOptions = Object.assign({}, state.songOptions, { current });
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
        API.songDetail({ ids: val }).then(res => {
          resolve(res.songs);
        });
      });
    },
    [TYPES.ACTIONS_GET_SONG_LYRICS]({ commit }, param) {
      // 歌词
      API.songLyrics(param).then(res => {
        commit(TYPES.MUTATIONS_SET_SONG_LYRICS, res.lrc);
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
