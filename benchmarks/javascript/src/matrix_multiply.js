// import { strict as assert } from "node:assert";
// import { benchmark, writeBenchmarkResult } from "./utils.js";
// import { matrix, multiply } from "mathjs";

// const generateRandomUniformMatrix = (m, n) =>
//   matrix(
//     Array.from({ length: m }, () =>
//       Array.from({ length: n }, () => Math.random())
//     )
//   );

// const matrixMultiply = (n) => {
//   let a = generateRandomUniformMatrix(n, n);
//   let b = generateRandomUniformMatrix(n, n);
//   return multiply(a, b);
// };

// // Test output
// assert(matrixMultiply(1000)[0] >= 0);

// // Run benchmark
// let times = benchmark(matrixMultiply, [1000], 1000, 100);
// writeBenchmarkResult("matrix_multiply", times);
