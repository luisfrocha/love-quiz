import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vue-apexcharts";
import App from "./App.vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
