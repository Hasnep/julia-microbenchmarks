function times = benchmark(f, n)
    n_warmups = 1;
    n_trials = 10;
    times = zeros(n_trials, 1);
    for i = 1:(n_warmups+n_trials)
        tic();
        f(n);
        times(i) = toc();
    end
    times = times((n_warmups+1):end);
end
