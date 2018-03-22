<template>
  <div class="share">
    <div class="share_box">
      <h1 class="share_title">{{clubName + '(' + clubId+ ')'}}</h1>
      <p class="share_desc">{{clubRule}}</p>
      <div class="qrcode_box" ref="qrcode_box">
        <img ref="qrcode_canvas" alt="二维码图片">
        <img ref="qrcode_title" alt="二维码描述文字">
        <canvas height="300" class="canvas" ref="canvas"></canvas>
      </div>
      <span class="qrcode_desc" ref="qrcode_desc">{{clubName + '(' + clubId+ ')'}}</span>
      <p class="share_tips">请长按二维码，选择“发送给朋友”，分享到您的微信群。玩家在微信中识别二维码后可打开游戏客户端搜索到您的俱乐部并添加。</p>
    </div>
  </div>
</template>

<script>
const html2canvas = require("html2canvas");
const QRCode = require("qrcode");
export default {
  data() {
    return {
      clubName: this.$route.params.clubData.clubName,
      clubId: this.$route.params.clubData.clubId,
      clubRule: this.$route.params.clubData.ruler.split("invitedesc=")[1]
    };
  },
  created() {
    console.log(this.$route.params);
  },
  mounted() {
    this.$nextTick(() => {
      QRCode.toDataURL(
        "https://hbjxqp.happypoker.cn/openapp.html?clubId=" +
          this.clubId +
          "&actId=1111111&action=search_club",
        { errorCorrectionLevel: "H" },
        (err, url) => {
          this.$refs.qrcode_canvas.src = url;
          //画二维码里的说明性文字
          html2canvas(this.$refs.qrcode_desc, {
            scale: 1
          }).then(canvas => {
            this.$refs.qrcode_desc.style.display = "none";
            this.$refs.qrcode_title.src = canvas.toDataURL("image/png");
            // 在canvas里进行拼接
            let canvas1 = this.$refs.canvas;
            let ctx = canvas1.getContext("2d");
            ctx.rect(0, 0, 300, 300);
            ctx.fillStyle = "#fff";
            ctx.fill();
            setTimeout(() => {
              ctx.drawImage(this.$refs.qrcode_canvas, 0, 0, 300, 300);
              ctx.drawImage(this.$refs.qrcode_title, 90, 135, 120, 30);
              this.$refs.canvas.style.display = "none";
              this.$refs.qrcode_canvas.src = canvas1.toDataURL();
              this.$refs.qrcode_canvas.style.display = "inline-block";
            }, 1000);
          });
        }
      );
    });
  }
};
</script>

<style scoped>
.share {
  background-color: #439057;
  height: 100%;
  padding: 0.9rem 0.16rem 0 0.16rem;
  text-align: center;
}
.share_box {
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
}
.share_title {
  font-size: 0.36rem;
  font-weight: bold;
  padding: 0.25rem;
}
.share_desc {
  padding: 0.25rem;
}
.qrcode_box {
  border-bottom: 0.01rem solid #f5f5f5;
  height: 5.5rem;
  /* padding-top: 0.6rem; */
}
.qrcode_box img {
  display: none;
}
.share_tips {
  padding: 0.3rem 0;
  text-align: left;
}
.qrcode_desc {
  color: #f40;
}
</style>

