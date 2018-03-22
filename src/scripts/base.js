import '../styles/reset.css'
import utils from './utils'


utils.htmlSetFontSize()
window.onload = function () {
  let url = 'native://?action=' + encodeURIComponent('onDidFinished');
  document.documentElement.style.webkitTouchCallout = 'none';
  utils.native_call(url)
};
