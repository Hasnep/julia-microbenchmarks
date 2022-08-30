import { strict as assert } from "node:assert";
import { benchmark, write_benchmark_result, range } from "./utils.js";

const two_to_the_power_of_thirty_two_minus_one = 4294967295;
const generate_random_uint32 = () =>
  Math.floor(two_to_the_power_of_thirty_two_minus_one * Math.random());

const parse_int = (n) => {
  let s = n.toString(16);
  return parseInt(s, 16);
};

const parse_integers = (t) => {
  for (let i = 0; i < t; i++) {
    let n = generate_random_uint32();
    parse_int(n);
  }
};

// Test output
assert(range(1000).every((n) => parse_int(n) == n));

// Run benchmark
let times = benchmark(parse_integers, [10_000], 1000, 100);
write_benchmark_result("parse_integers", times);
