const fs = require("fs"); // for print to file benchmark

(function () {
  "use strict";

  var tmin, i, j, t, n, m, s, a, sum, a0, v, r, C, filename, fd;

  // random matrix statistics //

  function gaussian() {
    var k, i, j;
    k = 2;
    do {
      i = 2 * Math.random() - 1;
      j = 2 * Math.random() - 1;
      k = i * i + j * j;
    } while (k >= 1);
    return i * Math.sqrt((-2 * Math.log(k)) / k);
  }

  function randn(a, sub) {
    var subLen, len, i;
    subLen = sub.length;
    len = a.length;

    for (i = 0; i < subLen; i++) {
      a[i] = sub[i] = gaussian();
    }

    for (i = subLen; i < len; i++) {
      a[i] = gaussian();
    }

    return a;
  }

  function transpose(dest, src, m, n) {
    var i, j;
    i = 0;
    j = 0;

    for (i = 0; i < m; i++) {
      for (j = 0; j < n; j++) {
        dest[i * n + j] = src[j * m + i];
      }
    }
  }

  function matmulCopy(dest, A, B, m, l, n) {
    var i, j, k, sum;
    i = 0;
    j = 0;
    k = 0;

    for (i = 0; i < m; i++) {
      for (j = 0; j < n; j++) {
        sum = 0.0;

        for (k = 0; k < l; k++) {
          sum += A[i * l + k] * B[k * n + j];
        }

        dest[i * n + j] = sum;
      }
    }
  }

  function randmatstat(t) {
    var n,
      P,
      PTransposed,
      Pt1P,
      Pt2P,
      Q,
      QTransposed,
      Pt1Q,
      Pt2Q,
      a,
      b,
      c,
      d,
      aSub,
      bSub,
      cSub,
      dSub,
      v,
      w,
      i,
      j,
      k,
      trP,
      trQ,
      v1,
      v2,
      w1,
      w2;
    n = 5;

    P = new Float64Array(4 * n * n);
    Q = new Float64Array(4 * n * n);

    PTransposed = new Float64Array(P.length);
    QTransposed = new Float64Array(Q.length);

    Pt1P = new Float64Array(4 * n * (4 * n));
    Pt2P = new Float64Array(4 * n * (4 * n));
    Pt1Q = new Float64Array(2 * n * (2 * n));
    Pt2Q = new Float64Array(2 * n * (2 * n));

    a = new Float64Array(n * n);
    b = new Float64Array(n * n);
    c = new Float64Array(n * n);
    d = new Float64Array(n * n);

    // the first n number of elements of a to d
    aSub = new Float64Array(n);
    bSub = new Float64Array(n);
    cSub = new Float64Array(n);
    dSub = new Float64Array(n);

    v = new Float64Array(t);
    w = new Float64Array(t);

    i = 0;
    j = 0;
    k = 0;

    for (i = 0; i < t; i++) {
      a = randn(a, aSub);
      b = randn(b, bSub);
      c = randn(c, cSub);
      d = randn(d, dSub);

      P.set(a, 0 * n * n);
      P.set(b, 1 * n * n);
      P.set(c, 2 * n * n);
      P.set(d, 3 * n * n);

      for (j = 0; j < n; j++) {
        Q.set(aSub, 2 * n * j);
        Q.set(bSub, 2 * n * j + n);
        Q.set(cSub, 2 * n * (n + j));
        Q.set(dSub, 2 * n * (n + j) + n);
        /*
                  for (k = 0; k < n; k++) {
                  Q[ 2*n*j        + k ] = a[k];
                  Q[ 2*n*j+n      + k ] = b[k];
                  Q[ 2*n*(n+j)    + k ] = c[k];
                  Q[ 2*n*(n+j)+n  + k ] = d[k];
                  }
                */
      }

      transpose(PTransposed, P, n, 4 * n);
      matmulCopy(Pt1P, PTransposed, P, 4 * n, n, 4 * n);
      matmulCopy(Pt2P, Pt1P, Pt1P, 4 * n, 4 * n, 4 * n);
      matmulCopy(Pt1P, Pt2P, Pt2P, 4 * n, 4 * n, 4 * n);

      trP = 0;
      for (j = 0; j < 4 * n; j++) {
        trP += Pt1P[(4 * n + 1) * j];
      }
      v[i] = trP;

      transpose(QTransposed, Q, 2 * n, 2 * n);
      matmulCopy(Pt1Q, QTransposed, Q, 2 * n, 2 * n, 2 * n);
      matmulCopy(Pt2Q, Pt1Q, Pt1Q, 2 * n, 2 * n, 2 * n);
      matmulCopy(Pt1Q, Pt2Q, Pt2Q, 2 * n, 2 * n, 2 * n);

      trQ = 0;
      for (j = 0; j < 2 * n; j++) {
        trQ += Pt1Q[(2 * n + 1) * j];
      }
      w[i] = trQ;
    }

    v1 = 0.0;
    v2 = 0.0;
    w1 = 0.0;
    w2 = 0.0;
    for (i = 0; i < t; i++) {
      v1 += v[i];
      v2 += v[i] * v[i];
      w1 += w[i];
      w2 += w[i] * w[i];
    }

    return {
      s1: Math.sqrt((t * (t * v2 - v1 * v1)) / ((t - 1) * v1 * v1)),
      s2: Math.sqrt((t * (t * w2 - w1 * w1)) / ((t - 1) * w1 * w1)),
    };
  }

  tmin = Number.POSITIVE_INFINITY;
  for (i = 0; i < 5; i++) {
    t = new Date().getTime();
    for (j = 0; j < 10; j++) {
      r = randmatstat(1000);
      // assert(0.5 < r.s1 < 1.0);
      //        assert(0.5 < r.s2 < 1.0);
    }
    t = new Date().getTime() - t;
    if (t < tmin) {
      tmin = t;
    }
  }
  console.log("javascript,matrix_statistics," + tmin / 10);
})();
