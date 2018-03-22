<template>
  <div class="box">
    <tabbar>
      <tabbar-item>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/club/clubUser/whitelist">
        <span slot="label">俱乐部</span>
      </tabbar-item>
      <tabbar-item selected link="/demo">
        <span slot="label">代理数据</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/club/clubData/allData">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>


