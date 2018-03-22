<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <router-view class="router-view"></router-view>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem } from "vux";
export default {
  data() {
    return {
      msg: "我要修改状态"
    };
  },
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem
  },
  created() {}
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
</style>
