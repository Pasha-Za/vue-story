module.exports = {
  directories: {
    src: "src/",
    buildDirectory: "build",
    themeBuildDirectory: "build/Website/themes/",
    websiteDirectory: "build/Website/"
  },

  currentWebsite: "hartmann",
  autoPrefixerBrowsers: [
    "last 2 versions",
    "ie >= 11",
    "Safari >= 9",
    "iOS >= 8"
  ],
  bundle: {
    cssBundleName: "bundle.css",
    jsBundleName: "bundle.js",
    jsVendorsName: "vendors.js"
  }
};
