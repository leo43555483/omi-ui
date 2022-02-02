'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * requestAnimationFrame polyfill
 */
var pre = Date.now();

function fallback(fn) {
  var cur = Date.now();
  var remeaining = Math.max(0, 16 - (cur - pre));
  var timer = setTimeout(fn, remeaining);
  pre = cur + remeaining;
  return timer;
}

var root = {};

if (typeof window !== 'undefined') {
  root = window;
}

var raf = root.requestAnimationFrame || fallback;
var cancel = root.cancelAnimationFrame || root.clearTimeout;
function requestAnimation(fn) {
  return raf.call(root, fn);
}
function cancelAnimation(id) {
  return cancel.call(root, id);
}
function doubleAnimation(fn) {
  requestAnimation(function () {
    requestAnimation(fn);
  });
}

exports.cancelAnimation = cancelAnimation;
exports.doubleAnimation = doubleAnimation;
exports.requestAnimation = requestAnimation;
