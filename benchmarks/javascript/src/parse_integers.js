import { strict as assert } from "node:assert";
import { benchmark, writeBenchmarkResult, range } from "./utils.js";

const twoToThePowerOfThirtyTwoMinusOne = 4294967295;

const generateUniformRandomInteger = () =>
  Math.floor(twoToThePowerOfThirtyTwoMinusOne * Math.random());

const parseInteger = (n) => {
  let s = n.toString(16);
  return parseInt(s, 16);
};

const parseIntegers = (t) => {
  for (let i = 0; i < t; i++) {
    let n = generateUniformRandomInteger();
    parseInteger(n);
  }
};

// Test output
assert(range(1000).every((n) => parseInteger(n) == n));

// Run benchmark
let times = benchmark(parseIntegers, [10_000], 1000, 100);
writeBenchmarkResult("parse_integers", times);
