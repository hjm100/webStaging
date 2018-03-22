<template>
  <div class="types">
    <group>
      <cell class="types_cell" is-link @click.native="nextList(key)" v-for="(value,key) in types" :title="value">
        <img class="types_icon" slot="icon" :src="theIcon(key)" alt="分类图标">
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
import axios from "axios";
export default {
  data() {
    return {
      types: [],
      mahjong: require("../../../images/mahjong.png"),
      poker: require("../../../images/icon_big02.png"),
      paohuzi: require("../../../images/icon_big03.png"),
      xiuxian: require("../../../images/icon_big04.png")
    };
  },
  components: {
    Group,
    Cell
  },
  created() {
    axios.post("/index.php/Mobile/Clubnew/gametypedesc").then(res => {
      let data = res.data;
      if (data.code === 1) {
        this.types = data.data;
      }
    });
  },
  methods: {
    theIcon(key) {
      if (key === "mahjong") {
        return this.mahjong;
      } else if (key === "poker") {
        return this.poker;
      }
    },
    nextList(key) {
      if (location.href.split("?")[1]) {
        this.$router.push({
          path: "gamelist",
          query: { type: key, mode: "edit" }
        });
      } else {
        this.$router.push({ path: "gamelist", query: { type: key } });
      }
    }
  }
};
</script>

<style scoped>
.types::before {
  content: "";
  display: table;
}
.types_icon {
  margin-right: 0.2rem;
  width: 0.66rem;
  vertical-align: middle;
}
.types_cell .vux-label {
  font-size: 0.3rem;
}
</style>
