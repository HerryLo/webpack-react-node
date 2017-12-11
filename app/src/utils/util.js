/**
 * 转换时间为 ‘几小时前’|‘几分钟前’|y/m/d 格式
 * @param {*} t 
 */
export const releaseTime = function(t) {
  var d = new Date(t);
  var n = new Date();
  var year = d.getFullYear();
  var year1 = n.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var day1 = n.getDate();
  var Hours = d.getHours();
  var Minutes = d.getMinutes();

  var value = n.getTime() - d.getTime();
  var m = value / 1000 / 60;
  var h = value / 1000 / 3600;
  if (m <= 59 && day == day1) {
    if (parseInt(m) == 0) {
      m = 1;
    }
    return parseInt(m) + "分钟前";
  } else if (h >= 1 && h < 24 && day == day1) {
    return parseInt(h) + "小时前";
  } else if (h >= 24 && year != year1) {
    return year + "/" + month + "/" + day;
  } else if ((h >= 24 || day != day1) && year == year1) {
    return (
      (month > 9 ? month : "0" + month) + "/" + (day > 9 ? day : "0" + day)
    );
  }
};

/**
 * 转换时间
 * @param {*} t 
 * @param {*} type 
 */
export const DateTransfrom = (t, type) => {
  const da = new Date(t);
  const y = da.getFullYear();
  let m = da.getMonth() + 1;
  const d = da.getDate();
  const h = da.getHours();
  const mi = da.getMinutes();
  if (type == 0) {
    return `${y}年${m}月${d}日${h}:${mi}`;
  }
};

/**
 * 获取地址栏url的参数
 * @param {*} n 
 * @param {*} l 
 */
export const locsearch = (n, l) => {
  var ls = l;
  var lo = "";
  var r = new RegExp("[?&]" + n + "=([^&?]*)(\\s||$)", "gi");
  var r1 = new RegExp(n + "=", "gi");
  if (ls.indexOf("?") > -1) {
    lo = ls.match(r);
    if (lo == null) {
      return "";
    } else {
      return typeof lo[0].split(r1)[1] == "undefined"
        ? ""
        : decodeURIComponent(lo[0].split(r1)[1]);
    }
  }
  return lo;
};

/**
 * 得到cookie中对应的值
 * @param {*} key 
 */
export const getCookie = key => {
  let reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  let token = '';
  if(typeof document !== 'undefined'){
    token = document.cookie.match(reg);
  }else{
      token = '';
  }
  if (token) {
    return token[2];
  }
  return '';
};

export const AppAPI = {
  gotoSetting(a, b) {
    try {
      window.android.gotoSetting(a, b);
    } catch (err) {
      console.log(err);
    }
  },
  showPickView(arr) {
    try {
      window.android.showPickView(arr);
    } catch (err) {
      console.log(err);
    }
  }
};
