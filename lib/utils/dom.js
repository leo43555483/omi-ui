'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var polyfill = require('./polyfill.js');

var isServer = typeof window === 'undefined';
var supportsPassive = false;

if (!isServer) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      // eslint-disable-next-line getter-return
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', null, opts); // eslint-disable-next-line no-empty
  } catch (e) {}
}

var animateId;
function scrollLeft(el, distance, duration) {
  polyfill.cancelAnimation(animateId);
  var frames = duration ? Math.round(duration / 1000 * 1000 / 16) : 1;
  var n = 0;

  var run = function run() {
    el.scrollLeft += distance / frames;

    if (n < frames) {
      n += 1;
      animateId = polyfill.requestAnimation(run);
    }
  };

  run();
}
function removeElement(ele) {
  if (!ele) return;
  ele.remove();
}
function on(target, event, handler, passive) {
  if (passive === void 0) {
    passive = true;
  }

  var option = false;

  if (supportsPassive) {
    option = {
      capture: false,
      passive: passive
    };
  }

  target.addEventListener(event, handler, option);
}
function off(target, event, handler) {
  if (isServer) return;
  target.removeEventListener(event, handler);
}
function preventDefault(e) {
  if (typeof e.cancelable !== 'boolean' || e.cancelable) e.preventDefault();
  e.stopPropagation();
}
function getScroller(el, root) {
  if (root === void 0) {
    root = window;
  }

  var scollRe = /scroll|auto/i;
  var node = el;

  while (node && node !== root && node.tagName !== 'HTML' && node.nodeType === 1) {
    var _window$getComputedSt = window.getComputedStyle(node),
        overflowY = _window$getComputedSt.overflowY;

    if (scollRe.test(overflowY)) {
      if (node.tagName !== 'BODY') return node;

      var _window$getComputedSt2 = window.getComputedStyle(node.parentNode),
          htmlEleFlowY = _window$getComputedSt2.overflowY;

      if (scollRe.test(htmlEleFlowY)) return node;
    }

    node = node.parent;
  }

  return root;
}
function getScrollTop(el) {
  return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
}
function getBoundingClientRect(el) {
  var rect = null;
  if (!el) return rect;

  if (el.getBoundingClientRect) {
    rect = el.getBoundingClientRect();
  } else {
    rect = {
      top: 0,
      bottom: el.innerHeight
    };
  }

  return rect;
}
function getRootPageYOffset() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
}

exports.getBoundingClientRect = getBoundingClientRect;
exports.getRootPageYOffset = getRootPageYOffset;
exports.getScrollTop = getScrollTop;
exports.getScroller = getScroller;
exports.off = off;
exports.on = on;
exports.preventDefault = preventDefault;
exports.removeElement = removeElement;
exports.scrollLeft = scrollLeft;
