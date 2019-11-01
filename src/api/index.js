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
// 全部歌手 cat 歌手类型 initial 字母 limit 页数 offset 偏移数量
export const singerList = (params = {}) => api("/artist/list", params);
// 歌单分类
export const playListCat = (params = {}) => api("/playlist/catlist", params);
// 热门歌单分类
export const playListHot = (params = {}) => api("/playlist/hot", params);
// 歌单列表 cat 歌单类型 order 排序(hot/new) limit 数量 offset 偏移数量
export const playlistAll = (params = {}) => api("/top/playlist", params);
// 搜索 keywords 关键词(多个空格) limit 数量 offset 偏移数量 
// type 1单曲 10专辑 100歌手 1000歌单 1002用户 1004mv 1006歌词 1009电台 1014视频 1018综合
export const search = (params = {}) => api("/search", params);
// 默认搜索词
export const searchKey = (params = {}) => api("/search/default", params);
// 热搜列表
export const searchHot = (params = {}) => api("/search/hot/detail", params);
// 搜索匹配 keywords
export const searchSuggest = (params = {}) => api("/search/suggest", params);

