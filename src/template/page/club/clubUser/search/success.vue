<template>
  <div class="user_list">
    <div class="list_cell">
        <img :src="$route.query.figure || 'https://cdn.hbjxqp.happypoker.cn/static/img/avatar.png'" alt="头像">
        <div class="user_text">
            <h4>{{$route.query.nick}}</h4>
            <p>{{$route.query.id}}</p>
        </div>
        <x-button mini class="fix_btn" type="primary" @click.native="submit()">添 加</x-button>
    </div>
  </div>
</template>

<script>
import { XButton, Toast, cookie } from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      clubId: null, //俱乐部id
      userType: "", //白名单或者黑名单
      href: "" //添加后跳转的链接
    };
  },
  components: {
    Toast,
    XButton
  },
  created() {
    this.clubId = this.$route.query.clubId;
    if (this.$route.query.whiteListType == 2) {
      this.userType = "black";
      this.href = "/club/clubUser/blacklist";
    } else {
      this.userType = "white";
      this.href = "/club/clubUser/whitelist";
    }
  },
  methods: {
    submit() {
      if (this.clubId == null) {
        let user = {
          figure: this.$route.query.figure,
          id: this.$route.query.id,
          nick: this.$route.query.nick
        };

        let cookieData = JSON.parse(sessionStorage.getItem(this.userType));
        cookieData.push(user);
        //将最新的元素设置到cookie中
        sessionStorage.setItem(this.userType, JSON.stringify(cookieData));
        this.$router.push({
          path: this.href
        });
      } else {
        axios
          .post(
            "/index.php/Mobile/Clubnew/adduser",
            qs.stringify({
              clubId: this.clubId,
              whiteListType: this.$route.query.whiteListType,
              playerIds: [this.$route.query.id],
              type:2
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
                path: this.href+`?clubId=${this.clubId}`
              });
            }else if(res.data.code == -3){
              this.toast("cancel", '该用户已在您的名单中，请勿重复添加！',"auto");
            } else {
              this.toast("cancel", res.data.msg);
            }
          })
          .catch(err => {
            this.toast("cancel", "请求数据出错", "auto");
          });
      }
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
    }
  }
};
</script>

<style scoped>
.fix_btn {
  line-height: 0.7rem;
  padding: 0 0.4rem;
}
.user_list .list_cell {
  padding: 0.25rem;
  margin-top: 0.35rem;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  background: #fff;
}
.user_list .list_cell img {
  margin-right: 0.8em;
  width: 0.9rem;
  height: 0.9rem;
  text-align: center;
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
  margin-top: 0.15rem;
}
</style>


