import { strict as assert } from "node:assert";
import { benchmark, writeBenchmarkResult } from "./utils.js";

const coefficientOfVariation = (t, v1, v2) =>
  Math.sqrt((t * (t * v2 - v1 * v1)) / ((t - 1) * v1 * v1));

const sampleStandardNormal = () => {
  let i;
  let j;
  let k = 2;
  while (k >= 1) {
    i = 2 * Math.random() - 1;
    j = 2 * Math.random() - 1;
    k = i * i + j * j;
  }
  return i * Math.sqrt((-2 * Math.log(k)) / k);
};

const randn = (a, sub) => {
  const subLength = sub.length;
  const len = a.length;
  for (let i = 0; i < subLength; i++) {
    a[i] = sub[i] = sampleStandardNormal();
  }

  for (i = subLength; i < len; i++) {
    a[i] = sampleStandardNormal();
  }

  return a;
};

// function matrix_statistics(t, n)
//     v, w = zeros(t), zeros(t)
//     for i in 1:t
//         a = randn(n, n)
//         b = randn(n, n)
//         c = randn(n, n)
//         d = randn(n, n)
//         P = [a b c d]
//         Q = [a b; c d]
//         v[i] = tr((P' * P)^4)
//         w[i] = tr((Q' * Q)^4)
//     end
//     return std(v) / mean(v), std(w) / mean(w)
// end

const matrixStatistics = (t, n) => {
  let P = new Float64Array(4 * n * n);
  let Q = new Float64Array(4 * n * n);

  let PTransposed = new Float64Array(P.length);
  let QTransposed = new Float64Array(Q.length);

  let Pt1P = new Float64Array(4 * n * (4 * n));
  let Pt2P = new Float64Array(4 * n * (4 * n));
  let Pt1Q = new Float64Array(2 * n * (2 * n));
  let Pt2Q = new Float64Array(2 * n * (2 * n));

  let a = new Float64Array(n * n);
  let b = new Float64Array(n * n);
  let c = new Float64Array(n * n);
  let d = new Float64Array(n * n);

  // the first n number of elements of a to d
  let aSub = new Float64Array(n);
  let bSub = new Float64Array(n);
  let cSub = new Float64Array(n);
  let dSub = new Float64Array(n);

  let v = new Float64Array(t);
  let w = new Float64Array(t);

  for (let i = 0; i < t; i++) {
    a = randn(a, aSub);
    b = randn(b, bSub);
    c = randn(c, cSub);
    d = randn(d, dSub);

    P.set(a, 0 * n * n);
    P.set(b, 1 * n * n);
    P.set(c, 2 * n * n);
    P.set(d, 3 * n * n);

    for (let j = 0; j < n; j++) {
      Q.set(aSub, 2 * n * j);
      Q.set(bSub, 2 * n * j + n);
      Q.set(cSub, 2 * n * (n + j));
      Q.set(dSub, 2 * n * (n + j) + n);
      for (let k = 0; k < n; k++) {
        Q[2 * n * j + k] = a[k];
        Q[2 * n * j + n + k] = b[k];
        Q[2 * n * (n + j) + k] = c[k];
        Q[2 * n * (n + j) + n + k] = d[k];
      }
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
  for (let i = 0; i < t; i++) {
    v1 += v[i];
    v2 += v[i] * v[i];
    w1 += w[i];
    w2 += w[i] * w[i];
  }

  return {
    s1: coefficientOfVariation(t, v1, v2),
    s2: coefficientOfVariation(t, w1, w2),
  };
};

// # Test output
// s1, s2 = matrix_statistics(1000, 5)
// @test 0.5 < s1 < 1.0
// @test 0.5 < s2 < 1.0

// # Run benchmark
// write_benchmark_result("matrix_statistics", @benchmark matrix_statistics(1000, 5))

// Test output
const { s1, s2 } = matrixStatistics(1000, 5);
assert(0.5 < s1 && s1 < 1.0);
assert(0.5 < s2 && s2 < 1.0);

// Run benchmark
// let times = benchmark(matrix_statistics, [ ], 1000, 100);
// write_benchmark_result("matrix_statistics", times);
