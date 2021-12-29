import Vue from "vue";
import App from "./App.vue";

import eui from "../packages/index";

console.log(eui);
Vue.use(eui);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
