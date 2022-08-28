require "benchmark"
require "spec"
require "complex"

def abs2(z)
  return z.real * z.real + z.imag * z.imag
end

def mandel(z)
  maxiter = 80
  c = z
  (0...maxiter).each do |n|
    if abs2(z) > 4
      return n
    end
    z = z * z + c
  end
  return maxiter
end

def userfunc_mandelbrot
  r1 = ((0...26).each.map { |i| -2.0 + 0.1 * i }).to_a
  r2 = ((0...21).each.map { |i| -1.0 + 0.1 * i }).to_a
  return r1.each_cartesian(r2).map { |real, imag| mandel(Complex.new(real, imag)) }
end

# Test output
it "userfunc_mandelbrot" do
  userfunc_mandelbrot().sum(0).should eq(14791)
end

# Run benchmark
trial = Benchmark.ips do |x|
  x.report("userfunc_mandelbrot") { userfunc_mandelbrot() }
end
write_benchmark_result("userfunc_mandelbrot", trial)
