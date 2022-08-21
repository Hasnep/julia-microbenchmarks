from micro_benchmarks.utils import benchmark, write_benchmark_result


def iteration_pi_sum(n: int) -> float:
    return sum([1.0 / (k * k) for k in range(1, n + 1)])


# Test output
assert abs(iteration_pi_sum(10_000) - 1.644834071848065) < 1e-12

# Run benchmark
times = benchmark(iteration_pi_sum, 10_000, n_trials=1000, n_warmups=100)
write_benchmark_result("iteration_pi_sum", times)
