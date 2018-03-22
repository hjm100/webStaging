<template>
  <div class="club">
    <group class="showtips" v-if="showtips">
      <cell class="player_join" title="有玩家申请加入白名单" link="clubUser/joinClub">
        <img slot="icon" src="../../images/icon_S07.png" alt="数据统计">
        <span slot="default">去处理</span>
      </cell>
    </group>
    <p class="no_tips" v-if="ifTips">很抱歉，您还没有自己的专属俱乐部，请点击下方创建按钮来创建自己的专属俱乐部哦!</p>
    <group v-for="item in clubList">
      <cell class="club_title">
        <div class="club_name" slot="title">
          <span>{{item.clubName + ' (' + item.clubId +')'}}</span>
          <span class="club_status">{{item.status === 1 ? '开启中' : '暂停中'}}</span>
        </div>
        <router-link class="right_tips" slot="default" :to="{name: 'clubShare',params: {clubData: item}}">
          <img src="../../images/icon_S10.png" alt="二维码图片">
          <span>分享</span>
        </router-link>
      </cell>
      <cell class="club_setting" title="数据统计" :link="'clubData/todayData?clubId='+item.clubId+'&date='+nowdate">
        <img slot="icon" src="../../images/icon_S08.png" alt="数据统计">
      </cell>
      <cell class="club_setting" title="俱乐部设置" is-link @click.native="nextToPage(item)">
        <img slot="icon" src="../../images/icon_S09.png" alt="俱乐部设置"></cell>
    </group>
    <div class="footer">
      <x-button type="primary" class="club_create_btn" @click.native="nextToCreate">
        <img src="../../images/icon_jiaru.png" alt="创建按钮"> 创建
      </x-button>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XButton } from "vux";
import { add0 } from "../../scripts/utils";
import axios from "axios";
export default {
  data() {
    return {
      showtips: false,
      clubList: [],
      ifTips: false,
      nowdate: "" //当前年月
    };
  },
  components: {
    Group,
    Cell,
    XButton
  },
  created() {
    //获取当前时间
    let date = new Date();
    let nowYear = date.getFullYear();
    let nowMonth = add0(date.getMonth() + 1);
    let nowDate = add0(date.getDate());
    this.nowdate = nowYear + "-" + nowMonth + "-" + nowDate;
    this.$vux.datetime.hide();
    //获取是否有玩家申请加入俱乐部
    this.apiService.recordsdata().then(res => {
      if (res.count > 0) {
        this.showtips = true;
      }
    });
    //获取俱乐部信息
    axios.post("/index.php/Mobile/Clubnew/clublist").then(res => {
      let data = res.data;
      if (data.code === 1) {
        if (data.data) {
          this.clubList = data.data;
        } else {
          this.ifTips = true;
        }
      }
    });
  },
  methods: {
    nextToPage(data) {
      /**
       *每次跳转到下一页时需要将本条目的信息存储到缓存中，以备编辑时使用
       */
      sessionStorage.setItem("clubname", data.clubName);
      sessionStorage.setItem("gamename", data.activityName);
      sessionStorage.setItem("clubtips", data.describe);
      sessionStorage.setItem("gameId", data.activityId);
      sessionStorage.setItem("clubId", data.clubId);
      sessionStorage.setItem("status", data.status);

      //存储是否启用白名单状态，并且根据状态判断应该展示的文字
      sessionStorage.setItem("clubauthorstatus", data.whiteListType);
      if (data.whiteListType == 1) {
        sessionStorage.setItem("clubauthor", "已启用白名单");
      } else {
        sessionStorage.setItem("clubauthor", "未启用白名单");
      }
      /**
       * 存储规则信息，存储的是单独页面的信息。
       */

      //创建一个游戏规则对象(上传接口所用)
      var currentrules = {};
      currentrules.cost = data.cost; //房卡消耗
      currentrules.costType = data.costType; //房卡消耗模式，1 是房主付费，2是玩家付费
      currentrules.minPlayer = data.minPlayer; //最小等待开始人数
      currentrules.notAllowSameIp = data.notAllowSameIP; //是否允许相同ip的人进入
      currentrules.round = data.round; // 选择的局数
      currentrules.ruler = data.ruler; //lua那边传过来的规则
      currentrules.waitTime = data.waitTime; //等待时间
      currentrules.userset = JSON.parse(data.userset);
      //将本页面的数据都存起来
      sessionStorage.setItem("currentrules", JSON.stringify(currentrules));

      /**
       * 创建一个用于展示的数据对象
       */

      let showrules = {};
      showrules.showmode = data.costType == "1" ? "房主付费" : "玩家AA收费";
      showrules.showSelectRules =
        data.round + "局," + data.ruler.split("invitedesc=")[1];
      sessionStorage.setItem("showrules", JSON.stringify(showrules));

      this.$router.push("create/preview?mode=edit");
    },
    nextToCreate() {
      // 只要点击创建就把存储的都清除掉
      sessionStorage.removeItem("white");
      sessionStorage.removeItem("black");
      sessionStorage.removeItem("clubname");
      sessionStorage.removeItem("clubtips");
      sessionStorage.removeItem("gamename");
      sessionStorage.removeItem("clubId");
      sessionStorage.removeItem("clubauthorstatus");
      if (this.clubList.length == 10) {
        return this.$vux.toast.text("您已超过能够创建俱乐部的上限（10个）");
      }
      this.$router.push("create");
    }
  }
};
</script>

<style>
.club {
  position: relative;
  padding-bottom: 60px;
  top: 0 !important;
}
.club .weui-cell {
  padding: 7px 15px;
}
.club .showtips .weui-cell {
  padding: 2px 15px;
}
.showtips .weui-cell {
  font-size: 0.3rem;
  line-height: 1;
}
.showtips img {
  width: 0.5rem;
}
.club::before {
  content: "";
  display: table;
}
.club_name {
  display: inline-block;
}
.footer {
  position: fixed;
  bottom: -0.3rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f5f5f5;
  padding: 0.1rem 0.5rem 0.5rem;
  width: 100%;
}
.club_create_btn img {
  vertical-align: middle;
  width: 0.6rem;
  padding-bottom: 4px;
}
.club_status {
  color: #cc422e;
}
.club_setting .vux-label {
  color: #555;
  font-size: 0.28rem;
}
.club_title .vux-label {
  font-size: 0.3rem;
}
.club_setting img {
  width: 0.58rem;
  vertical-align: middle;
  padding-right: 0.05rem;
}

.no_tips {
  font-size: 0.3rem;
  padding: 0.7rem 0.3rem 0 0.3rem;
  text-indent: 2em;
}

.right_tips span,
.right_tips img {
  display: block;
  color: #555;
  font-size: 0.2rem;
  margin: 0 auto;
}
.right_tips img {
  width: 0.3rem;
}
.player_join {
  background-color: #00fffe;
}
</style>
