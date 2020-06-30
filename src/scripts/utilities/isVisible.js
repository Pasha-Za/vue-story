export function isVisible(el) {
  const elPosInfo = el.getBoundingClientRect();
  const elCenter = {
    x: elPosInfo.left + (el.offsetWidth / 2),
    y: elPosInfo.top + (el.offsetHeight / 2)
  };
  let pointContainer = document.elementFromPoint(elCenter.x, elCenter.y);

  if (
    elCenter.x < 0 ||
    elCenter.y < 0 ||
    elCenter.x > (document.documentElement.clientWidth || window.innerWidth) ||
    elCenter.y > (document.documentElement.clientHeight || window.innerHeight)
  ) {
    return false;
  }

  /* eslint-disable no-cond-assign */
  do {
    if (pointContainer === el) {
      return true;
    }
  } while ((pointContainer = pointContainer.parentNode));
  /* eslint-enable no-cond-assign */

  return false;
}
