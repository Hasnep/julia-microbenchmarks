import { strict as assert } from "node:assert";
import { benchmark, write_benchmark_result } from "./utils.js";

const generate_rand_float64_array = (n) => {
  let v = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    v[i] = Math.random();
  }
  return v;
};

const transpose_matrix = (A, m, n) => {
  let A_transposed = new Float64Array(m * n);
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      A_transposed[j * m + i] = A[i * n + j];
    }
  }
  return A_transposed;
};

const matmul = (A, B, m, l, n) => {
  let C = new Float64Array(m * n);

  // Use the transpose of B so that during the matrix multiplication we access consecutive memory locations.
  // This is a fairer comparison of JS with the other languages which call on custom multiplication routines, which likely make use of such aligned memory.
  B = transpose_matrix(B, l, n);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let total = 0.0;
      for (let k = 0; k < l; k++) {
        total += A[i * l + k] * B[j * l + k];
      }
      C[i * n + j] = total;
    }
  }
  return C;
};

const matrix_multiply = (n) => {
  let A = generate_rand_float64_array(n * n);
  let B = generate_rand_float64_array(n * n);
  return matmul(A, B, n, n, n);
};

// Test output
assert(matrix_multiply(1000)[0] >= 0);

// Run benchmark
let times = benchmark(matrix_multiply, [1000], 1000, 100);
write_benchmark_result("matrix_multiply", times);
