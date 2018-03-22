<template>
  <div class="preview" ref="preview">
    <group>
      <cell title="俱乐部名称" :value="clubName" link="title?mode=edit">
        <img slot="icon" src="../../../images/icon_S01.png" alt="图片">
      </cell>
    </group>
    <group>
      <cell title="游戏名称" :value="gameName" :link="canedit? 'gametypes?mode=edit' : ''">
        <img slot="icon" src="../../../images/icon_S03.png" alt="图片">
      </cell>
      <cell title="收费模式" :value="costMode">
        <img slot="icon" src="../../../images/icon_S04.png" alt="图片">
      </cell>
      <cell title="俱乐部会员保护" :value="clubAuthor" :link="'switch?clubId=' + clubId">
        <img slot="icon" src="../../../images/icon_S05.png" alt="图片">
      </cell>
    </group>
    <group>
      <cell title="已选规则" is-link @click.native="jump()">
        <img slot="icon" src="../../../images/icon_S06.png" alt="图片">
      </cell>
      <p class="preview_rule">{{selectRules}}</p>
    </group>
    <group>
      <cell title="俱乐部公告" link="tips?mode=edit">
        <img slot="icon" src="../../../images/icon_S07.png" alt="图片">
      </cell>
      <p class="preview_rule">{{clubTips}}</p>
    </group>
    <x-button v-if="canedit" class="finishBtn" type="primary" @click.native="finish">完成</x-button>
    <div class="preview_oepn" v-if="!canedit">
      <button @click="showList">{{clubStatusName}}</button>
      <div class="preview_open_list" v-if="showOpenList" @click="statusSelect">
        <p>开启</p>
        <p>暂停</p>
        <p>删除</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, Group, XButton } from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      clubName: "",
      gameName: "",
      costMode: "",
      clubAuthor: "",
      selectRules: "",
      clubTips: "",
      canedit: true,
      showOpenList: false,
      clubStatus: 1,
      clubStatusName: "",
      clubId: ""
    };
  },
  components: {
    Cell,
    Group,
    XButton
  },
  created() {
    /**
     * 分两种情况
     * 1. 创建俱乐部时候的预览
     * 2. 俱乐部创建完成时的编辑,当是编辑的功能时，存在一个开关俱乐部的按钮
     * 通过url上有无mode属性来判断，当mode属性为edit时表示时编辑。需要将编辑的功能传递到下一层页面。
     */
    //判断是否时编辑
    let mode = location.href.split("?")[1];
    if (mode) {
      this.canedit = false;
      this.clubId = sessionStorage.getItem("clubId");
    }
    //获取缓存中存的数据,存数据是在每次创建的那里，当点击完成之后需要清除掉所有的数据。
    this.clubName = sessionStorage.getItem("clubname");
    this.gameName = sessionStorage.getItem("gamename");
    if (JSON.parse(sessionStorage.getItem("white")).length > 0) {
      sessionStorage.setItem("clubauthor", "已启用白名单");
    }
    this.clubAuthor = sessionStorage.getItem("clubauthor");
    this.currentRules = JSON.parse(sessionStorage.getItem("currentrules"));
    this.clubTips = sessionStorage.getItem("clubtips");
    this.clubStatus = sessionStorage.getItem("status");
    if (this.clubStatus == 1) {
      this.clubStatusName = "开启";
    } else if (this.clubStatus == 2) {
      this.clubStatusName = "暂停";
    }
    //获取单独的网页的数据存储
    let showRules = JSON.parse(sessionStorage.getItem("showrules"));
    //收费模式
    this.costMode = showRules.showmode;
    //已选规则
    this.selectRules = showRules.showSelectRules;
  },
  mounted() {
    if (!this.canedit) {
      this.$refs.preview.classList.add("preview_edit");
      window.document.title = "俱乐部编辑";
    }
  },
  methods: {
    jump() {
      location.href = "./gamerule.html?mode=edit";
    },
    finish() {
      /**
       * 本页面包含创建俱乐部和编辑俱乐部两部分的内容
       * 1. 可编辑的状态，那么就是编辑
       * 2. 不可编辑的状态，那么就不会编辑
       * 两次所传的数据是一样的
       */

      let whiteListIds = [];
      if (sessionStorage.getItem("white")) {
        let whiteList = JSON.parse(sessionStorage.getItem("white"));
        whiteList.map(item => {
          whiteListIds.push(item.id);
        });
      }
      let blackListIds = [];
      if (sessionStorage.getItem("black")) {
        let blackList = JSON.parse(sessionStorage.getItem("black"));
        blackList.map(item => {
          blackListIds.push(item.id);
        });
      }
      let clubAuthorAllow = sessionStorage.getItem("clubauthorstatus");
      if (whiteListIds.length > 0) {
        clubAuthorAllow = "1";
      }
      let reqdata = {
        activityId: sessionStorage.getItem("gameId"),
        clubName: this.clubName,
        cost: this.currentRules.cost,
        costType: this.currentRules.costType,
        describe: this.clubTips,
        minPlayer: this.currentRules.minPlayer,
        notAllowSameIP: this.currentRules.notAllowSameIp,
        allowSameLocation: this.currentRules.allowSameLocation,
        whiteListType: clubAuthorAllow,
        round: this.currentRules.round,
        ruler: this.currentRules.ruler,
        userset: this.currentRules.userset,
        waitTime: this.currentRules.waitTime,
        listInfo: {
          white: whiteListIds,
          black: blackListIds
        }
      };
      if (this.currentRules.playerCount) {
        reqdata.playerCount = this.currentRules.playerCount;
      }
      axios
        .post("/index.php/Mobile/Clubnew/createclub", qs.stringify(reqdata))
        .then(res => {
          let data = res.data;
          if (data.code == 1 && data.data == 0) {
            this.$router.push("../../club");
            // 去除掉本地的缓存
            sessionStorage.removeItem("white");
            sessionStorage.removeItem("black");
            sessionStorage.removeItem("clubtips");
            sessionStorage.removeItem("clubname");
          } else if (data.data == 8) {
            this.$vux.toast.text("您的俱乐部数量已达到上限");
          }
        });
      // }
    },
    showList() {
      this.showOpenList = !this.showOpenList;
    },
    statusSelect(aim) {
      let setting = clubStatus => {
        axios
          .post(
            "/index.php/Mobile/Clubnew/editclub",
            qs.stringify({
              clubId: sessionStorage.getItem("clubId"),
              status: clubStatus
            })
          )
          .then(res => {
            let data = res.data;
            if (data.code == 1 && data.data == 0) {
              if (clubStatus == 3) {
                this.$router.go(-1);
              }
            }
          });
        this.showOpenList = false;
        this.clubStatusName = targetAim.innerHTML;
      };
      let targetAim = aim.target;
      if (targetAim.innerHTML === "开启") {
        this.clubStatus = 1;
        setting(1);
      } else if (targetAim.innerHTML === "暂停") {
        this.clubStatus = 2;
        setting(2);
      } else {
        this.$vux.confirm.show({
          content: "确定要删除俱乐部么?",
          onConfirm() {
            this.clubStatus = 3;
            setting(3);
          },
          onCancel() {}
        });
      }
    }
  }
};
</script>

<style>
.preview::before {
  content: "";
  display: table;
}
.preview_edit {
  padding-top: 0.3rem;
}
.preview {
  position: relative;
}
.preview .vux-label {
  font-size: 0.3rem;
}
.weui-cell__ft {
  font-size: 0.3rem;
}
.preview_oepn {
  position: absolute;
  right: 0.3rem;
  top: 0.1rem;
}
.preview_oepn button {
  background-color: #2abd6a;
  border-radius: 0.05rem;
  color: #fff;
  height: 0.41rem;
  width: 1.25rem;
  font-size: 0.3rem;
}
.preview_open_list {
  background-color: rgb(200, 200, 200);
}
.preview_open_list p {
  border-bottom: 0.01rem solid rgb(100, 100, 100);
  padding: 0.05rem 0;
  text-align: center;
}
img {
  transform: translateY(9%);
  width: 0.58rem;
}
.preview_rule {
  font-size: 0.3rem;
  padding: 0 0.5rem 0.2rem 1.2rem;
  word-break: break-all;
}
.finishBtn {
  margin-top: 0.4rem;
}
</style>

