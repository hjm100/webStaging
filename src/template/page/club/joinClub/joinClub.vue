<template>
  <div class="user_list">
    <group>
    <div class="list_cells">
        <div class="list_cell" v-for="userlist in userlists" :key="userlist.wanjia_id">
          <img :src="userlist.figure || 'https://cdn.hbjxqp.happypoker.cn/static/img/avatar.png'" alt="头像">
          <div class="user_text">
            <h4>{{ userlist.nickname }}</h4>
            <p>ID:{{ userlist.wanjia_id }}</p>
          </div>
          <div class="user_ft">
              <div class="user_box">
                <x-button class="btn_sun" mini @click.native="check(userlist.wanjia_id,userlist.clubID,1)">确定</x-button>
                <x-button class="btn_cancel" plain mini @click.native="check(userlist.wanjia_id,userlist.clubID,2)">拒绝</x-button>
              </div>
              <span>（申请加入{{userlist.clubname}}俱乐部）</span>
          </div>
        </div>
    </div>
    </group>
    
  </div>
</template>

<script>
import { Group, XButton, Alert } from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      userlists: [] //获取选中用户容器
    };
  },
  components: {
    XButton,
    Group,
    Alert
  },
  created() {
    //初始化数据
    this.getData();
  },
  methods: {
    getData() {
      axios.get("/index.php/Mobile/Clubnew/recordslist").then(res => {
        if (res.data.data) {
          this.userlists = res.data.data;
        } else {
          this.showPlugin(res.data.msg);
        }
      });
    },
    check(wanjia_id, clubId, status) {
      axios
        .post(
          "/index.php/Mobile/Clubnew/auditrecord",
          qs.stringify({
            wanjia_id: wanjia_id,
            clubId: clubId,
            status: status
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.code == 1) {
            this.getData();
            this.showPlugin(res.data.msg);
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
.list_cells{
  height: 80vh;
  overflow: auto;
}
.user_list .list_cell {
  padding: 10px 15px;
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
  width: .9rem;
  height: .9rem;
  border-radius: 5px;
}
.user_list .list_cell span {
  color: #999999;
  font-size: 0.25rem;
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
.user_box {
  color: #000;
  text-align: right;
  padding: 0 15px;
}
.user_box .btn_sun {
  color: #fff;
  background-color: #1aad19;
}
.user_box .btn_cancel {
  border: 1px solid #d9d9d9;
}
</style>

