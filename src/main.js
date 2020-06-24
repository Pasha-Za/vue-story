import Vue from "vue";
import { KeySiteCore } from '@/scripts/helpers/sitecore';
import MqHandler from '@/scripts/helpers/mqHandler';

// adding components to the project
import LoadScript from '@/scripts/components/loadscript/loadscript.vue';

//examples
import Logger from '@/scripts/components/Logger/Logger';
import HellowWorld from '@/scripts/components/HelloWorld.vue';

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
Vue.component(LoadScript.name, LoadScript);
Vue.component(HellowWorld.name, HellowWorld);
Vue.component(Logger.name, Logger);

new Vue({}).$mount("#main-container");
