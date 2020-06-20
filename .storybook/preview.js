import '!style-loader!css-loader!sass-loader!../src/main.scss';

import { configure } from '@storybook/vue';

import Vue from 'vue';

// Import Vue plugins
import Vuex from 'vuex';

// Import your global components.
import Logger from '../src/components/Logger/Logger';

// Install Vue plugins.
Vue.use(Vuex);

// Register global components.
Vue.component(Logger.name, Logger);

configure(require.context('../src', true, /\.stories\.js$/), module);