export function fromArray(target) {
  if (Array.isArray(target)) return target;
  return Array.prototype.slice.call(target);
}

export function noop() { }
