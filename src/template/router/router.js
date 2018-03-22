import App from "../App";

const home = r =>
  require.ensure([], () => r(require("../page/home/home")), "home");
const user = r =>
  require.ensure([], () => r(require("../page/user/user")), "user");

import club from "../page/club/club.vue";
import clubhome from "../page/club/clubhome.vue";
// 创建俱乐部
import createclub from "../page/club/createclub/createclub.vue";
import gamelist from "../page/club/createclub/gamelist.vue";
import gametypes from "../page/club/createclub/gametypes.vue";
import gamerule from "../page/club/createclub/gamerule.vue";
import clubtitle from "../page/club/createclub/clubtitle.vue";
import clubtips from "../page/club/createclub/clubtips.vue";
import switchlist from "../page/club/createclub/switchwhitelist.vue";
import clubpreview from "../page/club/createclub/clubpreview.vue";
import demo from "../page/demo/demo.vue";
import clubUser from "../page/club/clubUser/clubUser.vue";
import whiteDesc from "../page/club/clubUser/whitelist/whiteDesc.vue";
import whitelist from "../page/club/clubUser/whitelist/whitelist.vue";
import userList from "../page/club/clubUser/whitelist/children/userList.vue";
import aKeyToImport from "../page/club/clubUser/whitelist/children/children/aKeyToImport.vue";
import importUser from "../page/club/clubUser/whitelist/children/children/importUser.vue";
import search from "../page/club/clubUser/search/search.vue";
import searchError from "../page/club/clubUser/search/error.vue";
import searchSuccess from "../page/club/clubUser/search/success.vue";
import blackDesc from "../page/club/clubUser/blacklist/blackDesc.vue";
import blacklist from "../page/club/clubUser/blacklist/blacklist.vue";
import joinClub from "../page/club/joinClub/joinClub.vue";
import clubData from "../page/club/clubData/clubData.vue";
import allData from "../page/club/clubData/allData.vue";
import todayData from "../page/club/clubData/todayData.vue";
import dataDetails from "../page/club/clubData/children/dataDetails.vue";
import clubShare from "../page/club/clubShare/clubShare.vue";

export default [
  {
    path: "/",
    component: App, //顶层路由，对应index.html
    children: [
      //二级路由。对应App.vue
      {
        //地址为空时跳转home页面
        path: "",
        redirect: "/club"
      },
      {
        //首页
        path: "/home",
        component: home
      },
      {
        //个人中心
        path: "/user",
        component: user
      },
      {
        path: "/demo",
        component: demo
      }
    ]
  },
  {
    path: "/club",
    component: club,
    children: [
      {
        path: "",
        redirect: "clubhome"
      },
      {
        path: "clubhome",
        meta: {
          title: "我的俱乐部"
        },
        component: clubhome
      },
      {
        path: "create",
        component: createclub,
        children: [
          {
            path: "",
            redirect: "gametypes"
          },
          {
            meta: {
              title: "选择游戏类型"
            },
            path: "gametypes",
            component: gametypes
          },
          {
            meta: {
              title: "选择游戏"
            },
            path: "gameList",
            component: gamelist
          },
          {
            path: "gameRule",
            component: gamerule
          },
          {
            meta: {
              title: "填写俱乐部名称"
            },
            path: "title",
            component: clubtitle
          },
          {
            meta: {
              title: "填写俱乐部公告"
            },
            path: "tips",
            component: clubtips
          },
          {
            meta: {
              title: "选择是否启用名单保护"
            },
            path: "switch",
            component: switchlist
          },
          {
            meta: {
              title: "俱乐部预览"
            },
            path: "preview",
            component: clubpreview
          }
        ]
      },
      {
        path: "clubUser",
        component: clubUser,
        children: [
          {
            path: "",
            redirect: "whitelist"
          },
          {
            meta: {
              title: "添加白名单"
            },
            path: "whitelist",
            component: whitelist
          },
          {
            meta: {
              title: "添加白名单"
            },
            path: "whiteDesc",
            component: whiteDesc
          },
          {
            meta: {
              title: "备选名单列表"
            },
            path: "userList",
            name: "userList",
            component: userList
          },
          {
            meta: {
              title: "白名单快捷导入"
            },
            path: "aKeyToImport",
            name: "aKeyToImport",
            component: aKeyToImport
          },
          {
            meta: {
              title: "白名单列表"
            },
            path: "importUser",
            component: importUser
          },
          {
            path: "search",
            component: search
          },
          {
            meta: {
              title: "搜索玩家"
            },
            path: "searchSuccess",
            component: searchSuccess
          },
          {
            meta: {
              title: "搜索玩家"
            },
            path: "searchError",
            component: searchError
          },
          {
            meta: {
              title: "黑名单列表"
            },
            path: "blacklist",
            component: blacklist
          },
          {
            meta: {
              title: "什么是黑名单"
            },
            path: "blackDesc",
            component: blackDesc
          },
          {
            meta: {
              title: "申请列表"
            },
            path: "joinClub",
            component: joinClub
          }
        ]
      },
      {
        path: "clubData",
        component: clubData,
        children: [
          {
            path: "",
            redirect: "allData"
          },
          {
            meta: {
              title: "累计统计"
            },
            path: "allData",
            component: allData
          },
          {
            meta: {
              title: "今日统计"
            },
            path: "todayData",
            component: todayData
          },
          {
            meta: {
              title: "今日单桌数据统计"
            },
            path: "dataDetails",
            component: dataDetails
          }
        ]
      },
      {
        name: "clubShare",
        path: "clubShare",
        component: clubShare
      }
    ]
  }
];
