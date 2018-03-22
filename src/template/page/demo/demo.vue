<template>
  <div class="hello">
    <search @on-submit="onSubmit" :auto-fixed="false" @on-focus="onFocus" @on-cancel="onCancel"></search>
    <button-tab>
      <button-tab-item>今天 </button-tab-item>
      <button-tab-item selected>本周 </button-tab-item>
      <button-tab-item>本月</button-tab-item>
    </button-tab>
    <h3>{{ msg }}{{ type }}</h3>
    <button @click="$store.commit('add')">点击修改等级</button>
    <swiper :list="baseList"></swiper>
    <group>
      <cell title="你好" is-link></cell>
      <cell title="我们好" value="hell" is-link></cell>
    </group>
    <!-- 日期函数 -->
    <group>
      <datetime
        v-model="value1"
        @on-change="change"
        title="时间"
        @on-cancel="log('cancel')"
        @on-confirm="log('confirm')"
        @on-hide="log('hide', $event)"></datetime>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" plain @click.native="showTime">点击显示时间</x-button>
    </div>
    <div @click="showTime">显示时间</div>
    <!-- 二维码 -->
    <qrcode value="https://hjm100.cn" type="img"></qrcode>
    <!-- 弹性布局 -->
    <div style="padding:0 15px;">
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="1" value="1">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="2" value="2">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="3" value="3">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="4" value="4">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="5" value="5">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="1" value="1">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="2" value="2">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="3" value="3">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="4" value="4">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="5" value="5">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="1" value="1">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="2" value="2">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="3" value="3">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="4" value="4">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="5" value="5">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="1" value="1">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="2" value="2">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="3" value="3">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div>
      </flexbox-item>
      <flexbox-item>
        <!-- <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="4" value="4">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div> -->
      </flexbox-item>
      <flexbox-item>
        <!-- <div class="flex-demo">
          <div class="imgbox">
            <img src="@/images/logo.png">
            <input type="checkbox" name="ids[]" id="5" value="5">
          </div>
          <p style="font-size:14px;">河北家...</p>
        </div> -->
      </flexbox-item>
    </flexbox>
    <button @click="submit">点击提交复选框</button>
    </div>
        <!-- 原生方法写:此处可采用原生写法 -->
    <div class="flex_box">
      <div class="flex-demo1">
        <div class="imgbox">
          <img src="@/images/logo.png">
          <input type="checkbox" name="ids[]" id="3" value="3">
        </div>
        <p style="font-size:14px;">河北家...</p>
      </div>
      <div class="flex-demo1">
        <div class="imgbox">
          <img src="@/images/logo.png">
          <input type="checkbox" name="ids[]" id="3" value="3">
        </div>
        <p style="font-size:14px;">河北家...</p>
      </div>
      <div class="flex-demo1">
        <div class="imgbox">
          <img src="@/images/logo.png">
          <input type="checkbox" name="ids[]" id="3" value="3">
        </div>
        <p style="font-size:14px;">河北家...</p>
      </div>
      <div class="flex-demo1">
        <div class="imgbox">
          <img src="@/images/logo.png">
          <input type="checkbox" name="ids[]" id="3" value="3">
        </div>
        <p style="font-size:14px;">河北家...</p>
      </div>
      <div class="flex-demo1">
        <div class="imgbox">
          <img src="@/images/logo.png">
          <input type="checkbox" name="ids[]" id="3" value="3">
        </div>
        <p style="font-size:14px;">河北家...</p>
      </div>
            <div class="flex-demo1">
        <div class="imgbox">
          <img src="@/images/logo.png">
          <input type="checkbox" name="ids[]" id="3" value="3">
        </div>
        <p style="font-size:14px;">河北家...</p>
      </div>
    </div>
    <!-- 弹框相关组件 -->
    <div @click="showPluginAuto">点击显示弹框</div>
    <!-- 确认取消弹框 -->
    <div @click="showPlugin2">点击显示操作框</div>
    <div @click="showPlugin3">点击显示操作框</div>
    <!-- loading -->
    <div @click="showLoading">显示loading</div>
    <!-- loading -->
    <div @click="onChange">显示提示</div>
    <!-- 表格 -->
    <x-table :cell-bordered="false" style="background-color:#fff;font-size:14px;">
        <thead>
          <tr style="background-color: #F7F7F7">
            <th>局数</th>
            <th>三字名</th>
            <th>三字名</th>
            <th>三字名</th>
            <th>三字名</th>
            <th>三字名</th>
            <th>三字名</th>
            <th>回放</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>8</td>
            <td>-10</td>
            <td>-10</td>
            <td>-10</td>
            <td>-10</td>
            <td>-10</td>
            <td>-10</td>
            <th>回放</th>
          </tr>
          <tr>
            <td>8</td>
            <td>-10</td>
            <td>-10</td>
            <td>-10</td>
            <td>-10</td>
            <td>-10</td>
            <td>-10</td>
            <th>回放</th>
          </tr>
        </tbody>
      </x-table>
  </div>
