using BenchmarkTools
using Test

include("utils.jl")

myabs2(z) = real(z) * real(z) + imag(z) * imag(z)

function mandel(z)
  maxiter = 80
  c = z
  for n in 0:(maxiter-1)
    if myabs2(z) > 4
      return n
    end
    z = z^2 + c
  end
  return maxiter
end

userfunc_mandelbrot() = [mandel(complex(r, i)) for i in -1.0:0.1:1.0, r in -2.0:0.1:0.5]

# Test output
@test sum(userfunc_mandelbrot()) == 14791

# Run benchmark
write_benchmark_result("userfunc_mandelbrot", @benchmark userfunc_mandelbrot())
