<template>
  <div class="today">
    <div class="today_hd">
        <div class="hd_top">
            <h3 class="left">{{ clubName }} <span class="gray">{{clubDec}}</span></h3>
            <span class="gray right">{{nowDate}}</span>
        </div>
        <div class="hd_bottom">
            <p class="kz left">开桌总数：<span class="red">{{sumKz}}</span>桌</p>
            <p class="xh right">房卡消耗总数：<span class="red">{{sumXh}}</span>张</p>
        </div>
    </div>
      <group title="说明：红色字体为大赢家" class="list_box">
        <scroller lock-x scrollbar-y height="65vh" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
          <div>
            <router-link class="today_cell" v-for="data in datas" v-bind:key="data.time" :to="data.herf">
              <div class="today_cell_hd">
                <p class="left">桌号:{{ data.tableid }}</p>
                <p class="right">{{ data.time }}</p>
                <div class="clear"></div>
              </div>
              <div class="today_cell_bd">
                <x-table full-bordered style="font-size:13px; line-height: 30px;">
                  <tbody>
                    <tr>
                      <td :class="{red: player.ismax}" v-for="player in data.players" v-bind:key="player.name">{{player.nickName}}</td>
                    </tr>
                    <tr>
                       <td :class="{red: player.ismax}" v-for="player in data.players" v-bind:key="player.name">{{player.score}}</td>
                    </tr>
                  </tbody>
                </x-table>
              </div>
            </router-link>
            <load-more v-show="onFetching" :tip="loading"></load-more>
          </div>
        </scroller>
      </group>
  </div>
</template>

<script>
import {
  Group,
  Cell,
  Card,
  XTextarea,
  XTable,
  Datetime,
  Alert,
  Scroller,
  LoadMore
} from "vux";
import axios from "axios";
import qs from "qs";
import { timestamp_switch_time } from "../../../scripts/utils";
export default {
  data() {
    return {
      onFetching: false,
      clubName: "", //俱乐部名称
      clubId: null, //俱乐部Id
      clubDec: "", //俱乐部付费描述
      sumKz: 0, //开桌总数
      sumXh: 0, //消耗房卡总数
      nowDate: "", //当前时间
      datas: [],
      page: 1, //页数
      loading:'loading' //下拉刷新显示提示
    };
  },
  components: {
    Card,
    Datetime,
    Group,
    XTextarea,
    XTable,
    Cell,
    Alert,
    Scroller,
    LoadMore
  },
  created() {
    //初始化数据
    this.nowDate = this.$route.query.date;
    this.clubId = this.$route.query.clubId;
    this.getDailyData(this.nowDate, this.clubId);
    //请求单日统计列表
    this.getDailyDataList(10, 1);
  },
  methods: {
    getDailyData(date, clubId) {
      axios
        .post(
          "/index.php/Mobile/Clubnew/dailydata",
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
            this.clubName = res.data.data.activityName;
            this.sumKz = res.data.data.tableCount;
            this.sumXh = res.data.data.tableAllCost;
            if (res.data.data.costType == 1) {
              this.clubDec = "房卡由我出:" + res.data.data.cost + "张房卡/每桌";
            } else if (res.data.data.costType == 2) {
              this.clubDec = "AA付费:" + res.data.data.cost + "张房卡/每桌";
            }
          } else {
            this.showPlugin(res.data.msg);
          }
        });
    },
    /**
     * pagesize 一页显示个数
     * currentpage 页码
     */
    getDailyDataList(pagesize, currentpage) {
      console.log(currentpage)
      //使用下拉刷新来做到数据请求
      axios
        .post(
          "/index.php/Mobile/Clubnew/dailydatalist",
          qs.stringify({
            date: this.nowDate,
            clubId: this.clubId,
            pagesize: pagesize,
            currentpage: currentpage
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          }
        )
        .then(res => {
          if (res.data.data) {
            res.data.data.forEach(d => {
              d.time =
                timestamp_switch_time(d.starttime)
                  .split(" ")
                  .pop() +
                " - " +
                timestamp_switch_time(d.endtime)
                  .split(" ")
                  .pop();
              d.herf = `/club/clubData/dataDetails?date=${this.nowDate}&time=${
                d.time
              }
              &clubId=${this.clubId}&indexid=${d.indexid}&clubName=${
                this.clubName
              }
              &tableId=${d.tableid}`;
              d.players.forEach((p, index) => {
                if (p.nickName.length > 3)
                  //处理玩家姓名长度
                  p.nickName = p.nickName.substring(0, 3).concat("...");
              });
            });
            this.datas = this.datas.concat(res.data.data);
          } else {
            this.loading = '没有更多数据了'
            this.onFetching = true;
            this.page--
            setTimeout(() => {
              this.onFetching = false;
            }, 3000);
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
    },
    onScrollBottom() {
      if (this.onFetching) {
        // do nothingreset
      } else {
        this.loading='loading'
        this.onFetching = true;
        setTimeout(() => {
          this.$nextTick(() => {
            this.page++;
            // 此处调用数据请求函数
            this.getDailyDataList(10, this.page);
          });
          this.onFetching = false;
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
/*公共样式*/
.left {
  float: left;
}
.right {
  float: right;
}
.red {
  color: #f00;
}
.gray {
  color: #999999;
}
.clear {
  clear: both;
}
/*头部样式*/

.today_hd,
.today_cell {
  padding: 10px 15px;
  position: relative;
  overflow: hidden;
  background: #fff;
  font-size: 0.3rem;
}
.today_cell {
  padding: 0.2rem 0.6rem 0.2rem 0.2rem;
  margin-bottom: 15px;
  display: block;
  color: #000;
}
.today_hd .hd_top {
  overflow: hidden;
}
.today_hd .hd_top > h3 > span {
  font-size: 0.25rem;
}
.today_hd .hd_top > span {
  font-size: 0.2rem;
  line-height: 0.5rem;
}
.hd_bottom {
  margin-top: 15px;
  overflow: hidden;
}
.hd_bottom .xh {
  margin-right: 15px;
}

/* 桌号统计 */
.today_cell_hd {
  position: relative;
  margin-bottom: .3rem;
}
.today_cell_hd .right {
  position: absolute;
  font-size: 0.25rem;
  color: #999999;
  right: -0.4rem;
}
.today_cell:after {
  content: " ";
  display: inline-block;
  height: 10px;
  width: 10px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 0.2rem;
}
</style>

<style>
.today .weui-cells {
  background-color: inherit;
}
</style>


