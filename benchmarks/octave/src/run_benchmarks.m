% iteration_pi_sum;
% matrix_multiply;
% matrix_statistics;
% parse_integers;
% print_to_file;
% recursion_fibonacci;
% recursion_quicksort;
% userfunc_mandelbrot;
% perf;

% recursion_fibonacci

% Test output
assert(recursion_fibonacci(20) == 6765)

% Run benchmark
write_benchmark_result("recursion_fibonacci", benchmark(@recursion_fibonacci, 20))
