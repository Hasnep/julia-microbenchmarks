function write_benchmark_result(benchmark_name, trial)
    mean_time_microseconds = get_mean_time_microseconds(trial);
    disp(sprintf('%s: %s', benchmark_name, mean_time_microseconds));
    [f, errmsg] = fopen(sprintf('/results/%s', benchmark_name), 'w');
    if f == -1
    error(errmsg)
    end
    fprintf(f, '%s', mean_time_microseconds);
    fclose(f);
end
