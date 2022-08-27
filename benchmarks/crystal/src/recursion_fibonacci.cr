require "benchmark"
require "spec"
require "./utils"

def recursion_fibonacci(n)
  if n < 2
    return n
  else
    return recursion_fibonacci(n - 1) + recursion_fibonacci(n - 2)
  end
end

# Test output
it "recursion_fibonacci" do
  recursion_fibonacci(20).should eq(6765)
end

# Run benchmark
trial = Benchmark.ips do |x|
  x.report("recursion_fibonacci") { recursion_fibonacci(20) }
end
write_benchmark_result("recursion_fibonacci", trial)
