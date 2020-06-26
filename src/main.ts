import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

declare module "vue/types/vue" {
  interface Vue {
    $eventHub: Vue;
  }
}
Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
