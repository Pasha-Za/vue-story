<template>
  <div v-if="loaded">
    <slot/>
  </div>
</template>
<script>
  import InjectScript from './injectscript';

  export default {
    name: 'load-script',
    props: {
      name: {
        type: String,
        default: undefined
      },
      src: {
        type: String,
        required: true
      },
      integrity: {
        type: String,
        default: undefined
      },
      crossorigin: {
        type: String,
        default: undefined
      },
      async: {
        type: Boolean,
        default: true
      },
      attributes: {
        type: Object,
        default: undefined
      }
    },

    data() {
      return {
        loaded: false
      };
    },
    created() {
      /* istanbul ignore else */
      if (this.src && !InjectScript.hasScript(this.src)) {
        InjectScript.injectScript(this.src, {
          async: this.async,
          integrity: this.integrity,
          crossorigin: this.crossorigin,
          ...(this.attributes || {})
        }).then(() => {
          this.loaded = true;
          this.$emit('loaded');
          if (this.name) {
            this.$root.$emit(`script.loaded.${this.name}`, {
              name: this.name,
              url: this.src
            });
          }
        });
      } else if (InjectScript.hasScript(this.src)) {
        this.loaded = true;
        this.$emit('loaded');
      }
    }
  };
</script>
