import { inViewport } from './inViewport';
import { isVisible } from './isVisible';
import throttle from 'lodash/throttle';

export function inViewportAndVisible(node, options, callback) {
  return throttle(() => {
    if (options.checkIsVisible && (inViewport(node) && isVisible(node))
      || !options.checkIsVisible && inViewport(node)) {
      callback();
    }
  }, options.delay);
}

export function intersectionObserverFallback(node, delay) {
  return new Promise((resolve) => {
    const scrollListener = inViewportAndVisible(node, delay, () => {
      document.removeEventListener('carouselLazyImg', scrollListener);
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', scrollListener);
      resolve();
    });

    document.addEventListener('carouselLazyImg', scrollListener, false);
    window.addEventListener('scroll', scrollListener, false);
    window.addEventListener('resize', scrollListener, false);

    scrollListener();
  });
}

/**
 * Create a new IntersectionObserver (or a fallback) and return a Promise which will be resolved when the node is
 * visible in the viewport.
 *
 * @param node
 * @param options
 */
export function intersectionViewportObserver(node, options = {}) {
  const {
    checkIsVisible = true,
    delay = 500,
    threshold = [0.006]
  } = options;

  /* istanbul ignore else */
  if ('IntersectionObserver' in window) {
    return new Promise((resolve) => {
      const observer = new IntersectionObserver(
        (changes) => {
          changes.forEach((change) => {
            if (change.intersectionRatio > 0) {
              resolve();
              observer.unobserve(node);
            }
          });
        },
        {
          threshold
        }
      );

      observer.observe(node);
    });
  } else {
    return intersectionObserverFallback(node, { delay, checkIsVisible });
  }
}
