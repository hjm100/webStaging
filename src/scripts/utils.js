/**
 * 
 */
const native_call = (url) => {
  var iframe = document.createElement("IFRAME");
  iframe.setAttribute("src", url);
  document.documentElement.appendChild(iframe);
  iframe.parentNode.removeChild(iframe);
  iframe = null;
}

/**
 * rem布局单位设置font-size大小
 */
let htmlSetFontSize = () => {
  let html = document.documentElement
  let recalc = function () {
    let h = window.innerHeight
    let w = window.innerWidth
    //横屏情况下，以height为width
    let width = w > h ? h : w
    width = width > 720 ? 720 : width
    let fz = 100 * (width / 720)
    html.style.fontSize = fz + "px";
    var realfz = (window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px', '') * 10000) / 10000
    if (fz !== realfz) {
      document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) + "px";
    }
  };
  //当窗口发生变化的时候调用
  window.addEventListener('resize', recalc, false);
  //在用户水平或者垂直翻转设备（即方向发生变化）时触发的事件。
  window.addEventListener('orientationchange', recalc, false);
  //当初始HTML文档被完全加载和解析完成之后事件被触发，而无需等待样式表、图像和子框架完成加载。
  document.addEventListener('DOMContentLoaded', recalc, false);
}


/**
 * 百度统计脚本
 */

let baiduStatistics = () => {
  //创建link标签
  var head = document.getElementsByTagName('head')[0],
    linkTag = document.createElement('link');
  linkTag.setAttribute('rel', 'stylesheet');
  linkTag.setAttribute('type', 'text/css');
  head.appendChild(linkTag);
  //声明百度_hmt对象
  let jsApiScript = document.createElement('script')
  jsApiScript.innerHTML = `var _hmt = _hmt || [] `
  // 获取第一个一个link
  let links = document.querySelectorAll('link')
  let firstLink = links[0]
  //插入
  firstLink.parentElement.insertBefore(jsApiScript, firstLink)
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?e68bcb3101ed4f915e34445d145577db";
  var s = document.querySelectorAll("script")[0];
  s.parentNode.insertBefore(hm, s);
}

/**
 * 判断是否是iOS设备
 */

let isIos = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
    return true;
  }
  return false;
}

/**
 * 判断是否是微信环境
 */
let isWeChat = function () {
  const ua = navigator.userAgent.toLowerCase();
  if (/MicroMessenger/i.test(ua)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断是否是QQ环境
 */
let isQQ = function () {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/\sQQ/i) !== null) {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断是否是Android环境
 */
let isAndroid = function () {
  var ua = navigator.userAgent.toLowerCase();
  if (/Android/i.test(ua)) {
    return true;
  }
  return false;
}

/**
 * 截取url传递的参数 
 * @param name   参数key值 
 */

let getUrlString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}

/**
 * 设置cookie
 * @param name    key   值
 * @param value   value 值
 */

let setCookie = (name, value) => {
  var expiryday = new Date();
  expiryday.setTime(expiryday.getTime() + 30 * 30 * 24 * 60 * 60 * 1 * 1000);
  document.cookie = name + "=" + escape(value) + "; expires=" + expiryday.toGMTString();
}

/**
 * 获取cookie
 * @param name    key值
 */

let getCookie = (name) => {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

/**
 * 清除cookie
 * @param name    key值
 */

let clearCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * 根据传入的rem值计算当前界面中应显示的px值
 */
let getCurrentPx = (rem) => {
  let viewPort = window.screen.width
  let rootFontSize = 100 * (viewPort / 720)
  return rootFontSize * rem
}

/**
 * $
 */

let $ = (selectors) => {
  return document.querySelector(selectors)
}




export default {
  native_call,
  htmlSetFontSize,
  baiduStatistics,
  isWeChat,
  isQQ,
  isIos,
  isAndroid,
  getUrlString,
  setCookie,
  getCookie,
  clearCookie,
  getCurrentPx,
  $
}
