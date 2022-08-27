using BenchmarkTools
using Test
using Printf

include("utils.jl")

function print_to_file(n, file_path)
    open(file_path, "w") do io
        for i in 1:n
            Printf.@printf(io, "%d %d\n", i, i + 1)
        end
    end
end

# Test output
print_to_file(3, "/tmp/test-file.txt")
@test open(f -> String(read(f)), "/tmp/test-file.txt", "r") == "1 2\n2 3\n3 4\n"

# Run benchmark
write_benchmark_result("print_to_file", @benchmark print_to_file(100_000, "/dev/null"))
