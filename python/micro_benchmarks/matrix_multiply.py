from micro_benchmarks.utils import benchmark, write_benchmark_result

import numpy as np


def matrix_multiply(n: int):
    return np.random.rand(n, n) @ np.random.rand(n, n)


# Test output
assert matrix_multiply(1000)[0, 0] >= 0

# Run benchmark
write_benchmark_result(
    "matrix_multiply", benchmark(matrix_multiply, 1000, n_trials=1000, n_warmups=500)
)
