# vue单页面脚手架开发【v1.0.1】

## 技术栈

vue2 + vuex + vue-router + vux + webpack + ES6/7 + node.js

## 项目运行

``` bash
## 主要命令
npm install            # 安装npm 包
npm run new            # 创建新项目
npm run current        # 查看当前项目
npm run switch         # 选择开发和打包的项目
npm run delete         # 删除某个项目
npm run dev            # 启动项目
npm run build          # 项目打包
##次要命令
npm run build --report # 构建用于生产和查看bundle analyzer报告。
npm run unit           # run unit tests
npm run e2e            # run e2e tests
npm test               # run all tests

```

## 项目布局

```js
.
├── bin                                         // 整个脚手架的入口文件
├── build                                       // webpack配置文件
├── command                                     // 命令控制脚本[new,current,switch,delete]
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── src                                         // 源码目录
│   ├── template                                // 项目原始模板（不能删除，新项目的来源文件）
│   │    ├── components                         // 组件
│   │    │   ├── common                         // 公共组件
│   │    │   │   └── alertTip.vue               // 弹出框组件
│   │    │   ├── footer
│   │    │   │   └── footGuide.vue              // 底部公共组件
│   │    │   └── header
│   │    │       └── head.vue                   // 头部公共组件
│   │    ├── scripts                            // 基本js文件
│   │    │   ├── utils.js                       // 常用方法封装
│   │    │   └── base.js                        // 基础方法引入
│   │    ├── images                             // 公共图片
│   │    ├── assets                             // 有用的外部文件如(.lua,.txt)等
│   │    ├── page                               // 页面文件
│   │    │   ├── home
│   │    │   │   └── home.vue                   // 首页
│   │    │   └── user
│   │    │       └── user.vue                   // 个人中心
│   │    ├── router
│   │    │   └── router.js                      // 路由配置
│   │    ├── service                            // 数据交互统一调配
│   │    │   ├── getData.js                     // 获取数据的统一调配文件，对接口进行统一管理
│   │    ├── store                              // vuex的状态管理
│   │    │   ├── index.js                       // 引用vuex，创建store
│   │    │   ├── actions.js                     // 根级别的 action
│   │    │   └── mutations.js                   // 根级别的 mutation
│   │    │── style
│   │    │   └── common.css                     // 公共样式文件
│   │    ├── App.vue                            // 页面入口文件
│   │    └── main.js                            // 程序入口文件，加载各种公共组件
│   └── hjm100                                  // 创建的新项目（自行创建）
├── favicon.ico                                 // 图标[自行添加]
├── index.html                                  // 入口html文件[所有模板共用一个html入口]
.

```