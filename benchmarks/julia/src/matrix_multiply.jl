using BenchmarkTools
using Test

include("utils.jl")

matrix_multiply(n) = rand(n, n) * rand(n, n)

# Test output
@test matrix_multiply(1000)[1, 1] >= 0

# Run benchmark
write_benchmark_result("matrix_multiply", @benchmark matrix_multiply(1000))
