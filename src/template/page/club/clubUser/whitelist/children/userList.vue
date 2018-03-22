<template>
  <div class="user_list">
    <search placeholder="请输入玩家id进行搜索" cancel-text="搜索" v-model="searchVal" @on-submit="onSubmit" @on-cancel="onSubmit" :auto-fixed="false" ref="search"></search>
    <div class="title_top">
      <span class='title_btn_box'>支持原有俱乐部名单一键导入功能</span>
      <router-link class='title_btn' :to="{ name: 'aKeyToImport', query: { clubId: clubId}}">
        一键导入
      </router-link>
    </div>
    <div v-show="titleShow" class="title">
      注：所有购买过您的房卡、填写过您的代理商邀请码或在您未开启白名单时在俱乐部中游戏过的玩家，都会出现在下列名单列表中供您选择。
      <span @click="titleHide">x</span>
      </div>
    <group>
    <checker v-model="userlist"  class="list_cells" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
        <checker-item :value="user.id" class="list_cell" v-for="user in users" :key="user.id">
          <i class="weui-icon-checked vux-checklist-icon-checked"></i>
          <img :src="user.figure || 'https://cdn.hbjxqp.happypoker.cn/static/img/avatar.png'" alt="头像">
          <div class="user_text">
            <h4>{{user.nick}}</h4>
            <p>{{user.id}}</p>
          </div>
        </checker-item>
    </checker>
    </group>
    <x-button class="fix_btn" type="primary" @click.native="submit">添加</x-button>
  </div>
</template>

<script>
import {
  Group,
  Cell,
  XButton,
  Checker,
  CheckerItem,
  Search,
  Alert,
  cookie
} from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      users: [], //用户信息
      clubId: null, //俱乐部id
      whiteListType: 1, //1:白名单 2:黑名单
      userlist: [], //获取选中名单
      searchVal: null, //储存搜索输入框中的数据
      titleShow: true // 注显示或隐藏， true显示 false隐藏
    };
  },
  created() {
    this.clubId = this.$route.query.clubId;
    //初始化数据
    this.getData();
  },
  // mounted() {
    //默认搜索框获取焦点
    // this.$refs.search.setFocus();
  // },
  components: {
    XButton,
    Search,
    Group,
    Cell,
    Checker,
    CheckerItem,
    Alert
  },
  methods: {
    getData() {
      axios
        .post(
          "/index.php/Mobile/Clubnew/getallusers",
          qs.stringify({
            clubId: this.clubId
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.data) {
            this.users = res.data.data;
          } else {
            this.showPlugin(res.data.msg);
          }
        });
    },
    onSubmit() {
      /**
       * 搜索成功后带参数跳转到成功页面
       * 失败后跳转失败页面
       */
      axios
        .post(
          "/index.php/Mobile/Clubnew/searchuser",
          qs.stringify({
            playerid: this.searchVal
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$router.push({
              path: "/club/clubUser/searchError"
            });
          } else if (res.data.code == 1) {
            this.$router.push({
              path: "/club/clubUser/searchSuccess",
              query: {
                clubId: this.clubId,
                whiteListType: this.whiteListType,
                id: res.data.data.id,
                nick: res.data.data.nick,
                figure: res.data.data.figure
              }
            });
          }
        })
        .catch(err => {
          this.showPlugin("请求数据出错");
        });
    },
    submit() {
      //根据clubId是否为null来判断是创建俱乐部还是修改俱乐部
      //如果是创建俱乐部则将选择的内容存入到cookie
      //如果修改俱乐部的话就直接使用添加接口
      if (this.userlist.length == 0) {
        this.showPlugin("请选择玩家进行添加");
      } else {
        if (this.clubId == null) {
          let list = [];
          this.userlist.forEach(l => {
            this.users.forEach(u => {
              if (l == u.id) {
                list.push(u);
              }
            });
          });
          let cookieData = JSON.parse(sessionStorage.getItem("white"));
          list.forEach(s => {
            cookieData.push(s);
          });
          //将最新的元素设置到cookie中
          sessionStorage.setItem("white", JSON.stringify(cookieData));
          this.$router.push({
            path: "/club/clubUser/whitelist"
          });
        } else {
          axios
            .post(
              "/index.php/Mobile/Clubnew/adduser",
              qs.stringify({
                clubId: this.clubId,
                whiteListType: this.whiteListType,
                playerIds: this.userlist
              }),
              {
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded; charset=UTF-8"
                }
              }
            )
            .then(res => {
              if (res.data.code == 1) {
                this.$router.push({
                  path: `/club/clubUser/whitelist?clubId=${this.clubId}`
                });
              } else {
                this.showPlugin(res.data.msg);
              }
            })
            .catch(err => {
              this.showPlugin("请求数据出错");
            });
        }
      }
    },
    titleHide() {
      this.titleShow = false;
    },
    showPlugin(msg) {
      this.$vux.alert.show({
        title: "河北家乡棋牌",
        content: msg
      });
      setTimeout(() => {
        //提示弹框
        this.$vux.alert.hide();
      }, 3000);
    }
  }
};
</script>

