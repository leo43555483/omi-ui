export function removeElement(ele) {
  if (!ele) return;
  ele.remove();
}
export function on(target, event, handler, passive = true) {
  target.addEventListener(event, handler, { passive });
}
export function off(target, event, handler) {
  target.removeEventListener(event, handler);
}

export function preventDefault(e) {
  if (typeof e.cancelable !== 'boolean' || e.cancelable) e.preventDefault();
  e.stopPropagation();
}
