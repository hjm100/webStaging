<template>
  <div class="list">
    <group>
      <cell-box class="list_cell" is-link v-for="game in games" @click.native="jump(game.id, game.title)">{{game.title}}</cell-box>
    </group>
  </div>
</template>

<script>
import axios from "axios";
import { Group, CellBox } from "vux";
import qs from "qs";

export default {
  data() {
    return {
      games: [],
      canEdit: false
    };
  },
  components: {
    Group,
    CellBox
  },
  created() {
    if (this.$route.query.mode == "edit") {
      this.canEdit = true;
    }
    let gameType = this.$route.query.type;
    axios
      .post(
        "/index.php/Mobile/Clubnew/gametypelist",
        qs.stringify({
          type: gameType
        })
      )
      .then(res => {
        let data = res.data;
        if (data.code === 1) {
          console.log(data.data);
          this.games = data.data;
        }
      });
  },
  methods: {
    jump(id, title) {
      // :link="{path: 'gameRule', query: {id: game.id}}"
      // location.href = "index.html#/club/create/gameRule?id=" + id;
      if (this.canEdit) {
        return (location.href =
          "./gamerule.html?mode=edit&" +
          "gamename=" +
          title +
          "&gameId=" +
          id +
          "&create=yes");
      }
      location.href =
        "./gamerule.html?" + "gamename=" + title + "&gameId=" + id;
    }
  }
};
</script>

<style scoped>
.list::before {
  content: "";
  display: table;
}
.list .weui-cell {
  font-size: 0.3rem;
}
</style>


