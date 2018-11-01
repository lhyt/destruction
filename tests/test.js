var destruction = require('../src/index')

describe('get', () => {
  var a = {
    b_f:{
      c_d:1,d_g:{e_w:2}
    },
    arr: [{ e_p: 666 }, {q_q: 'qq'}, {p: 1}],
    f_q:3
  }
  var da = destruction(a)
  var {
    bF: {
      dG: {
        eW
      }
    },
    fQ,
    arr: [ { eP } ]
  } = da;
  test('普通对象', () => {
    expect(fQ).toBe(3);
  });
  test('数组里对象', () => {
    expect(eP).toBe(666);
  });
  test('普通对象', () => {
    var {
      bF: {
        dG
      }
    } = da;
    expect(dG.e_w).toBe(2);
  });
  test('深层普通对象', () => {
    expect(eW).toBe(2);
  });
  test('数组逗号下划线', () => {
    var {
      arr: [ ,,{ p } ]
    } = da;
    expect(p).toBe(1);
  });
  test('数组逗号解构', () => {
    var {
      arr: [ ,{ qQ } ]
    } = da;
    expect(qQ).toBe('qq');
  });
  test('数组下标访问', () => {
    var {
      arr: { 1: ele1 }
    } = da;
    expect(ele1.q_q).toBe('qq');
  });
  var obj = {
    a_b: {
      c_d: {
        e_f: [
          {g_h: 1},
          {i_j_k: 2},
        ]
      }
    }
  }
  var dobj = destruction(obj);
  test('深层对象里的数组', () => {
    var {
      aB: {
        cD: {
          eF
        }
      }
    } = dobj;
    expect(Array.isArray(eF)).toBe(true);
  });
  test('深层对象里的数组元素', () => {
    var {
      aB: {
        cD: {
          eF: [, { iJK }]
        }
      }
    } = dobj
    expect(iJK).toBe(2);
  });
});

describe('set', () => {
  var obj = {
    a_b: {
      c_d: {
        e_f: [
          {g_h: 1},
          {i_j_k: 2},
        ]
      }
    }
  }
  var {
    aB: {
      cD: {
        eF: [, iJK]
      }
    }
  } = destruction(obj)
  test('相同的数组元素引用', () => {
    var {
      aB: {
        cD: {
          eF
        }
      }
    } = destruction(obj)
    eF[1].i_j_k = 666;
    expect(iJK.i_j_k).toBe(666);
  });
  test('相同的对象引用', () => {
    var {
      aB: {
        cD
      }
    } = destruction(obj)
    expect(cD.e_f[0].g_h).toBe(1);
    cD.e_f = 1;
    expect(cD.e_f[0]).toBe(undefined);
  });
})