<template>
  <div id="club">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0">
    <!-- 头部 -->
    <div class="header flex">
      <img class="header_hd logo" src="@/images/logo.png" style="height: 30px;">
      <p class="header_bd">河北家乡棋牌</p>
      <a href="/index.php/Mobile/index.html">
        <img class="header_hd" src="@/images/shouye_icon.png" style="height: 30px;">
      </a>
    </div>
    <router-view class="router-view"></router-view>
    </view-box>
  </div>
</template>

<script>
import { ViewBox } from "vux";
export default {
  components: {
    ViewBox
  }
};
</script>


<style scoped>
#club {
  height: 100%;
}
.header {
  width: 100%;
  position: fixed;
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
</style>


