<template>
  <div class="switch">
    <group class="switch_box">
      <checklist class="switch_list" required :options="checkOptions" @on-change="checkChange" v-model="checkValue"></checklist>
      <cell class="right_arrow" @click.native="nextToWhite" is-link></cell>
    </group>
    <div class="means">
      <div class="means_link">
        <router-link to="../clubUser/whiteDesc">什么是白名单?</router-link>
        <router-link to="../clubUser/blackDesc">什么是黑名单?</router-link>
      </div>
      <x-button class="means_black" type="primary" @click.native="nextBlack">黑名单</x-button>
    </div>
    <x-button class="switch_next" @click.native="nextPage">下一步</x-button>
  </div>
</template>
<script>
import { Group, Cell, XButton, Checklist } from "vux";
import axios from "axios";
import qs from "qs";
import { join } from "path";
import { clearTimeout } from "timers";
export default {
  data() {
    return {
      checkOptions: [
        { key: 1, value: "白名单", inlineDesc: "(是否开启白名单)" }
      ],
      isSelect: [],
      isEdit: false,
      checkValue: []
    };
  },
  components: {
    Group,
    Cell,
    XButton,
    Checklist
  },
  created() {
    if (location.href.split("?")[1]) {
      this.isEdit = true;
    }
    let key = sessionStorage.getItem("clubauthorstatus") ? 1 : "";
    key == 1 && this.checkValue.push(key);
  },
  methods: {
    checkChange(value, label) {
      console.log(value.length);
      value.length === 1 ? (this.isSelect = true) : (this.isSelect = false);
    },
    nextPage() {
      if (this.isSelect) {
        sessionStorage.setItem("clubauthor", "已启用白名单");
        sessionStorage.setItem("clubauthorstatus", "1");
      } else {
        sessionStorage.setItem("clubauthor", "未启用白名单");
        sessionStorage.setItem("clubauthorstatus", "0");
      }
      if (this.isEdit) {
        if (sessionStorage.getItem("clubId")) {
          axios
            .post(
              "/index.php/Mobile/Clubnew/editclub",
              qs.stringify({
                clubId: sessionStorage.getItem("clubId"),
                whiteListType: this.isSelect ? "1" : "0"
              })
            )
            .then(res => {
              let data = res.data;
              if (data.code == 1 && data.data == 0) {
                this.$router.go(-1);
              }
            });
        } else {
          this.$router.go(-1);
        }
      } else {
        this.$router.push("preview");
      }
    },
    nextBlack() {
      if (this.isEdit) {
        this.$router.push(
          "../clubUser/blacklist?clubId=" + sessionStorage.getItem("clubId")
        );
      } else {
        this.$router.push("../clubUser/blacklist");
      }
    },
    nextToWhite() {
      if (this.isEdit) {
        this.$router.push(
          "../clubUser/whitelist?clubId=" + sessionStorage.getItem("clubId")
        );
      } else {
        this.$router.push("../clubUser/whitelist");
      }
    }
  }
};
</script>

<style>
.switch::before {
  content: "";
  display: table;
}
.switch_box {
  position: relative;
}
.switch_box .right_arrow {
  position: absolute;
  top: 0;
  right: 0;
}
.switch_box .weui-cell:before {
  height: 0;
}
.switch_box .weui-cell {
  height: 100%;
  padding-left: 0.5rem;
}
.means {
  display: flex;
  padding: 0.5rem 0.3rem;
  justify-content: space-between;
  align-items: center;
}
.means_link a {
  color: #00ac34;
  display: block;
  font-size: 0.3rem;
}
.means .means_black {
  font-size: 0.3rem;
  width: 1.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  margin: 0;
}
.switch_next {
  margin-top: 1rem;
}
.switch_list p {
  font-size: 0.3rem;
}
.switch_list label span {
  font-size: 0.24rem;
}
</style>


