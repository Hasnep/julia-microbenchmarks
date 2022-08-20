def get_mean_time_microseconds(job)
  mean_n_iterations = job.items[0].mean
  return 1_000_000 * 1.0/mean_n_iterations
end

def write_benchmark_result(benchmark_name, job)
  File.open("/results/#{benchmark_name}", "w") do |f|
    f.print get_mean_time_microseconds(job)
  end
end
