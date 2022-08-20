get_mean_time_microseconds(trial) = mean(trial).time / 1000

function write_benchmark_result(benchmark_name, trial)
    open("/results/$benchmark_name", "w") do f
        print(f, get_mean_time_microseconds(trial))
    end
end