<style scoped>
.title_top {
  position: relative;
  padding: 0 15px;
  font-size: 0.26rem;
  line-height: 0.6rem;
  background: #fff;
  overflow: hidden;
}
.title_top:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #d7d6dc;
  color: #d7d6dc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
/**一键导入按钮样式*/
.title_btn_box {
  font-size: 0.3rem;
}
.title_top .title_btn {
  float: right;
  color: #fff;
  line-height: 0.5rem;
  margin-top: 0.05rem;
  padding: 0 10px;
  border-radius: 5px;
  background: #1aad19;
}

.title {
  position: absolute;
  padding: 0 0.8rem 0 15px;
  color: rgb(85, 85, 85);
  font-size: 0.26rem;
  line-height: 0.45rem;
  background: rgba(230, 231, 234, 0.9);
  z-index: 9;
}
.title span {
  position: absolute;
  right: 0.1rem;
  top: 0;
  font-size: 0.5rem;
  padding: 0.1rem;
  color: #aaa;
}
.fix_btn {
  width: 90%;
  position: fixed;
  bottom: 20px;
  left: 5%;
}
.user_list .list_cells {
  height: 65vh;
  overflow: auto;
  padding-bottom: 40px;
}
.user_list .list_cell {
  padding: 10px 0.15rem;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.user_list .list_cell img {
  margin-right: 0.8em;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 5px;
}
.user_list .list_cell span {
  color: #999999;
  font-size: 13px;
}
.user_list .user_text {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.user_list .user_text h4 {
  font-size: 0.3rem;
  font-weight: 600;
}
.user_list .user_text p {
  color: rgb(85, 85, 85);
  font-size: 0.26rem;
}
.user_list .list_cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d9d9d9;
  color: #d9d9d9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
/**选中时的样式*/
#app .demo1-item-selected .weui-icon-checked:before {
  content: "\EA06";
  color: #09bb07;
}
.user_list .vux-no-group-title {
  margin-top: 0;
}
#app .vux-tap-active:active {
  background-color: initial;
}

.list_cells .list_cell .weui-check {
  position: absolute;
  /* left: -9999em; */
}

[class^="weui-icon-"],
[class*=" weui-icon-"] {
  display: inline-block;
  vertical-align: middle;
  font: normal normal normal 14px/1 "weui";
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.list_cells .weui-icon-checked:before {
  content: "\EA01";
  color: #c9c9c9;
  font-size: 0.5rem;
  display: block;
  background: #fff;
  border-radius: 50%;
  margin: 0 0.2rem 0 0;
}
</style>

<style>
/* 搜索样式重写 */

#app .weui-search-bar,
#app .weui-search-bar__form {
  background-color: initial;
}

#app .weui-search-bar__form:after,
#app .weui-search-bar__label {
  border-radius: 26px;
  border: 1px solid #efeff4;
}
#app .weui-search-bar__cancel-btn {
  display: block;
}
/* #app .weui-search-bar__label {
  display: none!important;
} */
</style>

