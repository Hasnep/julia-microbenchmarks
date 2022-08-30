import time
from collections.abc import Callable
from typing import Any, List


def benchmark(
    f: Callable[..., Any], *arguments: Any, n_trials: int, n_warmups: int
) -> List[float]:
    times: List[float] = []
    for i in range(n_trials + n_warmups):
        t1 = time.time()
        f(*arguments)
        t2 = time.time()
        if i >= n_warmups:
            times.append(t2 - t1)
    return times


def get_mean_time_microseconds(times: List[float]) -> float:
    return 1_000_000 * sum(times) / len(times)


def write_benchmark_result(benchmark_name: str, times: List[float]) -> None:
    mean_time_microseconds = str(get_mean_time_microseconds(times))
    print(f"{benchmark_name}: {mean_time_microseconds}")
    with open(f"/results/{benchmark_name}", "w") as f:
        f.write(mean_time_microseconds)
