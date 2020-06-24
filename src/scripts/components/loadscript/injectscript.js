window.$INJECTED_URLS = {};

/**
 *
 */
export default {
  /**
   *
   * @param url
   * @returns {boolean}
   */
  hasScript(url) {
    return window.$INJECTED_URLS[url];
  },

  /**
   *
   * @param url
   * @param options
   * @returns {*}
   */
  injectScript(url, options = {}) {
    if (!this.hasScript(url)) {
      const tag = document.createElement('script');
      const head = document.getElementsByTagName('head')[0];

      tag.src = url;
      tag.async = options.async !== undefined ? options.async : true;
      tag.type = 'application/javascript';

      Object.keys(options)
        .filter(key => key !== 'async')
        .forEach((key) => {
          if (options[key]) {
            tag.setAttribute(key, options[key]);
          }
        });

      window.$INJECTED_URLS[url] = new Promise((resolve) => {
        tag.addEventListener('load', resolve);
        head.appendChild(tag);
      });

      return window.$INJECTED_URLS[url];
    }

    return Promise.resolve().then(() => window.$INJECTED_URLS[url]);
  }
};
