using Chain
using DataFrames
using CairoMakie
using AlgebraOfGraphics

languages = ["python", "julia", "c", "crystal", "go", "javascript", "lua", "nim", "octave", "r", "zig"]
benchmarks = [
    "print_to_file",
    "userfunc_mandelbrot",
    "iteration_pi_sum",
    "matrix_multiply",
    "recursion_fibonacci",
    "matrix_statistics",
    "parse_integers",
    "recursion_quicksort",
]


function read_benchmark(language, benchmark)
    file_path = joinpath(pwd(), "..", "results", language, benchmark)
    time = isfile(file_path) ? open(f -> parse(Float32, String(read(f))), file_path, "r") : missing
    return (language = language, benchmark = benchmark, time = time)
end

df = @chain begin
    DataFrame(read_benchmark(language, benchmark) for language in languages for benchmark in benchmarks)
    subset(:time => ByRow(!ismissing))
    groupby(:benchmark)
    transform([:language, :time] => ((ls, ts) -> ts ./ ts[ls .== "julia"]) => :time_normalised)
end

@chain df begin
    data(_) * mapping(:language, :time_normalised => log10, color = :benchmark)
    draw(axis = (width = 225, height = 225))
    save("benchmarks.png", _)
end
