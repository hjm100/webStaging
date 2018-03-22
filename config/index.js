"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
//获取项目配置文件
const _config = require('./config.json')
// 项目名称
const eventName = _config.eventName

module.exports = {
  dev: { //运行
    assetsSubDirectory: "static", // 编译输出的二级目录
    assetsPublicPath: "/", // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: {},
    // Various Dev Server settings
    host: "localhost", // 运行测试页面的域名（一般指向本地）
    port: 5000, // 运行测试页面的端口
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    //设置打包路径
    // index: path.resolve( //必须是本地文件系统上的绝对路径。
    //   __dirname,
    //   "../../Template/mobile/weui/Clubnew/index.html" //编译输入的 index.html 文件
    // ),
    // Paths
    // assetsRoot: path.resolve(__dirname, "../../Template/mobile/weui/Clubnew"), // 编译输出的静态资源路径
    // assetsSubDirectory: "../../../../Public/assets", // 编译输出的二级目录(图片,js,css等)
    // assetsPublicPath: "./",// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名

    index: path.resolve(__dirname, `../dist/${eventName}/index.html`),
    assetsRoot: path.resolve(__dirname, `../dist/${eventName}`),
    assetsSubDirectory: 'static',
    // assetsPublicPath: `https://cdn.${eventName}.happypoker.cn/`, 可配置 CDN 域名
    assetsPublicPath: `./`,  


    /**
     * Source Maps
     */

    productionSourceMap: true, // 是否开启 cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, // 是否开启 gzip
    productionGzipExtensions: ["js", "css"], // 需要使用 gzip 压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
