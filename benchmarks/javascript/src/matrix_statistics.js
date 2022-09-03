import { strict as assert } from "node:assert";
import { benchmark, write_benchmark_result } from "./utils.js";

// function matrix_statistics(t, n)
//     v, w = zeros(t), zeros(t)
//     for i in 1:t
//         a = randn(n, n)
//         b = randn(n, n)
//         c = randn(n, n)
//         d = randn(n, n)
//         P = [a b c d]
//         Q = [a b; c d]
//         v[i] = tr((P' * P)^4)
//         w[i] = tr((Q' * Q)^4)
//     end
//     return std(v) / mean(v), std(w) / mean(w)
// end

// # Test output
// s1, s2 = matrix_statistics(1000, 5)
// @test 0.5 < s1 < 1.0
// @test 0.5 < s2 < 1.0

// # Run benchmark
// write_benchmark_result("matrix_statistics", @benchmark matrix_statistics(1000, 5))

// Test output
// assert( true );

// Run benchmark
// let times = benchmark(matrix_statistics, [ ], 1000, 100);
// write_benchmark_result("matrix_statistics", times);
