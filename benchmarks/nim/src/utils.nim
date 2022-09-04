import times
import os
import strutils

proc benchmark(benchmark_name: string, n_trials: int, n_warmups: int, body) =
    var benchmark_times: seq[float] = []
    for i in countup(0, n_trials+n_warmups):
        var t0 = epochTime()
        body
        var t1 = epochTime()
        if i >= n_warmups:
            benchmark_times.add(t1 - t0)




# def benchmark(
#     f: Callable[..., Any], *arguments: Any,
# ) -> List[float]:
#     times: List[float] = []
#     for i in range(n_trials + n_warmups):
#         t1 = time.time()
#         f(*arguments)
#         t2 = time.time()
#         if i >= n_warmups:
#             times.append(t2 - t1)
#     return times


# def get_mean_time_microseconds(times: List[float]) -> float:
#     return 1_000_000 * sum(times) / len(times)


# def write_benchmark_result(benchmark_name: str, times: List[float]) -> None:
#     with open(f"/results/{benchmark_name}", "w") as f:
#         f.write(str(get_mean_time_microseconds(times)))
