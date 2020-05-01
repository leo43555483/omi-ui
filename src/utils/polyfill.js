/**
 * requestAnimationFrame polyfill
 */
let pre = Date.now();
function fallback(fn) {
  const cur = Date.now();
  const remeaining = Math.max(0, (16 - (cur - pre)));
  const timer = setTimeout(fn, remeaining);
  pre = cur + remeaining;
  return timer;
}
const root = window;
const raf = root.requestAnimationFrame || fallback;
const cancel = root.cancelAnimationFrame || root.clearTimeout;
export function requestAnimation(fn) {
  return raf.call(root, fn);
}
export function cancelAnimation(id) {
  return cancel.call(root, id);
}
export function doubleAnimation(fn) {
  requestAnimation(() => {
    requestAnimation(fn);
  });
}
