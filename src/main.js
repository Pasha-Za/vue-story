import Vue from "vue";
import HellowWorld from "./components/HelloWorld.vue";
import "./registerServiceWorker";
import store from "./store";
import './main.scss';

Vue.config.productionTip = false;
Vue.component(HellowWorld.name, HellowWorld);

new Vue({
  store
}).$mount("#main-container");
