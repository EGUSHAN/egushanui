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
