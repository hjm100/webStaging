// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import {
  DatetimePlugin,
  AlertPlugin,
  ConfirmPlugin,
  LoadingPlugin,
  ToastPlugin
} from "vux";
import routes from "./router/router";
import store from "./store/index.js";
import "./scripts/base";
import "./style/common.css";
import axios from "axios";
import ApiService from "./service/getData.js";
require("es6-promise").polyfill();
Vue.config.productionTip = false;

//定义路由函数
Vue.use(VueRouter);
//使用时间组件
Vue.use(DatetimePlugin);
//弹框
Vue.use(AlertPlugin);
//操作框
Vue.use(ConfirmPlugin);
//loading
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
//api服务
Vue.prototype.apiService = new ApiService();
const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

axios.interceptors.request.use(
  function(config) {
    // 发送请求之前做一些事情
    Vue.$vux.loading.show({
      text: ""
    });

    return config;
  },
  function(error) {
    // 挂掉之后怎么处理
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // 数据成功返回之后
    Vue.$vux.loading.hide();
    return response;
  },
  function(error) {
    // 处理错误的内容
    Vue.$vux.loading.hide();
    // 如果错啦
    Vue.$vux.toast.show({
      text: "请稍后再试哦"
    });
  }
);

/* eslint-disable no-new */
new Vue({
  router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store
}).$mount("#app");
