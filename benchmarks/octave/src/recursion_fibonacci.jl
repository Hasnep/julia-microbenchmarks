using BenchmarkTools
using Test

include("utils.jl")

recursion_fibonacci(n) = n < 2 ? n : recursion_fibonacci(n - 1) + recursion_fibonacci(n - 2)

# Test output
@test recursion_fibonacci(20) == 6765

# Run benchmark
write_benchmark_result("recursion_fibonacci", @benchmark recursion_fibonacci(20))
