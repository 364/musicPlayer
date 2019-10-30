import axios from "./axios";

function api(url = "", data = {}, method = "GET", ...options) {
  method = method.toUpperCase();
  switch (method) {
    case "GET":
      return axios({ url, method, params: data, ...options });
    default:
      return axios({ url, method, data });
  }
}

// 登录
export const login = (params = {}) => api("/login", params, "post", { withCredentials: true });
// banner
export const banner = (params = {}) => api("/banner", params);
// 推荐歌单
export const playlist = (params = {}) => api("/personalized", params);
// 推荐音乐
export const newsong = (params = {}) => api("/personalized/newsong", params);
// 推荐mv
export const mv = (params = {}) => api("/personalized/mv", params);
// 歌手榜（热门歌手）
export const topArtist = (params = {}) => api("/toplist/artist", params);
// 全部歌手 cat 歌手类型 initial 字母 limit 页数 offset偏移数量
export const singerList = (params = {}) => api("/artist/list", params);
// 歌单分类
export const playListCat = (params = {}) => api("/playlist/catlist", params);
// 热门歌单分类
export const playListHot = (params = {}) => api("/playlist/hot", params);
// 歌单列表 cat 歌单类型 order 排序(hot/new) limit 数量 before=updateTime
export const playlistAll = (params = {}) => api("/top/playlist", params);
