require "benchmark"
require "spec"

def printfd(t)
  File.open("/dev/null", "w") do |f|
    (1..t).each do |i|
      f.print "#{i} #{i + 1}\n"
    end
  end
end

trial = Benchmark.ips do |x|
  x.report("print_to_file") { printfd(100_000) }
end
write_benchmark_result("print_to_file", trial)

# printfdperf = function(t) {
#     fd<-file("/dev/null")
#     on.exit(close(fd))
#     for (i in 1:t) {
#         s = sprintf("%d %d", i, i+1)
# 	writeLines(s, fd)
#     }
# }

# timeit("print_to_file", printfdperf, 100000)
