require "benchmark"
require "spec"

def iteration_pi_sum(n)
  return ((1..n).map { |k| 1.0 / (k*k) }).sum
end

# Test output
it "iteration_pi_sum" do
  ((iteration_pi_sum(10_000) - 1.644834071848065).abs < 1e-12).should be_true
end

# Run benchmark
trial=Benchmark.ips do |x|
  x.report("iteration_pi_sum") { iteration_pi_sum(10_000) }
end
write_benchmark_result("iteration_pi_sum",trial)
