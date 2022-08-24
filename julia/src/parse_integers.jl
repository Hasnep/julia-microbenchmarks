using BenchmarkTools
using Test

include("utils.jl")

function parse_int(n)
    s = string(n, base = 16)
    return UInt32(parse(Int64, s, base = 16))
end

function parse_integers(t)
    for _ in 1:t
        n = rand(UInt32)
        parse_int(n)
    end
end

# Test output
@test all(parse_int(n) == n for n in 1:1000)

# Run benchmark
write_benchmark_result("parse_integers", @benchmark parse_integers(1000))
