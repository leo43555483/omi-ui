import { requestAnimation, cancelAnimation } from './polyfill';

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
export function on(target, event, handler, opt = null) {
  target.addEventListener(event, handler, opt);
}
export function off(target, event, handler, opt) {
  target.removeEventListener(event, handler, opt);
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
