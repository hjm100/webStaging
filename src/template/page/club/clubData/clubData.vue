<template>
  <div style="height:100%">
    <view-box ref="viewBox">
        <router-view class="router-view"></router-view>
      </view-box>
        <div class="tabbar">
          <router-link class="tab_box tabLeft" :to="'/club/clubData/todayData?clubId='+clubId+'&date='+nowdate" replace>
            <div class="weui-tabbar__icon">
              <!-- <img class="imgLeft" src="@/images/tongji1_moren.png" alt=""> -->
            </div>
            <p class="weui-tabbar__label">
              <span>今日统计</span>
            </p>
          </router-link>
          <router-link class="tab_box tabRight" :to="'/club/clubData/allData?clubId='+clubId" replace>
            <div class="weui-tabbar__icon">
              <!-- <img class="imgRight" src="@/images/tongji2_moren.png" alt=""> -->
            </div>
            <p class="weui-tabbar__label">
              <span>累计统计</span>
            </p>
          </router-link>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import { add0 } from "../../../scripts/utils";
import { ViewBox, XHeader} from "vux";
export default {
  data() {
    return {
      clubId: null, //俱乐部id
      nowdate: "" //当前年月
    };
  },
  components: {
    ViewBox,
    XHeader
  },
  created() {
    //获取当前时间
    let date = new Date();
    this.nowYear = date.getFullYear();
    this.nowMonth = add0(date.getMonth() + 1);
    this.nowDate = add0(date.getDate());
    this.nowdate = this.nowYear + "-" + this.nowMonth + "-" + this.nowDate;
    //初始化数据
    if (this.$route.query.clubId) {
      this.clubId = this.$route.query.clubId;
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  height: 44px;
  padding: 0 15px;
  background: #fff;
}
.router-view {
  width: 100%;
  top: 46px;
}
.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
}
.logo {
  border-radius: 50%;
  margin-right: 5px;
}
.page__title {
  font-size: 20px;
  font-weight: 400;
}
.header_bd {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.header_ft {
  color: #999999;
}

.tabbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  z-index: 500;
  bottom: 0;
  width: 100%;
  background-color: #f7f7fa;
}
.tabbar:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #c0bfc4;
  color: #c0bfc4;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.tab_box {
  display: block;
  width: 50%;
}
/*重写底部导航*/
.tabLeft .weui-tabbar__label,
.tabRight .weui-tabbar__label {
  padding: 0 0.2rem 0 0.1rem;
  position: relative;
  display: inline-block;
  font-size: 0.3rem;
}
a.tabLeft .weui-tabbar__icon,
a.tabRight .weui-tabbar__icon {
  height: 0.4rem;
  width: 0.4rem;
}
a.tabLeft {
  justify-content: flex-end;
}
a.tabRight {
  justify-content: flex-start;
}
a.tabLeft,
a.tabRight {
  height: 55px;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
}

/* .imgLeft,
.imgRight {
  display: none;
} */

.tabLeft .weui-tabbar__label:after {
  content: "|";
  position: absolute;
  right: -0.1rem;
  top: 0;
  color: #999;
}
.tabRight .weui-tabbar__icon {
  background: url("../../../images/tongji2_moren.png") center center no-repeat;
  background-size: 100% 100%;
}

.tabLeft .weui-tabbar__icon {
  background: url("../../../images/tongji1_moren.png") center center no-repeat;
  background-size: 100% 100%;
}
.router-link-exact-active .weui-tabbar__label {
  color: #09bb07;
}
.router-link-exact-active.tabRight .weui-tabbar__icon {
  background: url("../../../images/tongji2_xuanzhong.png") center center
    no-repeat;
  background-size: 100% 100%;
}
.router-link-exact-active.tabLeft .weui-tabbar__icon {
  background: url("../../../images/tongji1_xuanzhong.png") center center
    no-repeat;
  background-size: 100% 100%;
}
</style>



