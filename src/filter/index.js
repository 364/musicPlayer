import moment from "moment";

// 播放数
const playCount = value => {
  if (value > 10 ** 4) {
    let numStr = (value / 10 ** 4).toString();
    let len = numStr.indexOf(".");
    return (len > 0 ? numStr.slice(0, len + 3) : numStr) + "万";
  }
  return value;
};
// 搜索结果类型
const searchCat = value => {
  const obj = {
    songs: { icon: "icon-music-note", name: "单曲" },
    mvs: { icon: "icon-video1", name: "视频" },
    albums: { icon: "icon-music1", name: "专辑" },
    playlists: { icon: "icon-play-list-line", name: "歌单" },
    artists: { icon: "icon-heart1", name: "歌手" }
  };
  return obj[value]["name"];
};
// 歌手
const getArtists = (val, operator) => {
  let arr = val.artists || val.ar
  if (!val || (!arr && !val.artist)) return "";
  let artists = [];
  if (arr) {
    for (let i in arr) {
      artists.push(arr[i].name);
    }
  } else {
    artists.push(val.artist.name);
  }
  const str = artists.length && artists.join(" / ");
  return operator ? operator + str : str;
};
// 格式化时间
const formatTime = (time, format = "YYYY-MM-DD") =>{
  return moment(time).format(format);
}
// 标签
const getTags = val => {
  const arr = val.map(item => "#" + item);
  return arr.join(" ");
};
// 获取歌曲其他信息
const getAlias = val =>{
  return val.join('')
}

export default {
  playCount,
  searchCat,
  getArtists,
  formatTime,
  getTags,
  getAlias
};
