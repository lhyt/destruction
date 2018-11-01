function toString(t) {
  return Object.prototype.toString.call(t);
}

function underscored(target) {
  return target
  .toString()
  .replace(/([A-Z])/g, '_$1')
  .replace(/-/g, '_')
  .toLowerCase();
}

function destruction(obj) {
  return new Proxy(obj, handle);
}

const handle = {
  get(t, n) {
    try {
      const normal = Reflect.get(t, n)
      if (n.toString() === 'Symbol(Symbol.iterator)') {
        return normal
      }
      if (toString(normal) === '[object Array]') {
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
    } catch (e) {
      console.error(e);
      return Reflect.get(t, n);
    }
  },
  set(t, n, v) {
    return Reflect.set(t, n, v)
  }
}

module.exports = destruction;
