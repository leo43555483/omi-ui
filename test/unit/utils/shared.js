export function fromArray(target) {
  if (Array.isArray(target)) return target;
  return Array.prototype.slice.call(target);
}

export function wait(cb = null, delay = 50) {
  return new Promise((r) => {
    setTimeout(() => {
      if (cb) cb();
      r();
    }, delay);
  });
}
