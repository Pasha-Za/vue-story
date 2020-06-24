import '!style-loader!css-loader!sass-loader!../src/styles/main.scss';

import { configure } from '@storybook/vue';

import Vue from 'vue';

// Import your global components.
import Logger from '../src/scripts/components/Logger/Logger';

// Register global components.
Vue.component(Logger.name, Logger);

configure(require.context('../src', true, /\.stories\.js$/), module);