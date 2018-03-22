<template>
  <div class="data_details">
    <group class="list_box">
        <cell :title="clubName" :value="clubTime"></cell>
    </group>
    <scroller lock-x scrollbar-y height="65vh" :scroll-bottom-offst="200">
      <div>
        <!-- 表格 -->
        <x-table :cell-bordered="false" style="font-size:13px;background: #fff;">
            <thead>
              <tr>
                <th>局数</th>
                <th v-for="player in detail.players" :key="player.playerid">{{player.nickName}}</th>
                <th>回放</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(round,index) in detail.rounds" :key="index">
                <td>{{round.round}}</td>
                <td v-for="(score,index) in scores[index]" :key="index">{{score.end}}</td>
                <td @click="playback(round.linkkey)">
                 <img src="@/images/huifang_icon.png" alt="回放">
                </td>
              </tr>
            </tbody>
          </x-table>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Group, XTextarea, XTable, Alert, Cell, Scroller } from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      clubName: "", //俱乐部名称
      clubId: null, //俱乐部Id
      clubTime: "", //对战时间
      detail: [],
      scores: []
    };
  },
  components: {
    Group,
    XTextarea,
    XTable,
    Cell,
    Alert,
    Scroller
  },
  created() {
    //初始化数据
    this.nowDate = this.$route.query.date;
    this.clubId = this.$route.query.clubId;
    this.clubTime = `${this.$route.query.date}(${this.$route.query.time})`;
    this.clubName = this.$route.query.clubName;
    this.getTableData();
  },
  methods: {
    getTableData() {
      axios
        .post(
          "/index.php/Mobile/Clubnew/tabledata",
          qs.stringify({
            date: this.nowDate,
            clubId: this.clubId,
            indexid: this.$route.query.indexid,
            tableId: this.$route.query.tableId
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.data) {
            this.detail = res.data.data;
            let playerid = this.detail.players;
            let score = this.detail.rounds;
            playerid.forEach(p => {
              if (p.nickName.length > 3)
                //处理玩家姓名长度
                p.nickName = p.nickName.substring(0, 3).concat("...");
            });
            score.forEach((s, index) => {
              let arr = [];
              playerid.forEach(p => {
                arr.push(s.scores[p.playerid]);
              });
              this.scores.push(arr);
            });
          } else {
            this.showPlugin('今日没有开桌数据');
          }
        });
    },
    playback: function(r) {
      if (r) {
        let url = `http://pb.hbjxqp.happypoker.cn/index.html?key=${r}`;
        window.open(url);
      }else{
        this.showPlugin('敬请期待');
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
.list_box {
  margin-bottom: 20px;
}
.list_box .weui-cell {
  font-size: 0.25rem;
}
.data_details td img {
  width: 0.5rem;
  vertical-align: middle;
}
</style>
<style>
.data_details .list_box .weui-cell .weui-cell__ft {
  color: #000;
}
.data_details .list_box .weui-cell .vux-label {
  font-size: 0.35rem;
  font-weight: 600;
}
</style>


