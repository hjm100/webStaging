<template>
  <div class="user_list">
    <div class="title">
      注：所有购买过您的房卡、填写过您的代理商邀请码或在您未开启白名单时在俱乐部中游戏过的玩家，都会出现在下列名单列表中供您选择。
    </div>
    <group>
        <div class="box">
            <checklist required :options="clubList" @on-change="change"></checklist>
            <div class="box_cell">
                <cell v-for="club in clubList" :key="club.key" :link="{path:'/club/clubUser/importUser?clubId='+club.key}"></cell>
            </div>
        </div>
    </group>
    <p style="text-align: center;" v-show="showDec">你还没有创建俱乐部刚快去创建俱乐部吧</p>
    <x-button class="fix_btn" type="primary" @click.native="submit">确定</x-button>
  </div>
</template>

<script>
import { Group, Cell, XButton, Checklist, Alert, cookie } from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      clubList: [], //俱乐部列表
      checklist: [], //选中的容器
      clubId: null, //俱乐部id
      whiteListType: 1, //1:白名单 2:黑名单
      userList: [], //玩家id
      showDec: false //当什么数据为空的时候显示提示文字
    };
  },
  created() {
    //初始化数据
    this.getClubList();
    this.clubId = this.$route.query.clubId;
  },
  components: {
    Checklist,
    XButton,
    Group,
    Cell,
    Alert
  },
  methods: {
    getClubList() {
      axios.get("/index.php/Mobile/Clubnew/clubwhitelist").then(res => {
        if (res.data.data) {
          if (res.data.data.length == 0) {
            this.showDec = true;
          } else {
            this.clubList = res.data.data;
            this.clubList.forEach(function(c) {
              // 替换后端数据的key格式以满足Checklist空间的使用
              c["key"] = c["clubId"];
              c["value"] = c["name"];
            });
          }
        } else {
          this.showPlugin("请您重新登录");
        }
      });
    },
    change(val) {
      this.checklist = val;
    },
    submit() {
      if (this.showDec) {
        this.$router.go(-1)
      } else if (this.checklist.length == 0) {
        this.showPlugin("请选择需要俱乐部");
      } else {
        //发送ajax请求
        axios
          .post(
            "/index.php/Mobile/Clubnew/importlist",
            qs.stringify({
              clubId: this.clubId,
              whiteListType: this.whiteListType,
              clubIds: this.checklist.join(",")
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
              if (this.clubId == null) {
                let cookieData = JSON.parse(sessionStorage.getItem("white"));
                res.data.data.forEach(s => {
                  cookieData.push(s);
                });
                //将最新的元素设置到cookie中
                sessionStorage.setItem("white", JSON.stringify(cookieData));
                this.$router.push({
                  path: "/club/clubUser/whitelist"
                });
              } else {
                res.data.data.forEach(s => {
                  this.userList.push(s.id);
                });
                axios
                  .post(
                    "/index.php/Mobile/Clubnew/adduser",
                    qs.stringify({
                      clubId: this.clubId,
                      whiteListType: this.whiteListType,
                      playerIds: this.userList
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
                    }
                  })
                  .catch(err => {
                    this.showPlugin("请稍后重试");
                  });
              }
            } else {
              this.showPlugin(res.data.msg);
            }
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
  padding: 0 15px;
  color: rgb(85, 85, 85);
  font-size: 0.25rem;
  line-height: 0.45rem;
  background: rgb(230, 231, 234);
}
.fix_btn {
  width: 90%;
  position: fixed;
  bottom: 0.4rem;
  left: 5%;
}
.box {
  position: relative;
  overflow: auto;
  height: 70vh;
}
.box_cell {
  width: 50%;
  position: absolute;
  top: 1px;
  right: 0;
}
.box_cell .weui-cell:before {
  height: 0;
  border-top: none;
}
.box_cell .weui-cell {
  height: 46px;
}

.weui-cell_access:active,
.vux-tap-active:active {
  background-color: inherit;
}
</style>

<style>
.box .weui-cells_checkbox .weui-check_label p {
  width: 85%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

