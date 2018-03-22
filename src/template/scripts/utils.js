/**
 *
 */
export const native_call = url => {
  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", url);
  document.documentElement.appendChild(iframe);
  iframe.parentNode.removeChild(iframe);
  iframe = null;
};

/**
 * rem布局单位设置font-size大小
 */
export const htmlSetFontSize = () => {
  let html = document.documentElement;
  let recalc = function () {
    let h = window.innerHeight;
    let w = window.innerWidth;
    //横屏情况下，以height为width
    let width = w > h ? h : w;
    width = width > 720 ? 720 : width;
    let fz = 100 * (width / 720);
    html.style.fontSize = fz + "px";
    var realfz = ~~(+window
      .getComputedStyle(document.getElementsByTagName("html")[0])
      .fontSize.replace("px", "") * 10000
    ) / 10000;
    if (fz !== realfz) {
      document.getElementsByTagName("html")[0].style.cssText =
        "font-size: " + fz * (fz / realfz) + "px";
    }
  };
  window.addEventListener("resize", recalc, false);
  window.addEventListener("orientationchange", recalc, false);
  document.addEventListener("DOMContentLoaded", recalc, false);
};

/**
 * 百度统计脚本
 */

export let baiduStatistics = () => {
  //创建link标签
  var head = document.getElementsByTagName("head")[0],
    linkTag = document.createElement("link");
  linkTag.setAttribute("rel", "stylesheet");
  linkTag.setAttribute("type", "text/css");
  head.appendChild(linkTag);
  //声明百度_hmt对象
  let jsApiScript = document.createElement("script");
  jsApiScript.innerHTML = `var _hmt = _hmt || [] `;
  // 获取第一个一个link
  let links = document.querySelectorAll("link");
  let firstLink = links[0];
  //插入
  firstLink.parentElement.insertBefore(jsApiScript, firstLink);
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?e68bcb3101ed4f915e34445d145577db";
  var s = document.querySelectorAll("script")[0];
  s.parentNode.insertBefore(hm, s);
};

/**
 * 判断是否是iOS设备
 */

export let isIos = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
    return true;
  }
  return false;
};

/**
 * 判断是否是微信环境
 */
export let isWeChat = function () {
  const ua = navigator.userAgent.toLowerCase();
  if (/MicroMessenger/i.test(ua)) {
    return true;
  } else {
    return false;
  }
};

/**
 * 判断是否是QQ环境
 */
export let isQQ = function () {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/\sQQ/i) !== null) {
    return true;
  } else {
    return false;
  }
};

/**
 * 判断是否是Android环境
 */
export let isAndroid = function () {
  var ua = navigator.userAgent.toLowerCase();
  if (/Android/i.test(ua)) {
    return true;
  }
  return false;
};

/**
 * 截取url传递的参数
 * @param name   参数key值
 */

export let getUrlString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
};

/**
 * 设置cookie
 * @param name    key   值
 * @param value   value 值
 */

export let setCookie = (name, value) => {
  var expiryday = new Date();
  expiryday.setTime(expiryday.getTime() + 30 * 30 * 24 * 60 * 60 * 1 * 1000);
  document.cookie =
    name + "=" + escape(value) + "; expires=" + expiryday.toGMTString();
};

/**
 * 获取cookie
 * @param name    key值
 */

export let getCookie = name => {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
};

/**
 * 清除cookie
 * @param name    key值
 */

export let clearCookie = name => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

/**
 * 根据传入的rem值计算当前界面中应显示的px值
 */
export let getCurrentPx = rem => {
  let viewPort = window.screen.width;
  let rootFontSize = 100 * (viewPort / 720);
  return rootFontSize * rem;
};

/**
 * $
 */

export let $ = selectors => {
  return document.querySelector(selectors);
};

/**
 * 时间补位
 */
export let add0 = m => {
  return m < 10 ? "0" + m : m;
};

/**
 * 时间戳转化
 */
export let timestamp_switch_time = timestamp => {
  let time;
  //时间戳只能有10位或者13位（正常情况下）
  if (String(timestamp).length == 13) time = new Date(parseInt(timestamp));
  else time = new Date(parseInt(timestamp) * 1000);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return (
    y +
    "/" +
    add0(m) +
    "/" +
    add0(d) +
    " " +
    add0(h) +
    ":" +
    add0(mm) +
    ":" +
    add0(s)
  );
};

/**
 * 判断横竖屏
 * 横屏 return 0
 * 竖屏 return 1
 */

export let judgeScreen = () => {
  let width = document.body.clientWidth;
  let height = document.body.clientHeight;
  if (width > height) {
    return true;
  }
  return false;
};

/**数组排序
 * data: array
 * key: the key you want to sort
 * direction: 'asc' or 'desc'  asc升 desc降
 */
export let sortData = (data, key, direction) => {
  return data.sort(function (a, b) {
    //三目运算符：也可以自该为if语句
    return direction == "desc" ?
      parseFloat(a[key]) < parseFloat(b[key]) :
      parseFloat(a[key]) > parseFloat(b[key]);
  });
};

export let isSupportWebp = () => {
  let isSupportWebp = !![].map &&
    document
    .createElement("canvas")
    .toDataURL("image/webp")
    .indexOf("data:image/webp") == 0;
  return isSupportWebp;
};

/**
 * 拼接基础链接地址
 * 1. 获取当前项目地址
 * 2. 拼接图片地址
 */
export let hbCDNImgURL = name => {
  // let hbBaseUrl = ''
  let hbBaseUrl = "https://cdn.hbjxqp.happypoker.cn/";
  return hbBaseUrl + "static/img/" + name;
};

// export let hbRequestUrl = 'https://hbjxqp.happypoker.cn/'
export let hbRequestUrl = "/";

export let hnCDNImgURL = name => {
  let hnBaseUrl = "";
  // let hnBaseUrl = 'https://cdn.hbjxqp.happypoker.cn/'
  return hnBaseUrl + "static/img/" + name;
};

export let hnRequestUrl = "/";

//数组去重
export let uniqObjectInArray = arr => {
  let result = {};
  let finalResult = [];
  for (let i = 0; i < arr.length; i++) {
    result[arr[i].id] = arr[i];
    //因为arr[i].id不能重复,达到去重效果,且这里必须知晓"id"或是其他键名
  }
  for (let item in result) {
    finalResult.push(result[item]);
  }
  return finalResult;
}
