using Chain: @chain
using DataFrames
using CairoMakie
using AlgebraOfGraphics

read_benchmark_result(file_path) = open(f -> parse(Float32, String(read(f))), file_path, "r")

read_benchmark_results(benchmarks_folder) = DataFrame(
    (
        language=language,
        benchmark=benchmark_name,
        time=read_benchmark_result(joinpath(benchmarks_folder, language, benchmark_name)),
    ) for language in readdir(benchmarks_folder) for
    benchmark_name in readdir(joinpath(benchmarks_folder, language))
)


function plot_benchmarks(df)
    @chain df begin
        data(_) * mapping(:language, :time_normalised, color=:benchmark)
        draw(axis=(width=225, height=225, yscale=log10))
    end
end

function main()
    results_folder = ARGS[1]
    output_directory = ARGS[2]
    mkpath(output_directory)

    df = @chain begin
        read_benchmark_results(results_folder)
        groupby(:benchmark)
        transform([:language, :time] => ((ls, ts) -> ts ./ ts[ls .== "julia"]) => :time_normalised)
    end

    p = plot_benchmarks(df)
    save(joinpath(output_directory, "benchmarks.png"), p)
end

main()
