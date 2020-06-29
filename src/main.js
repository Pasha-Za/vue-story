import Vue from "vue";
import { KeySiteCore } from '@/scripts/helpers/sitecore';
import MqHandler from '@/scripts/helpers/mqHandler';

// adding components to the project
import LoadScript from '@/scripts/components/loadscript/loadscript.vue';
import ResponsiveImage from '@/scripts/components/ResponsiveImage/responsive-image';

//examples
import Logger from '@/scripts/components/Logger/Logger';
import HellowWorld from '@/scripts/components/HelloWorld.vue';

//adding directives
import { srcset } from '@/scripts/directives/srcset/srcset';

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
Vue.component(ResponsiveImage.name, ResponsiveImage);
Vue.component(HellowWorld.name, HellowWorld);
Vue.component(Logger.name, Logger);

// adding directives to the VUE
Vue.directive(srcset.name, srcset);

new Vue({}).$mount("#main-container");
