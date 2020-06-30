import { intersectionViewportObserver } from '@/scripts/utilities/intersectionViewportObserver';
import debounce from 'lodash/debounce';

export const getBackground = (backgrounds, windowWidth) => {

  if (typeof backgrounds === 'string') {
    return backgrounds;
  }

  const currentWidth = windowWidth || document.documentElement.clientWidth;
  const keys = Object.keys(backgrounds).reverse();
  const lastMatchingKey = keys.filter(key => currentWidth >= key).shift();
  return backgrounds[lastMatchingKey];
};

export const srcset = {
  name: 'srcset',
  inserted: (el, binding) => {
    const updateBackground = () => {
      const url = getBackground(binding.value);

      if (el.tagName.toLowerCase() !== 'img') {
        el.style.backgroundImage = `url('${url}')`;

        const img = el.querySelector('img');

        if (img) {
          img.src = url;
        }
      } else {
        el.src = url;
      }
    };

    intersectionViewportObserver(el, { checkIsVisible: false }).then(() => {
      updateBackground();

      el.listener = debounce(updateBackground, 200);
      window.addEventListener('resize', el.listener);

      setTimeout(() => {
        el.classList.add('-loaded');
      }, 100);
    });
  },

  unbind(el) {
    if (el.listener) {
      window.removeEventListener('resize', el.listener);
    }
  }
};

