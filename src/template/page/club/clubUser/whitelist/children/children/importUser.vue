<template>
    <div class="import_user">
        <ul class="userlest_box">
            <li class="userlest" v-for="user in users" :key="user.id">
                <img :src="user.figure || 'https://cdn.hbjxqp.happypoker.cn/static/img/avatar.png'" alt="头像">
                <p>{{user.nick}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { Alert } from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      users: [],
      whiteListType: 1 //1:白名单 2:黑名单
    };
  },
  components: {
    Alert
  },
  created() {
    //初始化数据
    this.getClubList();
  },
  methods: {
    getClubList() {
      axios
        .post(
          "/index.php/Mobile/Clubnew/clubuser",
          qs.stringify({
            clubId: this.$route.query.clubId,
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
.userlest_box {
  padding: .25rem .6rem;
  width: 100%;
  height: 80vh;
  overflow: auto;
}
.userlest {
  font-size: 0.3rem;
  width: 18%;
  float: left;
  overflow: hidden;
  height: 20%;
  margin: 1%;
  text-align: center;
}
.userlest img {
  height: .9rem;
  width: .9rem;
  border-radius: 6px;
}
.userlest p {
  font-size: .2rem;
  padding: 0 .15rem;
  margin: .15rem 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}

</style>


