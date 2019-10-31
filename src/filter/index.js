const playCount = value => {
  if (value > 10 ** 4) {
    let numStr = (value / 10 ** 4).toString();
    let len = numStr.indexOf(".");
    return (len > 0 ? numStr.slice(0, len + 3) : numStr) + "万";
  }
  return value;
};


export default {
  playCount
}