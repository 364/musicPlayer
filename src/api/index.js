import axios from "./axios";

// 登录
export const login = (params = {}) => axios.post("/login", params, { withCredentials: true });
// banner
export const banner = (params = {}) => axios.get("/banner", { params });
// 推荐歌单
export const playlist = (params = {}) => axios.get("/personalized", { params });
// 推荐音乐
export const newsong = (params = {}) => axios.get("/personalized/newsong", { params });
// 推荐mv
export const mv = (params = {}) => axios.get("/personalized/mv", { params });
// 歌手榜（热门歌手）
export const topArtist = (params = {}) => axios.get("/toplist/artist", { params });
// 全部歌手 cat 歌手类型 initial 字母 limit 页数 offset 偏移数量
export const singerList = (params = {}) => axios.get("/artist/list", { params });
// 歌单分类
export const playListCat = (params = {}) => axios.get("/playlist/catlist", { params });
// 热门歌单分类
export const playListHot = (params = {}) => axios.get("/playlist/hot", { params });
// 歌单列表 cat 歌单类型 order 排序(hot/new) limit 数量 offset 偏移数量
export const playlistAll = (params = {}) => axios.get("/top/playlist", { params });
// 搜索 keywords 关键词(多个空格) limit 数量 offset 偏移数量 
// type 1单曲 10专辑 100歌手 1000歌单 1002用户 1004mv 1006歌词 1009电台 1014视频 1018综合
export const search = (params = {}) => axios.get("/search", { params });
// 默认搜索词
export const searchKey = (params = {}) => axios.get("/search/default", { params });
// 热搜列表
export const searchHot = (params = {}) => axios.get("/search/hot/detail", { params });
// 搜索匹配 keywords
export const searchSuggest = (params = {}) => axios.get("/search/suggest", { params })
// 歌单详情页
export const playListDetail = (params = {}) => axios.get("/playlist/detail", { params })
