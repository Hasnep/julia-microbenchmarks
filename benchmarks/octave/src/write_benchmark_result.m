function write_benchmark_result(benchmark_name, trial)
mean_time_microseconds = get_mean_time_microseconds(trial);
disp(sprintf('%s: %s',benchmark_name,mean_time_microseconds));
f = fopen(sprintf('/results/%s',benchmark_name), 'w');
% fprintf(f, '%s', mean_time_microseconds);
fclose(f);
end
