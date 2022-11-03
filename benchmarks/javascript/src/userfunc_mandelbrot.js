import { strict as assert } from "node:assert";
import { benchmark, writeBenchmarkResult } from "./utils.js";
import { complex, add, multiply, sum } from "mathjs";

const abs2 = (z) => z.re * z.re + z.im * z.im;

const mandel = (z) => {
  let maxIter = 80;
  let c = z;
  for (let n = 0; n < maxIter; n++) {
    if (abs2(z) > 4) {
      return n;
    }
    z = add(multiply(z, z), c);
  }
  return maxIter;
};

const userfuncMandelbrot = () => {
  let a = new Array(26 * 21);
  for (let r = 0; r < 26; r++) {
    let re = -2.0 + r * 0.1;
    for (let i = 0; i < 21; i++) {
      let im = -1.0 + i * 0.1;
      let z = complex(re, im);
      a[r * 21 + i] = mandel(z);
    }
  }
  return a;
};

// Test output
console.log(sum(userfuncMandelbrot()));
// assert(sum(userfuncMandelbrot()) == 6765);

// Run benchmark
let times = benchmark(userfuncMandelbrot, [], 100, 10);
writeBenchmarkResult("userfunc_mandelbrot", times);
