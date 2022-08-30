import { strict as assert } from "node:assert";
import { benchmark, write_benchmark_result, sum } from "./utils.js";

class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }
}

const abs2 = (z) => {
  return z.re * z.re + z.im * z.im;
};

const complex_add = (z, w) => new Complex(z.re + w.re, z.im + w.im);

const complex_multiply = (z, w) =>
  new Complex(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);

const mandel = (z) => {
  let maxiter = 80;
  let c = z;
  for (let n = 0; n < maxiter; n++) {
    if (abs2(z) > 4) {
      return n;
    }
    z = complex_add(complex_multiply(z, z), c);
  }
  return maxiter;
};

const userfunc_mandelbrot = () => {
  let a = new Array(26 * 21);
  for (let r = 0; r < 26; r++) {
    let re = -2.0 + r * 0.1;
    for (let i = 0; i < 21; i++) {
      let im = -1.0 + i * 0.1;
      let z = new Complex(re, im);
      a[r * 21 + i] = mandel(z);
    }
  }
  return a;
};

// Test output
assert(sum(userfunc_mandelbrot()) == 6765);

// Run benchmark
let times = benchmark(userfunc_mandelbrot, [], 100, 10);
write_benchmark_result("userfunc_mandelbrot", times);
