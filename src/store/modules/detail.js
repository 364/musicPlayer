import * as TYPES from "@/store/types";
import * as API from "@/api";

const detail = {
  state: {
    playDetail: {},
    singerDetail: {},
    mvDetail: {},
    songList: [],
    songOptions: {
      play: false,
      current: -1,
      order: 3,
      songEnd: false,
    }
  },
  getters: {
    [TYPES.GETTERS_GET_CURRENT_SONG](state) {
      // 获取当前播放歌曲
      return state.songList[state.songOptions.current];
    }
  },
  mutations: {
    [TYPES.MUTATIONS_GET_PLAYLIST_DETAIL](state, data) {
      // 歌单详情
      state.playDetail = data;
    },
    [TYPES.MUTATIONS_GET_SINGER_DETAIL](state, data) {
      // 歌手详情
      state.singerDetail = Object.assign({}, state.singerDetail, data);
    },
    [TYPES.MUTATIONS_GET_MV_DETAIL](state, data) {
      // mv详情
      state.mvDetail = data;
    },
    [TYPES.MUTATIONS_GET_SONG_DETAIL](state, data) {
      // 播放列表
      state.songList = data;
    },
    [TYPES.MUTATIONS_INIT_SONG_LIST](state) {
      // 初始化播放列表
      state.songList = [];
      state.songOptions = Object.assign({}, state.songOptions, {
        play: false,
        current: -1
      });
    },
    [TYPES.MUTATIONS_SET_SONG_OPTIONS](state, data) {
      // 更改歌曲配置
      state.songOptions = Object.assign({}, state.songOptions, data);
    },
    [TYPES.MUTATIONS_SET_SONG_ORDER](state, data = 1) {
      // 根据播放顺序更改当前歌曲索引
      let current = state.songOptions.current + data;
      switch (state.songOptions.order) {
        case 0:
          // 顺序播放
          if (current < 0 || current > state.songList.length - 1) {
            current = current < 0 ? 0 : state.songList.length - 1;
            state.songOptions = Object.assign({}, state.songOptions, {
              songEnd: true
            });
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
      // 单曲循环不更改
      if (state.songOptions.order == 2 && state.songOptions.current > 0) return;
      state.songOptions.current = state.songList.length ? current : -1;
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
  }
};

export default detail;
