function underscored(target) {
  return target.toString().replace(/([A-Z])/g, '_$1').replace(/-/g, '_').toLowerCase();
}
function destruction(obj) {
  return new Proxy(obj, handle);
}
var handle = {
  get(t, n) {
    const normal = Reflect.get(t, n)
    if (n.toString() === 'Symbol(Symbol.iterator)') {
      return normal
    }
    if (Object.prototype.toString.call(normal) === '[object Array]') {
      return destruction(normal)
    }
    if (!isNaN(+n)) {
      return new Proxy(normal, handle)
    }
    const _ = underscored(n);
    if (_ !== n) {
      const __ = Reflect.get(t, _)
      if (typeof __ === 'object') {
        return new Proxy(__, handle)
      }
      return __;
    }
    return normal;
  },
  set(t, n, v) {
    return Reflect.set(t, n, v)
  }
}

module.exports = destruction;
