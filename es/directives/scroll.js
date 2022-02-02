import { getScroller } from '../utils/dom.js';
import { isFunction, isObject, throttle } from '../utils/shared.js';

var context = '~~omiScroll';

function unbind(el) {
  if (!el[context]) return;
  var _el$context = el[context],
      handler = _el$context.handler,
      scroller = _el$context.scroller;
  if (!scroller) return;
  scroller.removeEventListener('scroll', handler);
}

function bindScroll(el, binding) {
  var value = binding.value;
  var callback = null;
  if (isFunction(value)) callback = value;else if (isObject(value) && value.callback) callback = value.callback;
  if (!callback) return;
  var immediate = binding.arg;
  var scroller = getScroller(el);

  if (scroller) {
    var handler = throttle(function (e) {
      callback(e, scroller);
    });
    if (el[context] && el[context].scroller !== scroller) unbind(el);
    if (immediate) handler();
    scroller.addEventListener('scroll', handler, {
      passive: true
    });
    el[context] = {
      handler: handler,
      scroller: scroller
    };
  }
}

var scroll = {
  name: 'scroll',
  inserted: bindScroll,
  update: bindScroll,
  unbind: unbind
};

export { scroll as default };
