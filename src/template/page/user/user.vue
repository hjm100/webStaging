<template>
    <div class="box">
        <tabbar>
            <tabbar-item>
                <span slot="label">Wechat</span>
            </tabbar-item>
            <tabbar-item show-dot>
                <span slot="label">Message</span>
            </tabbar-item>
            <tabbar-item selected link="/component/demo">
                <span slot="label">Explore</span>
            </tabbar-item>
            <tabbar-item badge="2">
                <span slot="label">News</span>
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