</template>
<script>
import {
  Group,
  Cell,
  CellBox,
  Swiper,
  ButtonTab,
  ButtonTabItem,
  Search,
  Datetime,
  XButton,
  Flexbox,
  FlexboxItem,
  Qrcode,
  Alert,
  Confirm,
  LoadingPlugin,
  Toast,
  XTextarea,
  XTable,
  Tabbar,
  TabbarItem
} from "vux";
export default {
  data() {
    return {
      msg: "我要修改状态",
      type: this.$store.state.level,
      value1: "2015-11-12",
      baseList: [
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/1.jpg",
          title: "送你一朵fua"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/2.jpg",
          title: "送你一辆车"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/3.jpg",
          title: "送你一次旅行",
          fallbackImg: "https://static.vux.li/demo/3.jpg"
        }
      ]
    };
  },
  components: {
    Swiper,
    ButtonTab,
    ButtonTabItem,
    Search,
    Group,
    Cell,
    CellBox,
    Datetime,
    XButton,
    Flexbox,
    FlexboxItem,
    Alert,
    Qrcode,
    Confirm,
    LoadingPlugin,
    Toast,
    XTextarea,
    XTable,
    Tabbar,
    TabbarItem
  },
  methods: {
    resultClick(item) {
      console.log("resultClick");
    },
    getResult(val) {
      console.log("getResult");
    },
    onSubmit(val) {
      console.log("on submit");
    },
    onCancel() {
      console.log("on cancel");
    },
    onFocus() {
      console.log("on focus");
    },
    log(str1, str2 = "") {
      console.log(str1, str2);
    },
    change(value) {
      console.log("change", value);
    },
    showTime() {
      this.$vux.datetime.show({
        cancelText: "取消",
        confirmText: "确定",
        format: "YYYY-MM-DD",
        value: "2017-05-20",
        onConfirm(val) {
          console.log("plugin confirm", val);
        },
        onShow() {
          console.log("plugin show");
        },
        onHide() {
          console.log("plugin hide");
        }
      });
    },
    showPlugin() {
      this.$vux.alert.show({
        title: "河北家乡棋牌",
        content: "内容部分",
        onShow() {
          console.log("Plugin: I'm showing");
        },
        onHide() {
          console.log("Plugin: I'm hiding now");
        }
      });
    },
    showPluginAuto() {
      this.showPlugin();
      setTimeout(() => {
        this.$vux.alert.hide();
      }, 3000);
    },
    showPlugin() {
      this.$vux.confirm.show({
        title: "Title",
        content: "Content",
        onShow() {
          console.log("plugin show");
        },
        onHide() {
          console.log("plugin hide");
        },
        onCancel() {
          console.log("plugin cancel");
        },
        onConfirm() {
          console.log("plugin confirm");
        }
      });
    },
    showPlugin2() {
      this.showPlugin();
    },
    showPlugin3() {
      const _this = this;
      this.$vux.confirm.prompt("请填写你的俱乐部名称", {
        title: "Title",
        onShow() {
          console.log("promt show");
          _this.$vux.confirm.setInputValue("你好");
        },
        onHide() {
          console.log("prompt hide");
        },
        onCancel() {
          console.log("prompt cancel");
        },
        onConfirm(msg) {
          console.log(msg);
        }
      });
    },
    showLoading() {
      this.$vux.loading.show({
        text: "加载中"
      });
      setTimeout(() => {
        this.$vux.loading.hide();
      }, 2000);
    },

    onChange(val) {
      const _this = this;
      if (val) {
        this.$vux.toast.show({
          type: "warn", //弹框类型
          text: "Hello World",
          onShow() {
            console.log("Plugin: I'm showing");
          },
          onHide() {
            console.log("Plugin: I'm hiding");
            _this.show9 = false;
          }
        });
      } else {
        this.$vux.toast.hide();
      }
    },
    submit() {
      //提交复选框中的数据
      let check_ele = document.querySelectorAll(".imgbox input[type=checkbox]");
      let check_val = [];
      for (let k in check_ele) {
        if (check_ele[k].checked) check_val.push(check_ele[k].value);
      }
      console.log(check_val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-demo {
  text-align: center;
  padding: 10px 0;
}
.imgbox {
  position: relative;
  display: inline-block;
}
.flex-demo img,
.flex-demo1 img {
  max-width: 48px;
}
.imgbox input {
  position: absolute;
  top: -6px;
  right: -8px;
}
/** 自写布局 */
.flex_box {
  padding: 1%;
  overflow: hidden;
  width: 100%;
}
.flex-demo1 {
  font-size: 0.3rem;
  width: 18%;
  float: left;
  margin: 1%;
  text-align: center;
}
</style>
