import { strict as assert } from "node:assert";
import { benchmark, write_benchmark_result } from "./utils.js";

const iterationPiSum = (n) => {
  let sum = 0.0;
  for (let k = 1; k < n + 1; k++) {
    sum += 1.0 / (k * k);
  }
  return sum;
};

// Test output
assert(Math.abs(iterationPiSum(10_000) - 1.644834071848065) < 1e-12);

// Run benchmark
let times = benchmark(iterationPiSum, [10_000], 1000, 100);
write_benchmark_result("iteration_pi_sum", times);
