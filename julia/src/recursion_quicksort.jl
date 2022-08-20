# require "benchmark"
# require "spec"

# def recursion_quicksort(a, lo, hi)
#   i, j = lo, hi
#   while i < hi
#     pivot = a[(lo + hi)//2]
#     while i <= j
#       while a[i] < pivot
#         i += 1
#       end
#       while a[j] > pivot
#         j -= 1
#       end
#       if i <= j
#         a[i], a[j] = a[j], a[i]
#         i += 1
#         j -= 1
#       end
#     end
#     if lo < j
#       recursion_quicksort(a, lo, j)
#     end
#     lo, j = i, hi
#   end
#   return a
# end

# def recursion_quicksort_perf
#   v = Array.new(5000) { rand() }
#   return recursion_quicksort(v, 0, v.size - 1)
# end

# # Test output
# it "recursion_quicksort" do
#   x = recursion_quicksort_perf()
#   x.should eq(x.sort)
# end

# # Run benchmark
# Benchmark.ips do |x|
#   x.report("recursion_quicksort") { recursion_quicksort_perf() }
# end



# function qsort!(a,lo,hi)
#     i, j = lo, hi
#     while i < hi
#         pivot = a[(lo+hi)>>>1]
#         while i <= j
#             while a[i] < pivot; i += 1; end
#             while a[j] > pivot; j -= 1; end
#             if i <= j
#                 a[i], a[j] = a[j], a[i]
#                 i, j = i+1, j-1
#             end
#         end
#         if lo < j; qsort!(a,lo,j); end
#         lo, j = i, hi
#     end
#     return a
# end

# sortperf(n) = qsort!(rand(n), 1, n)
# Test.@test issorted(sortperf(5000))
# @timeit sortperf(5000) "recursion_quicksort" "Sorting of random numbers using quicksort"

 