export default class KeySiteCore {
  beforeMount() {
    if (this.$el !== undefined) {
      this.domObj = {};
      const domObj = this.$el.getElementsByTagName('*');
      let key = this.$el.getAttribute('key');

      /* istanbul ignore else */
      if (this.$el.id !== '' && key != null) {
        this.domObj[this.$el.id] = key;
      }

      const max = domObj.length;

      for (let i = 0; i < max; i += 1) {
        const elem = domObj[i];
        key = elem.getAttribute('key');

        /* istanbul ignore else */
        if (elem.id !== '' && key != null) {
          if (this.domObj[elem.id] === undefined) {
            this.domObj[elem.id] = key;
          } else {
            /* istanbul ignore next */
            throw new RangeError(`The id ${elem.id} is already set`);
          }
        }
      }
    }
  }

  mounted() {
    if (this.domObj) {
      let key = this.domObj[this.$el.id];

      if (key) {
        this.$el.setAttribute('key', key);
      }

      const domObj = this.$el.getElementsByTagName('*');
      const max = domObj.length;

      for (let i = 0; i < max; i += 1) {
        const elem = domObj[i];
        key = this.domObj[elem.id];
        if (key) {
          elem.setAttribute('key', key);
        }
      }

      this.domObj = {};
    }
  }

  static install(Vue) {
    const { beforeMount, mounted } = new KeySiteCore(Vue);

    Vue.mixin({
      beforeMount,
      mounted
    });
  }
}
