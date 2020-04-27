import { getScroller } from '../utils/dom';
import { throttle, isFunction, isObject } from '../utils/shared';

const context = '~~omiScroll';

function unbind(el) {
  if (!el[context]) return;
  const { handler, scroller } = el[context];
  if (!scroller) return;
  scroller.removeEventListener('scroll', handler);
}


function bindScroll(el, binding) {
  const { value } = binding;
  let callback = null;
  if (isFunction(value)) callback = value;
  else if (isObject(value) && value.callback) callback = value.callback;
  if (!callback) return;
  const { arg: immediate } = binding;
  const scroller = getScroller(el);
  if (scroller) {
    const handler = throttle((e) => { callback(e, scroller); });
    if (el[context] && el[context].scroller !== scroller) unbind(el, binding);
    if (immediate) handler();
    scroller.addEventListener('scroll', handler, { passive: true });
    el[context] = {
      handler,
      scroller,
    };
  }
}

export default {
  name: 'scroll',
  inserted: bindScroll,
  update: bindScroll,
  unbind,
};
