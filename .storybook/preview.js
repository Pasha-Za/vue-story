import '!style-loader!css-loader!sass-loader!../src/styles/main.scss';

import { configure } from '@storybook/vue';

import Vue from 'vue';
import MqHandler from '../src/scripts/helpers/mqHandler';
// Configure MqHandler
MqHandler.getMqHandler({
    small: 768,
    medium: 1440
});

// Import your global components.
import LoadScript from '../src/scripts/components/loadscript/loadscript.vue';
import ResponsiveImage from '@/scripts/components/ResponsiveImage/responsive-image';

import Logger from '../src/scripts/components/Logger/Logger';
import HellowWorld from '@/scripts/components/HelloWorld.vue';

import { srcset } from '@/scripts/directives/srcset/srcset';

// Register global components.
Vue.component(LoadScript.name, LoadScript);
Vue.component(ResponsiveImage.name, ResponsiveImage);

Vue.component(Logger.name, Logger);
Vue.component(HellowWorld.name, HellowWorld);

Vue.directive(srcset.name, srcset);

configure(require.context('../src', true, /\.stories\.js$/), module);