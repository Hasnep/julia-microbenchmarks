using BenchmarkTools
using Test

include("utils.jl")

function qsort!(a, lo, hi)
    i, j = lo, hi
    while i < hi
        pivot = a[(lo + hi) >>> 1]
        while i <= j
            while a[i] < pivot
                i += 1
            end
            while a[j] > pivot
                j -= 1
            end
            if i <= j
                a[i], a[j] = a[j], a[i]
                i, j = i + 1, j - 1
            end
        end
        if lo < j
            qsort!(a, lo, j)
        end
        lo, j = i, hi
    end
    return a
end

recursion_quicksort(n) = qsort!(rand(n), 1, n)

# Test output
@test issorted(recursion_quicksort(5000))

# Run benchmark
write_benchmark_result("recursion_quicksort", @benchmark recursion_quicksort(5000))
