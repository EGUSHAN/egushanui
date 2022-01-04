<template>
  <div id="app">
    <div class="demo-button">
      <eg-button>默认按钮</eg-button>
      <eg-button type="primary">主要按钮</eg-button>
      <eg-button type="success">成功按钮</eg-button>
      <eg-button type="info">信息按钮</eg-button>
      <eg-button type="warning">警告按钮</eg-button>
      <eg-button type="danger">危险按钮</eg-button>
    </div>
    <div class="demo-button">
      <eg-button disabled>默认按钮</eg-button>
      <eg-button type="primary" disabled>主要按钮</eg-button>
      <eg-button type="success" disabled>成功按钮</eg-button>
      <eg-button type="info" disabled>信息按钮</eg-button>
      <eg-button type="warning" disabled>警告按钮</eg-button>
      <eg-button type="danger" disabled>危险按钮</eg-button>
    </div>
    <div class="demo-button">
      <eg-button plain>朴素按钮</eg-button>
      <eg-button type="primary" plain>主要按钮</eg-button>
      <eg-button type="success" plain>成功按钮</eg-button>
      <eg-button type="info" plain>信息按钮</eg-button>
      <eg-button type="warning" plain>警告按钮</eg-button>
      <eg-button type="danger" plain>危险按钮</eg-button>
    </div>
    <div class="demo-button">
      <eg-button round>默认按钮</eg-button>
      <eg-button type="primary" round>主要按钮</eg-button>
      <eg-button type="success" round>成功按钮</eg-button>
      <eg-button type="info" round>信息按钮</eg-button>
      <eg-button type="warning" round>警告按钮</eg-button>
      <eg-button type="danger" round>危险按钮</eg-button>
    </div>
    <div class="demo-button">
      <eg-button circle>默</eg-button>
      <eg-button type="primary" circle>主</eg-button>
      <eg-button type="success" circle>成</eg-button>
      <eg-button type="info" circle>信</eg-button>
      <eg-button type="warning" circle>警</eg-button>
      <eg-button type="danger" circle>危</eg-button>
    </div>

    <span style="display: inline-block; width: 200px; height: 200px" id="span">预览</span>
    <img id="imgs" src="./assets/logo.png" alt="" width="300" height="400" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
// import eButton from '../packages/Button'
export default {
  name: "App",
  components: {
    HelloWorld,
    // eButton: eButton
  },
  mounted() {
    var img = document.getElementById("imgs");
    var span = document.getElementById("span");
    img.onload = () => {
      const rgb = this.getImageColor(img, "array");
      const hsl = this.rgbtohsl(rgb);
      span.style.background = hsl;
    };
  },
  methods: {
    getImageColor(img, type = "array") {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext("2d");
      img.crossOrigin = "Anonymous";
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 获取像素数据
      var data = context.getImageData(0, 0, img.width, img.height).data;
      let r = 1,
        g = 1,
        b = 1;
      // 取所有像素的平均值
      for (var row = 0; row < img.height; row++) {
        for (var col = 0; col < img.width; col++) {
          // console.log(data[((img.width * row) + col) * 4])
          if (row == 0) {
            r += data[img.width * row + col];
            g += data[img.width * row + col + 1];
            b += data[img.width * row + col + 2];
          } else {
            r += data[(img.width * row + col) * 4];
            g += data[(img.width * row + col) * 4 + 1];
            b += data[(img.width * row + col) * 4 + 2];
          }
        }
      }
      // 求取平均值
      r /= img.width * img.height;
      g /= img.width * img.height;
      b /= img.width * img.height;
      // 将最终的值取整
      r = Math.round(r);
      g = Math.round(g);
      b = Math.round(b);
      if (type == "string") {
        return `rgb(${r}, ${g}, ${b})`;
      }
      return [r, g, b];
    },
    rgbtohsl(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;

      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var l = (min + max) / 2;
      var difference = max - min;
      var h, s, l;
      if (max == min) {
        h = 0;
        s = 0;
      } else {
        s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min);
        switch (max) {
          case r:
            h = (g - b) / difference + (g < b ? 6 : 0);
            break;
          case g:
            h = 2.0 + (b - r) / difference;
            break;
          case b:
            h = 4.0 + (r - g) / difference;
            break;
        }
        h = Math.round(h * 60);
      }
      s = Math.round(s * 100 * 1.5) + "%"; //转换成百分比的形式
      l = Math.round(l * 100 * 0.8) + "%";
      const str = "hsl(" + h + "," + s + "," + l + ")";
      return str;
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.demo-button {
  margin-bottom: 20px;
  ::v-deep .eg-button {
    margin-left: 20px;
  }
}
</style>
