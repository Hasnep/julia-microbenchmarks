import { strict as assert } from "node:assert";
import { benchmark, write_benchmark_result } from "./utils.js";
import { transposeMatrix, multiplyMatrices } from "./matrix_utils";

const generateRandomUniformArray = (arrayLength) => {
  let v = new Float64Array(arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    v[i] = Math.random();
  }
  return v;
};

const matrixMultiply = (n) => {
  let A = generateRandomUniformArray(n * n);
  let B = generateRandomUniformArray(n * n);
  return multiplyMatrices(A, B, n, n, n);
};

// Test output
assert(matrixMultiply(1000)[0] >= 0);

// Run benchmark
let times = benchmark(matrixMultiply, [1000], 1000, 100);
write_benchmark_result("matrix_multiply", times);
