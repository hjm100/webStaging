<template>
  <div class="all_data">
    <card>
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>{{ nowYear }}年</span>
          <p @click="showTime" class="time">{{ nowMonth }}月<i class="arrow"></i></p>
          <!-- 需要引入 datetime标签-->
          <datetime style="display: none;"></datetime>
        </div>
        <div>
          <span>开桌（次）</span>
          <p>{{sumKz}}</p>
        </div>
        <div>
          <span>消耗房卡（张）</span>
          <p>{{sumXh}}</p>
        </div>
      </div>
    </card>
    <group class="list_box">
        <cell :title="data.title" :value="data.value" :is-link="data.href" :link="data.href" v-for="data in datas" v-bind:key="data.day"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Card, Datetime, Alert } from "vux";
import { add0 } from "../../../scripts/utils";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      clubId: null, //俱乐部id
      datas: [], //累计数据
      sumKz: 0, //开桌总数
      sumXh: 0, //消耗房卡总数
      nowdate: "", //当前年月
      nowYear: "", //当前年
      nowMonth: "" //当前月
    };
  },
  components: {
    Card,
    Datetime,
    Group,
    Cell,
    Alert
  },
  created() {
    //获取当前时间
    let date = new Date();
    this.nowYear = date.getFullYear();
    this.nowMonth = add0(date.getMonth() + 1);
    this.nowdate = this.nowYear + "-" + this.nowMonth;
    //初始化数据
    if (this.$route.query.clubId) {
      this.clubId = this.$route.query.clubId;
      this.getData(this.nowdate, this.clubId);
    }
  },
  methods: {
    getData(date, clubId) {
      axios
        .post(
          "/index.php/Mobile/Clubnew/monthdata",
          qs.stringify({
            date: date,
            clubId: clubId
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.data) {
            this.datas = res.data.data;
            this.datas.forEach(d => {
              this.sumKz = this.sumKz + d.createcount;
              this.sumXh = this.sumXh + d.consumedcard;
              d.title = d.day + "日—星期" + d.wname;
              d.value =
                "开桌：" + d.createcount + " 消耗房卡：" + d.consumedcard;
                if(d.isshow == 1){
                  d.href =
                    "/club/clubData/todayData?clubId=" +
                    this.clubId +
                    "&date=" +
                    this.nowdate +
                    "-" +
                    d.day;
                }
            });
          } else {
            this.datas = [];
            this.showPlugin(res.data.msg);
          }
        });
    },
    showTime() {
      let _this = this;
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM",
        startDate:"2016-01-01", //格式必须为 YYYY-MM-DD
        endDate:this.nowdate+'-01',
        value: this.nowdate,
        onConfirm(val) {
          _this.nowYear = val.split("-")[0];
          _this.nowMonth = val.split("-")[1];
          _this.nowdate = val;
          _this.getData(val, _this.clubId);
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
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  position: relative;
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: rgb(85, 85, 85);
  margin: 10px;
  font-size: 0.25rem;
}
.card-demo-flex p {
  font-size: 0.3rem;
  margin-top: 0.25rem;
}
.vux-1px-r:after {
  content: " ";
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-right: 3px solid #c7c7c7;
  color: #c7c7c7;
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}
.card-demo-flex .vux-1px-r {
  flex: 0.7;
}
.weui-panel__bd .time {
  font-size: 0.35rem;
  font-weight: 600;
}
.list_box {
  overflow: auto;
  height: 65vh;
}
.list_box .weui-cell {
  font-size: 15px;
}

/*三角的共用样式*/
.arrow {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 0.12rem;
  bottom: 0.12rem;
  left: 70%;
  border-bottom-width: 0;
  border-top-color: #000;
}
</style>
<style>
.list_box .weui-cell .weui-cell__ft {
  color: #000;
}
</style>


