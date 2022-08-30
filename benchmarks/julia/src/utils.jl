get_mean_time_microseconds(trial) = mean(trial).time / 1000

function write_benchmark_result(benchmark_name, trial)
    mean_time_microseconds = get_mean_time_microseconds(trial)
    println(f, "$benchmark_name: $mean_time_microseconds")
    open("/results/$benchmark_name", "w") do f
        print(f, mean_time_microseconds)
    end
end
