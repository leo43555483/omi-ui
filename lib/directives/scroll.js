'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dom = require('../utils/dom.js');
var shared = require('../utils/shared.js');

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
  if (shared.isFunction(value)) callback = value;else if (shared.isObject(value) && value.callback) callback = value.callback;
  if (!callback) return;
  var immediate = binding.arg;
  var scroller = dom.getScroller(el);

  if (scroller) {
    var handler = shared.throttle(function (e) {
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

exports["default"] = scroll;
