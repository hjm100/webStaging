<template>
  <div class="tips">
    <group gutter="0">
      <x-textarea class="tips_text" placeholder="请输入小于200个字汉字" v-model="value" :max="200" :height="198"></x-textarea>
    </group>
    <x-button type="primary" class="btn_sure" :disabled="btnUse" @click.native="nextPage">确定</x-button>
    <x-button class="btn_next" @click.native="jumpPage">跳过</x-button>
  </div>
</template>

<script>
import { XTextarea, Group, XButton } from "vux";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      value: "",
      canEdit: false
    };
  },
  components: {
    XTextarea,
    Group,
    XButton
  },
  computed: {
    btnUse() {
      return this.value ? false : true;
    }
  },
  created() {
    this.canEdit = location.href.split("?")[1] ? true : false;
    this.value = this.apiService.getSessionData("clubtips");
  },
  methods: {
    nextPage() {
      this.apiService.setSessionData("clubtips", this.value);
      if (this.canEdit) {
        if (sessionStorage.getItem("clubId")) {
          axios
            .post(
              "/index.php/Mobile/Clubnew/editclub",
              qs.stringify({
                clubId: sessionStorage.getItem("clubId"),
                describe: this.value
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
        this.$router.push("switch");
      }
    },
    jumpPage() {
      if (this.canEdit) {
        this.$router.go(-1);
      } else {
        this.$router.push("switch");
      }
    }
  }
};
</script>


<style scoped>
.tips {
  padding: 0.3rem;
}
.btn_sure {
  margin-top: 0.3rem;
}
.tips_text {
  font-size: 0.24rem;
}
</style>

