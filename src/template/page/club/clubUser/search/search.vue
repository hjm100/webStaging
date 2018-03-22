<template>
  <div class="user_list">
    <search v-model="searchVal" @on-submit="onSubmit" :auto-fixed="false"></search>
     <div class="list_cell">
        <img :src="figure || 'https://cdn.hbjxqp.happypoker.cn/static/img/avatar.png'" alt="头像">
            <div class="user_text">
            <h4>{{nick}}</h4>
            <p>{{id}}</p>
        </div>
    </div>
    <x-button class="fix_btn" type="primary" @click.native="submit()">添加至俱乐部白名单</x-button>
  </div>
</template>

<script>
import { XButton, Toast, Search,Alert } from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      searchVal: null, //储存搜索输入框中的数据
      id: null,
      nick: null,
      figure: null
    };
  },
  components: {
    Toast,
    Search,
    XButton,
    Alert
  },
  methods: {
    onSubmit(val) {
      /**
       * 搜索成功后带参数跳转到成功页面
       * 失败后跳转失败页面
       */
      axios
        .post(
          "/index.php/Mobile/Clubnew/searchuser",
          qs.stringify({
            playerid: val
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.code == 0) {
          } else if (res.data.code == 1) {
            this.id = res.data.data.id;
            this.nick = res.data.data.nick;
            this.figure = res.data.data.figure;
          }
        })
        .catch(err => {
          this.showPlugin("请求数据出错");
        });
    },
    submit() {
      axios
        .post(
          "/index.php/Mobile/Clubnew/adduser",
          qs.stringify({
            clubId: this.$route.query.clubId,
            whiteListType: this.$route.query.whiteListType,
            playerIds: this.searchVal
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.code == 1) {
            this.toast("success", res.data.msg);
          } else {
            this.toast("cancel", res.data.msg);
          }
        })
        .catch(err => {
          this.toast("cancel", "请求数据出错", "auto");
        });
    },
    //显示弹框函数
    toast(type, val, width) {
      const _this = this;
      if (val) {
        this.$vux.toast.show({
          type: type, //弹框类型
          text: val,
          width: width
        });
      } else {
        this.$vux.toast.hide();
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
.user_list {
  padding-bottom: 60px;
  height: 100vh;
}
.fix_btn {
  width: 90%;
  /* position: fixed;
  top: 150px;
  left: 5%; */
}
.user_list .list_cell {
  padding: 10px 15px;
  margin: 20px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  border: 1px solid #ccc;
}
.user_list .list_cell img {
  margin-right: 0.8em;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.user_list .user_text {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.user_list .user_text h4 {
  font-weight: 400;
  font-size: 16px;
}
.user_list .user_text p {
  color: #999999;
  font-size: 14px;
}
</style>