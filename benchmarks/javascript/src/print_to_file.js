import { strict as assert } from "node:assert";
import { benchmark, write_benchmark_result } from "./utils.js";
import * as fs from "fs";

const print_to_file = (n) => {
  let f = fs.openSync("/dev/null", "w");
  for (let i = 1; i <= n; i++) {
    fs.writeSync(f, `${i} ${i + 1}\n`);
  }
  fs.closeSync(f);
};

// Test output
print_to_file(3, "/test-file.txt");
// let f = fs.openSync("/test-file.txt", "r");
// console.log(fs.readFileSync());
// assert(fs.readFileSync("/test-file.txt","utf8") == "1 2\n2 3\n3 4\n");
// fs.closeSync(f);

// Run benchmark
let times = benchmark(print_to_file, [100_000, "/dev/null"], 1000, 100);
write_benchmark_result("print_to_file", times);
