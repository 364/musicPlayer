import axios from "./axios";

// 手机登录
export const loginPhone = (params = {}) => axios.get("/login/cellphone", { params });
// 邮箱登录
export const loginEmail = (params = {}) => axios.get("/login", { params });
// 登录状态
export const loginStatus = (params = {}) => axios.get("/login/status", { params });
// 登出
export const logout = (params = {}) => axios.get("/logout", { params });
// 用户详情
export const userInfo = (params = {}) => axios.get("/user/detail", { params });
// 用户歌单
export const userPlayList = (params = {}) => axios.get("/user/playlist", { params });
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
export const searchSuggest = (params = {}) => axios.get("/search/suggest", { params });
// 歌单详情页
export const playListDetail = (params = {}) => axios.get("/playlist/detail", { params });
// 歌手热门歌曲
export const singerDetail = (params = {}) => axios.get("/artists", { params });
// 歌手热门专辑
export const singerAlbum = (params = {}) => axios.get("/artist/album", { params });
// 歌手介绍
export const singerDesc = (params = {}) => axios.get("/artist/desc", { params });
// 歌单评论 limit 数量 offset 偏移数量
export const playListComment = (params = {}) => axios.get("/comment/playlist", { params });
// 歌曲评论 limit 数量 offset 偏移数量
export const musicComment = (params = {}) => axios.get("/comment/music", { params });
// mv评论 limit 数量 offset 偏移数量
export const mvComment = (params = {}) => axios.get("/comment/mv", { params });
// 专辑评论 limit 数量 offset 偏移数量
export const albumComment = (params = {}) => axios.get("/comment/album", { params });
// 获取mv详情 mvid=xx
export const mvDetail = (params = {}) => axios.get("/mv/detail", { params });
// 专辑详情
export const albumDetail = (params = {}) => axios.get("/album", { params });
// 歌曲详情 ids=xx,xx
export const songDetail = (params = {}) => axios.get("/song/detail", { params });
// 歌曲url id=xx,xx
export const songUrl = (params = {}) => axios.get("/song/url", { params });
// 检查歌曲是否可以播放
export const checkUrl = (params = {}) => axios.get("/check/music", { params });
// 获取歌词
export const songLyrics = (params = {}) => axios.get("/lyric", { params });
// 专辑内容
export const album = (params = {}) => axios.get("/album", { params });
// 所有榜单
export const allToplist = (params = {}) => axios.get("/toplist/detail", { params });
// 排行榜
export const toplist = (params = {}) => axios.get("/top/list", { params });
// 私人FM
export const fm = (params = {}) => axios.get("/personal_fm", { params });
