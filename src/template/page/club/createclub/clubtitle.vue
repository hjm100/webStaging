<template>
  <div class="title">
    <group gutter="0">
      <x-textarea class="title_text" placeholder="请输入小于16个字汉字" v-model="value" :max="16"></x-textarea>
    </group>
    <x-button type="primary" class="btn_sure" :disabled="btnUse" @click.native="nextPage">确定</x-button>
  </div>
</template>

<script>
import { XTextarea, Group, XButton } from "vux";
import qs from "qs";
import axios from "axios";
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
  created() {
    this.canEdit = location.href.split("?")[1] ? true : false;
    // if (this.canEdit) {
    this.value = sessionStorage.getItem("clubname");
    // }
  },
  computed: {
    btnUse() {
      // 计算属性，检查按钮是否可点击
      return this.value ? false : true;
    }
  },
  methods: {
    nextPage() {
      sessionStorage.setItem("clubname", this.value);
      if (this.canEdit) {
        //更新俱乐部
        if (sessionStorage.getItem("clubId")) {
          axios
            .post(
              "/index.php/Mobile/Clubnew/editclub",
              qs.stringify({
                clubId: sessionStorage.getItem("clubId"),
                clubName: this.value
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
        // 当可以点击确定按钮的时候在本地存下俱乐部名称
        this.$router.push("tips");
      }
    }
  }
};
</script>

<style scoped>
.title {
  padding: 0.3rem;
}
.btn_sure {
  background-color: #00ac34;
  border-radius: 0.1rem;
  height: 0.9rem;
  margin-top: 0.2rem;
  width: 6.67rem;
}
.title_text {
  font-size: .24rem;
}
</style>

