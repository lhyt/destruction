<a href="https://www.npmjs.com/package/proxy-destruction"><img src="https://img.shields.io/badge/>-npm-red.svg"/></a>
<a href="https://github.com/lhyt/destruction/issues"><img src="https://img.shields.io/badge/>-issue-green.svg"/></a>

# install
```
npm i proxy-destruction -s
```

# Usage
you can use camelize name to deconstruction assignment directly, without underscored to camelize:
> before:
```
const obj = {
    min_value: 1,
    good_day: 666
}
const {
    min_value: minValue,
    good_day: goodDay
} = obj
```

> after:
```
const {
    minValue,
    goodDay
} = destruction(obj)
```

even deep object:
```
  const a = {
    b_f:{
      c_d:1,d_g:{e_w:2}
    },
    arr: [{ e_p: 666 }, {q_q: 'qq'}, {p: 1}],
    f_q:3
  }
  const da = destruction(a)
  const {
    bF: {
      dG: {
        eW
      }
    },
    fQ,
    arr: [ { eP } ]
  } = da;
  console.log(eW, fQ, eP); // 2 3 666
```
> warning: even though you can use `bF` and `dG` in destruction, you can't use them finally
