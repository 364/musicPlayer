// 搜索类型
export const searchType = {
  songs: { icon: "icon-music-note", name: "单曲", type: 1 },
  albums: { icon: "icon-music1", name: "专辑", type: 10 },
  artists: { icon: "icon-heart1", name: "歌手", type: 100 },
  playlists: { icon: "icon-play-list-line", name: "歌单", type: 1000 },
  mvs: { icon: "icon-video1", name: "MV", type: 1004 },
  words: { icon: "el-icon-link", name: "歌词", type: 1006 },
  videos: { icon: "el-icon-video-camera", name: "视频", type: 1014 }
};
// 搜索类型跳转
export const searchTypeLink = {
  10: "/album/",
  100: "/singer/",
  1000: "/playlist/",
  1004: "/mv/",
  1014: "/video/"
};
// 评论类型
export const commentType = {
  0: "歌曲",
  1: "mv",
  2: "歌单",
  3: "专辑",
  4: "电台",
  5: "视频",
  6: "动态"
};
// 排行榜类型
export const rankType = {
  0: "云音乐新歌榜",
  1: "云音乐热歌榜",
  2: "网易原创歌曲榜",
  3: "云音乐飙升榜",
  4: "云音乐电音榜",
  5: "UK排行榜周榜",
  6: "美国Billboard周榜",
  7: "KTV嗨榜",
  8: "iTunes榜",
  9: "Hit FM Top榜",
  10: "日本Oricon周榜",
  11: "韩国Melon排行榜周榜",
  12: "韩国Mnet排行榜周榜",
  13: "韩国Melon原声周榜",
  14: "中国TOP排行榜(港台榜)",
  15: "中国TOP排行榜(内地榜)",
  16: "香港电台中文歌曲龙虎榜",
  17: "华语金曲榜",
  18: "中国嘻哈榜",
  19: "法国 NRJ EuroHot 30周榜",
  20: "台湾Hito排行榜",
  21: "Beatport全球电子舞曲榜",
  22: "云音乐ACG音乐榜",
  23: "云音乐说唱榜",
  24: "云音乐古典音乐榜",
  25: "云音乐电音榜",
  26: "抖音排行榜",
  27: "新声榜",
  28: "云音乐韩语榜",
  29: "英国Q杂志中文版周榜",
  30: "电竞音乐榜",
  31: "云音乐欧美热歌榜",
  32: "云音乐欧美新歌榜",
  33: "说唱TOP榜"
};
