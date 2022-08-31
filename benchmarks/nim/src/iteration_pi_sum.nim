func iteration_pi_sum(n: int): float =
    var s = 0.0
    for k in countup(1, n):
        s = s + 1.0 / float(k*k)
    return s

# Test output
doAssert abs(iteration_pi_sum(10_000) - 1.644834071848065) < 1e-12

# Run benchmark
benchmark_times = benchmark("iteration_pi_sum", n_trials = 1000,   n_warmups = 100):
    iteration_pi_sum(10_000)
write_benchmark_result("iteration_pi_sum", benchmark_times)
