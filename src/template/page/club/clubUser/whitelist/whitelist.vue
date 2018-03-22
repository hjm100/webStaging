<template>
    <div class="white_list">
        <div v-show="checkboxShow" class="title">请选择要移出白名单的玩家</div>
        <ul class="userlest_box">
            <li class="userlest" v-for="user in users" :key="user.id">
                <div class="imgbox">
                  <img :src="user.figure || 'https://cdn.hbjxqp.happypoker.cn/static/img/avatar.png'" alt="头像">
                  <input type="checkbox" class="weui-check" name="ids[]" :id="user.id" :value="user.id">
                  <i @click="select(user.id)" v-show="checkboxShow" class="weui-icon-checked vux-checklist-icon-checked"></i>
                </div>
                <p class="omit">{{user.nick}}</p>
            </li>
            <li class="userlest add">
              <router-link class="imgbox" :to="{ name: 'userList', query: { clubId: clubId}}">
                <img src="@/images/tianjia_icon.png">
              </router-link>
              <p class="omit">添加</p>
            </li>
            <li class="userlest minus" @click="minus">
              <div class="imgbox">
                <img src="@/images/jian_icon.png">
              </div>
              <p class="omit">删除</p>
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
import { XButton, Alert, Flexbox, FlexboxItem, cookie } from "vux";
import axios from "axios";
import qs from "qs";
import { uniqObjectInArray } from "../../../../scripts/utils";
export default {
  data() {
    return {
      clubId: null, //俱乐部id
      whiteListType: 1, //1:白名单 2:黑名单
      users: [], //用户信息
      checkboxShow: false //是否显示checkbox (true:显示 false:不显示)
    };
  },
  created() {
    //初始化数据
    if (this.$route.query.clubId) {
      this.clubId = this.$route.query.clubId;
      this.getData();
    } else {
      if (sessionStorage.getItem("white")) {
        this.users = uniqObjectInArray(
          JSON.parse(sessionStorage.getItem("white"))
        );
        sessionStorage.setItem("white", JSON.stringify(this.users));
      } else {
        sessionStorage.setItem("white", JSON.stringify([]));
      }
    }
  },
  components: {
    XButton,
    Alert,
    Flexbox,
    FlexboxItem
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
            this.users = res.data.data;
          } else {
            this.showPlugin(res.data.msg);
          }
        });
    },
    submit() {
      //提交复选框中的数据
      let check_ele = document.querySelectorAll(".imgbox input[type=checkbox]");
      let check_val = [];
      for (let k in check_ele) {
        if (check_ele[k].checked) check_val.push(check_ele[k].value);
      }
      if (this.users.length <= 0) {
        this.showPlugin("您还没有添加白名单快去添加吧");
      } else if (check_val.length == 0) {
        this.showPlugin("请选择需要删除的用户");
      } else if (this.clubId == null) {
        //创建是删除cookie
        let cookieData = JSON.parse(sessionStorage.getItem("white"));
        check_val.forEach(c => {
          cookieData.forEach((d, index) => {
            if (c == d.id) {
              cookieData.splice(index, 1);
            }
          });
        });
        this.users = cookieData;
        sessionStorage.setItem("white", JSON.stringify(cookieData));
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
            if (res.data.code == 1) {
              this.getData();
            } else {
              this.showPlugin(res.data.msg);
            }
          });
      }
    },
    minus() {
      if (this.users.length > 0) {
        this.checkboxShow = true;
      }
    },
    cancel() {
      this.checkboxShow = false;
      let check_ele = document.querySelectorAll(".imgbox input[type=checkbox]");
      for (var i = 0; i < check_ele.length; i++) {
        check_ele[i].checked = false;
      }
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
    select(id) {
      let ele = document.getElementById(id);
      ele.checked = !ele.checked;
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
.white_list a {
  color: #000;
}
.userlest_box {
  padding: 0.25rem 0.6rem;
  width: 100%;
  height: 80vh;
  overflow: auto;
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
.imgbox img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.fix_btn {
  width: 90%;
  position: fixed;
  bottom: 0.4rem;
  left: 5%;
}
.add a {
  display: block;
}
.add,
.minus {
  color: #f5f5f5;
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


