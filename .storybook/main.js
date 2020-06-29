const path = require('path');

module.exports = {
    stories: ['../src/markup/**/*.stories.[tj]s'],
     webpackFinal: async (config, {
         configType
     }) => {
         // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
         // You can change the configuration based on that.
         // 'PRODUCTION' is used when building the static version of storybook.

         // Make whatever fine-grained changes you need
         config.module.rules.push({
             test: /\.scss$/,
             use: ['style-loader', 'css-loader', 'sass-loader'],
             include: path.resolve(__dirname, '../'),
         });
         config.module.rules.push({
             test: /\.html$/,
             exclude: /node_modules/,
             use: {
                 loader: 'html-loader'
             }
         });
         config.module.rules.push({
            test: /\.svg$/,
            use: [
                'babel-loader',
                'vue-svg-loader',
            ],
        });
         config.resolve.alias = {
             // enable absolute path while running storybook
             "@": path.resolve(__dirname, "../src"),
             // usage runtimecompiler for vue templates
             'vue$': 'vue/dist/vue.esm.js',
         };

         config.module.rules = config.module.rules.map(rule => {
             if (rule.test.toString().includes('svg')) {
                 const test = rule.test.toString().replace('svg|', '').replace(/\//g, '')
                 return { ...rule, test: new RegExp(test) }
             } else {
                 return rule
             }
         });

         // Return the altered config
         return config;
     }
};