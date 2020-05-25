import { requestAnimation, cancelAnimation } from './polyfill';

const isServer = typeof window === 'undefined';
let supportsPassive = false;

if (!isServer) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      // eslint-disable-next-line getter-return
      get() {
        /* istanbul ignore next */
        supportsPassive = true;
      },
    });
    window.addEventListener('test-passive', null, opts);
    // eslint-disable-next-line no-empty
  } catch (e) {}
}


let animateId;
export function scrollLeft(el, distance, duration) {
  cancelAnimation(animateId);
  const frames = duration ? Math.round(((duration / 1000) * 1000) / 16) : 1;
  let n = 0;
  const run = () => {
    el.scrollLeft += distance / frames;
    if (n < frames) {
      n += 1;
      animateId = requestAnimation(run);
    }
  };
  run();
}
export function removeElement(ele) {
  if (!ele) return;
  ele.remove();
}
export function on(target, event, handler, passive = true) {
  let option = false;
  if (supportsPassive) {
    option = { capture: false, passive };
  }
  target.addEventListener(event, handler, option);
}
export function off(target, event, handler) {
  if (isServer) return;
  target.removeEventListener(event, handler);
}

export function preventDefault(e) {
  if (typeof e.cancelable !== 'boolean' || e.cancelable) e.preventDefault();
  e.stopPropagation();
}

export function getScroller(el, root = window) {
  const scollRe = /scroll|auto/i;
  let node = el;
  while (
    node
    && node !== root
    && node.tagName !== 'HTML'
    && node.nodeType === 1
  ) {
    const { overflowY } = window.getComputedStyle(node);
    if (scollRe.test(overflowY)) {
      if (node.tagName !== 'BODY') return node;
      const { overflowY: htmlEleFlowY } = window.getComputedStyle(node.parentNode);
      if (scollRe.test(htmlEleFlowY)) return node;
    }
    node = node.parent;
  }
  return root;
}

export function getScrollTop(el) {
  return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
}

export function getBoundingClientRect(el) {
  let rect = null;
  if (el.getBoundingClientRect) {
    rect = el.getBoundingClientRect();
  } else {
    rect = {
      top: 0,
      bottom: el.innerHeight,
    };
  }
  return rect;
}

export function getRootPageYOffset() {
  return (
    window.pageYOffset
    || document.body.scrollTop
    || document.documentElement.scrollTop
    || 0
  );
}
