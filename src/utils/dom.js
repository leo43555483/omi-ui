export function removeElement(ele) {
  if (!ele) return;
  ele.remove();
}
export function on(target, event, handler) {
  target.addEventListener(event, handler);
}
export function off(target, event, handler) {
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
