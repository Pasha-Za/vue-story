const config = require('./projectconfig');
const path = require('path');

// const vueSrc = './src';
const buildFolder = config.directories.themeBuildDirectory + config.currentWebsite;
/**
 *
 * @type {{lintOnSave: boolean, configureWebpack: {}, compiler: boolean, outputDir: string, dll: boolean, publicPath: string}}
 */
const vueConfig = {
  publicPath: '',
  outputDir: `${__dirname}/${buildFolder}`,
  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: true,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  configureWebpack: {
    output: {
      filename: config.bundle.jsBundleName,
      path: path.resolve(__dirname, buildFolder),
      // chunkFilename: config.bundle.jsVendorsName,
      chunkFilename: '[id].js'
    },
    // resolve: {
    //   alias: {
    //     '@': path.resolve(__dirname, vueSrc)
    //   },
    //   extensions: ['.js', '.vue', '.json']
    // }
  },

  productionSourceMap: true,

  filenameHashing: false,
  // vue-loader options
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},

  // generate sourceMap for production build?
  // productionSourceMap: true,

  // CSS related options
  css: {
    // extract CSS in components into a single CSS file (only in production)
    // extract: true,

    // enable CSS source maps?
    sourceMap: false,

    // pass custom options to pre-processor loaders. e.g. to pass options to
    // sass-loader, use { sass: { ... } }
    loaderOptions: {},
    extract: {
      path: path.resolve(__dirname, buildFolder),
      filename: config.bundle.cssBundleName,
      chunkFilename: '[id].css'
    },
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,

  // split vendors using autoDLLPlugin?
  // can also be an explicit Array of dependencies to include in the DLL chunk.
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // options for the PWA plugin.
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {
  //     exclude: [
  //         /\.map$/,
  //         /img\/icons\//,
  //         /manifest\.json$/
  //     ],
  //     workboxOptions: {
  //         swDest: `../../service-worker.${config.currentWebsite}.js`,
  //         runtimeCaching: [{
  //             urlPattern: '/favicon.ico',
  //             handler: 'cacheFirst'
  //         }]
  //     }
  // },

  // configure webpack-dev-server behavior
  // devServer: {
  //  host,
  //  port,
  //  https: false,
  //  hotOnly: false,
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
  //  proxy: null
  // }

  chainWebpack(webpackConfig) {
    //appy only for production build
    if (process.env.NODE_ENV === 'production') {
      // delete HTML related webpack plugins (prevents from building index.html)
      webpackConfig.plugins.delete('html');
      webpackConfig.plugins.delete('preload');
      webpackConfig.plugins.delete('prefetch');
      // for some reason PWA breaks vue-cli build
      webpackConfig.plugins.delete('pwa');
    }

    webpackConfig.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) =>
        Object.assign(options, {
          limit: 1,
        })
      );

    const svgRule = webpackConfig.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};

module.exports = vueConfig;
