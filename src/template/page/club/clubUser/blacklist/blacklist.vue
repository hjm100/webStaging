<template>
  <div class="black_list">
    <search placeholder="请输入玩家id进行搜索" cancel-text="搜索" v-model="searchVal" @on-submit="onSubmit" @on-cancel="onSubmit" :auto-fixed="false"></search>
    <div v-show="checkboxShow" class="title">请选择要移出黑名单的玩家</div>
    <ul class="userlest_box">
      <li class="userlest" v-for="black in blacklist" :key="black.id">
          <div class="imgbox">
          <img :src="black.figure || 'https://cdn.hbjxqp.happypoker.cn/static/img/avatar.png'" alt="头像">
          <input class="weui-check" type="checkbox" name="ids[]" :id="black.id" :value="black.id">
           <i @click="select(black.id)" v-show="checkboxShow" class="weui-icon-checked vux-checklist-icon-checked"></i>
          </div>
          <p class="omit">{{black.nick}}</p>
      </li>
      <li class="userlest minus" @click="minus">
          <img src="@/images/jian_icon.png">
      </li>
    </ul>
    <flexbox v-if="checkboxShow" class="fix_btn">
      <flexbox-item>
        <x-button type="primary" @click.native="submit">移 出</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" @click.native="cancel">取 消</x-button>
      </flexbox-item>
    </flexbox>
    <x-button v-else class="fix_btn" type="primary" @click.native="go">确 定</x-button>
  </div>
</template>

<script>
import { XButton, Search, Alert, Flexbox, FlexboxItem, cookie } from "vux";
import axios from "axios";
import qs from "qs";
import { uniqObjectInArray } from "../../../../scripts/utils";
export default {
  data() {
    return {
      clubId: null, //俱乐部id
      whiteListType: 2, //1:白名单 2:黑名单
      blacklist: [], //黑名单用户信息
      checkboxShow: false, //是否显示checkbox (true:显示 false:不显示)
      searchVal: null //储存搜索输入框中的数据
    };
  },
  components: {
    XButton,
    Search,
    Alert,
    Flexbox,
    FlexboxItem
  },
  created() {
    //初始化数据
    if (this.$route.query.clubId) {
      this.clubId = this.$route.query.clubId;
      this.getData();
    } else {
      if (sessionStorage.getItem("black")) {
        this.blacklist = uniqObjectInArray(JSON.parse(sessionStorage.getItem("black")));
        sessionStorage.setItem("black", JSON.stringify(this.blacklist));
      } else {
        sessionStorage.setItem("black", JSON.stringify([]));
      }
    }
  },
  methods: {
    getData() {
      axios
        .post(
          "/index.php/Mobile/Clubnew/clubuser",
          qs.stringify({
            clubId: this.clubId,
            whiteListType: this.whiteListType
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.data) {
            this.blacklist = res.data.data;
          } else {
            this.showPlugin(res.data.msg);
          }
        });
    },
    onSubmit() {
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
      //提交复选框中的数据
      let check_ele = document.querySelectorAll(".imgbox input[type=checkbox]");
      let check_val = [];
      for (let k in check_ele) {
        if (check_ele[k].checked) check_val.push(check_ele[k].value);
      }
      if (this.blacklist.length <= 0) {
        this.showPlugin("您还没有添加黑名单快去添加吧");
      } else if (check_val.length == 0) {
        this.showPlugin("请选择需要删除的用户");
      } else if (this.clubId == null) {
        //创建是删除cookie
        let cookieData = JSON.parse(sessionStorage.getItem("black"));
        check_val.forEach(c => {
          cookieData.forEach((d, index) => {
            if (c == d.id) {
              cookieData.splice(index, 1);
            }
          });
        });
        this.blacklist = cookieData;
        sessionStorage.setItem("black", JSON.stringify(cookieData));
      } else {
        //发送ajax请求
        axios
          .post(
            "/index.php/Mobile/Clubnew/deleteuser",
            qs.stringify({
              clubId: this.clubId,
              whiteListType: this.whiteListType,
              playerIds: check_val
            }),
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8"
              }
            }
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.showPlugin(res.data.msg);
              this.getData();
            } else {
              this.showPlugin(res.data.msg);
            }
          });
      }
    },
    minus() {
      this.checkboxShow = true;
    },
    cancel() {
      this.checkboxShow = false;
      let check_ele = document.querySelectorAll(".imgbox input[type=checkbox]");
      for (var i = 0; i < check_ele.length; i++) {
        check_ele[i].checked = false;
      }
    },
    select(id) {
      let ele = document.getElementById(id);
      ele.checked = !ele.checked;
    },
    go() {
      if (this.$route.query.clubId) {
        this.$router.push({
          path: "/club/create/preview?mode=edit"
        });
      } else {
        this.$router.push({
          path: "/club/create/preview"
        });
      }
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
.title {
  margin: 0.3em 0;
  padding: 0 15px;
  color: rgb(85, 85, 85);
  font-size: 0.25rem;
  line-height: 0.8rem;
  text-align: center;
  background: rgb(230, 231, 234);
}
.omit {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.white_list a {
  color: #000;
}
.userlest_box {
  padding: 0.25rem 0.6rem;
  overflow: auto;
  width: 100%;
  height: 70vh;
}
.userlest {
  font-size: 0.3rem;
  width: 18%;
  float: left;
  height: 20%;
  margin: 1%;
  text-align: center;
}
.imgbox {
  position: relative;
  height: 0.9rem;
  width: 0.9rem;
  margin: 0 auto;
  background: #fff;
}
.userlest img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  vertical-align: top;
}
.imgbox input {
  position: absolute;
  left: -9999em;
}
.imgbox i {
  position: absolute;
  top: -0.1rem;
  right: -0.15rem;
}
.userlest p {
  font-size: 0.2rem;
  padding: 0 0.15rem;
  margin: 0.15rem 0;
}

.fix_btn {
  width: 90%;
  position: fixed;
  bottom: 0.4rem;
  left: 5%;
}

.minus {
  width: 0.9rem;
  height: 0.9rem;
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

.userlest .imgbox .weui-icon-checked:before {
  content: "\EA01";
  color: #c9c9c9;
  font-size: 0.3rem;
  display: block;
  background: #fff;
  border-radius: 50%;
}

.userlest .imgbox .weui-check:checked + .weui-icon-checked:before {
  content: "\EA06";
  color: #09bb07;
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
</style>


