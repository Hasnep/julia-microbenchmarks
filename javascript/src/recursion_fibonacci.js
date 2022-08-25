import { strict as assert } from "node:assert";
import { benchmark, write_benchmark_result } from "./utils.js";

const recursion_fibonacci = (n) =>
  n < 2 ? n : recursion_fibonacci(n - 1) + recursion_fibonacci(n - 2);

// Test output
assert(recursion_fibonacci(20) == 6765);

// Run benchmark
let times = benchmark(recursion_fibonacci, [20], 1000, 100);
write_benchmark_result("recursion_fibonacci", times);
