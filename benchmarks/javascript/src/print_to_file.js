// import { strict as assert } from "node:assert";
// import { benchmark, writeBenchmarkResult } from "./utils.js";
// import * as fs from "fs";

// const printToFile = (n) => {
//   let f = fs.openSync("/dev/null", "w");
//   for (let i = 1; i <= n; i++) {
//     fs.writeSync(f, `${i} ${i + 1}\n`);
//   }
//   fs.closeSync(f);
// };

// // Test output
// printToFile(3, "/test-file.txt");
// // let f = fs.openSync("/test-file.txt", "r");
// // console.log(fs.readFileSync());
// // assert(fs.readFileSync("/test-file.txt","utf8") == "1 2\n2 3\n3 4\n");
// // fs.closeSync(f);

// // Run benchmark
// let times = benchmark(printToFile, [100_000, "/dev/null"], 1000, 100);
// writeBenchmarkResult("print_to_file", times);
