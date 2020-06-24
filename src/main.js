import Vue from "vue";
import { KeySiteCore } from '@/scripts/helpers/sitecore';
import MqHandler from '@/scripts/helpers/mqHandler';
// adding components to the project
import Logger from '@/scripts/components/Logger/Logger';
// code-splitting
const HellowWorld = () => import(/* webpackChunkName: "hello" */ '@/scripts/components/HelloWorld');

// adding project styles
import "./styles/main.scss";

// Configure MqHandler
MqHandler.getMqHandler({
    small: 768,
    medium: 1440
});

Vue.config.productionTip = false;
Vue.use(KeySiteCore);

// adding components to the VUE
Vue.component(HellowWorld.name, HellowWorld);
Vue.component(Logger.name, Logger);

new Vue({}).$mount("#main-container");
