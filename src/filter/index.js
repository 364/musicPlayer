const playCount = value => {
  if (value > 10 ** 4) {
    let numStr = (value / 10 ** 4).toString();
    let len = numStr.indexOf(".");
    return (len > 0 ? numStr.slice(0, len + 3) : numStr) + "万";
  }
  return value;
};

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

const getArtists = (val, operator) => {
  if (!val ||(!val.artists && !val.artist)) return '';
  let artists = [];
  if (val.artists) {
    for (let i in val.artists) {
      artists.push(val.artists[i].name);
    }
  } else {
    artists.push(val.artist.name);
  }
  const str = artists.length && artists.join(" / ");
  return operator ? operator + str : str;
};

export default {
  playCount,
  searchCat,
  getArtists
};
