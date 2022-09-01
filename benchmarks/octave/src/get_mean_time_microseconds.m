function mean_time_microseconds = get_mean_time_microseconds(trial)
    mean_time_microseconds = num2str(mean(trial)*1_000_000);
end
