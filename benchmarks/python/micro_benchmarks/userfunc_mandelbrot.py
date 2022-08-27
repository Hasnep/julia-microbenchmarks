from micro_benchmarks.utils import benchmark, write_benchmark_result


def abs2(z: complex):
    return z.real * z.real + z.imag * z.imag


def mandel(z: complex) -> int:
    maxiter = 80
    c = z
    for n in range(maxiter):
        if abs2(z) > 4:
            return n
        z = z * z + c
    return maxiter


def userfunc_mandelbrot():
    r1 = [-2.0 + 0.1 * i for i in range(26)]
    r2 = [-1.0 + 0.1 * i for i in range(21)]
    return [mandel(complex(r, i)) for r in r1 for i in r2]


# Test output
assert sum(userfunc_mandelbrot()) == 14791

# Run benchmark
write_benchmark_result(
    "userfunc_mandelbrot", benchmark(userfunc_mandelbrot, n_trials=1000, n_warmups=500)
)
