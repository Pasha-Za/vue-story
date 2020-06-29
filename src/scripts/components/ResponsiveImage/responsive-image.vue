<template>
  <div>
    <div class="responsive-image__media" ref="backgroundWrapper" :style="{backgroundImage: backgroundImage}">
      <slot/>
    </div>
    <slot name="content"/>
  </div>
</template>
<script>
  import debounce from 'lodash/debounce';
  import { getBackground } from '@/scripts/directives/srcset/srcset';
  import { intersectionViewportObserver } from '@/scripts/utilities/intersectionViewportObserver';

  export default {
    name: 'responsive-image',
    props: {
      srcset: {
        type: [Object, String],
        required: false,
        default: undefined
      },
      aspectRatio: {
        type: String,
        required: false,
        default: undefined
      },
    },

    data() {
      return {
        loaded: true,
        isAnimationActive: false,
        backgroundImage: undefined,
        counter: 0
      };
    },

    mounted() {
      this.img = this.$refs.backgroundWrapper.querySelector('img');

      intersectionViewportObserver(this.$el, { checkIsVisible: false }).then(() => {
        this.loaded = true;
        this.updateBackground();

        /* istanbul ignore else */
        if (this.srcset) {
          /* istanbul ignore next */
          this.responsiveListener = debounce(() => this.updateBackground(), 200);
          window.addEventListener('resize', this.responsiveListener);
        }
      });
    },

    destroyed() {
      /* istanbul ignore else */
      if (this.responsiveListener) {
        window.removeEventListener('resize', this.responsiveListener);
        this.responsiveListener = null;
      }
      /* istanbul ignore else */
      if (this.scrollListener) {
        window.addEventListener('scroll', this.scrollListener);
        this.scrollListener = null;
      }
    },
    // need for EE
    updated() {
      /* istanbul ignore next */
      if (document.getElementsByTagName('body')[0].classList.contains('pagemode-edit')) {
        this.updateBackground();
      }
    },

    methods: {
      updateBackground() {
        const src = this.getBackgroundImage();
        this.backgroundImage = `url('${src}')`;

        const img = this.$refs.backgroundWrapper.querySelector('img');
        /* istanbul ignore else */
        if (img) {
          img.src = src;
        }
      },

      getBackgroundImage() {
        /* istanbul ignore else */
        if (this.srcset) {
          return getBackground(this.srcset);
        }

        const elImg = this.$el.querySelector('img');
        /* istanbul ignore else */
        if (elImg && elImg.src) {
          return elImg.src;
        }

        /* istanbul ignore next */
        return undefined;
      }
    }
  };
</script>
<style lang="scss" src="./responsive-image.scss"></style>
