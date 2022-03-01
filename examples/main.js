import Vue from "vue";
import App from "./App.vue";

import EgushanUI from "../index";

Vue.use(EgushanUI);

Vue.config.productionTip = false;
import EasyCamera from "easy-vue-camera";

Vue.use(EasyCamera);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
