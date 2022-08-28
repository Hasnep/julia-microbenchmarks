using BenchmarkTools
using Test

include("utils.jl")

iteration_pi_sum(n) = sum(1.0 / (k * k) for k in 1:n)

# Test output
@test abs(iteration_pi_sum(10_000) - 1.644834071848065) < 1e-12

# Run benchmark
write_benchmark_result("iteration_pi_sum", @benchmark iteration_pi_sum(10_000))
