require "benchmark"
require "spec"
require "matrix"

def matrix_multiply(n)
  a = Matrix.new(n, n) { rand() }
  b = Matrix.new(n, n) { rand() }
  return a * b
end

# Test output
it "matrix_multiply" do
  (matrix_multiply(1000)[0] >= 0).should be_true
end

# Run benchmark
trial = Benchmark.ips do |x|
  x.report("matrix_multiply") { matrix_multiply(1000) }
end
write_benchmark_result("matrix_multiply", trial)
