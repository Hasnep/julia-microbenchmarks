// import { strict as assert } from "node:assert";
// import { benchmark, writeBenchmarkResult } from "./utils.js";

// // function qsort!(a, lo, hi)
// //     i, j = lo, hi
// //     while i < hi
// //         pivot = a[(lo + hi) >>> 1]
// //         while i <= j
// //             while a[i] < pivot
// //                 i += 1
// //             end
// //             while a[j] > pivot
// //                 j -= 1
// //             end
// //             if i <= j
// //                 a[i], a[j] = a[j], a[i]
// //                 i, j = i + 1, j - 1
// //             end
// //         end
// //         if lo < j
// //             qsort!(a, lo, j)
// //         end
// //         lo, j = i, hi
// //     end
// //     return a
// // end

// // recursion_quicksort(n) = qsort!(rand(n), 1, n)

// // Test output
// let output = recursion_quicksort(5000);
// assert(output === output.sort());

// // Run benchmark
// let times = benchmark(recursion_quicksort, [5000], 1000, 100);
// writeBenchmarkResult("recursion_quicksort", times);

// const rand = (n) => {
//   let v = new Array(n);
//   for (let i = 0; i < n; i++) {
//     v[i] = Math.random();
//   }
//   return v;
// };

// const quicksortKernel = (a, lo, hi) => {
//   let i = lo;
//   let j = hi;
//   while (i < hi) {
//     let pivot = a[Math.floor((lo + hi) / 2)];
//     while (i <= j) {
//       while (a[i] < pivot) {
//         i = i + 1;
//       }
//       while (a[j] > pivot) {
//         j = j - 1;
//       }
//       if (i <= j) {
//         t = a[i];
//         a[i] = a[j];
//         a[j] = t;
//         i = i + 1;
//         j = j - 1;
//       }
//     }
//     if (lo < j) {
//       quicksortKernel(a, lo, j);
//     }
//     lo = i;
//     j = hi;
//   }
// };

// function sortperf(n) {
//   var v = rand(n);
//   quicksortKernel(v, 0, n);
//   return v;
// }
