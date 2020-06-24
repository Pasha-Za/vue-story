import Vue from "vue";
// adding components to the project
import Logger from '@/scripts/components/Logger/Logger';
// code-splitting
const HellowWorld = () => import(/* webpackChunkName: "hello" */ '@/scripts/components/HelloWorld');

// adding project styles
import "./styles/main.scss";

Vue.config.productionTip = false;

// adding components to the VUE
Vue.component(HellowWorld.name, HellowWorld);
Vue.component(Logger.name, Logger);

new Vue({}).$mount("#main-container");
