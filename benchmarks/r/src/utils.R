require(compiler)

benchmark <- function(  f, ..., n_trials,n_warmups) {
    # Compile the function before benchmarking
    f_jitted = cmpfun(f)
    times<-[]
    for (i in 1:(n_warmups+n_trials)) {
        t = system.time(f(...))["elapsed"]
        if (i>n_warmups){
        append(times,t)
        }
    }
   return(times)
}

get_mean_time_microseconds <- function(times) {
return(1000000 * mean(times))
}

 write_benchmark_result <- function(benchmark_name,times) {
     mean_time_microseconds = get_mean_time_microseconds(times)
     print(sprintf("%s: %f",benchmark_name,mean_time_microseconds))
 }

# def write_benchmark_result(benchmark_name: str, times: List[float]) -> None:
#     mean_time_microseconds = str(get_mean_time_microseconds(times))
#     print(f"{benchmark_name}: {mean_time_microseconds}")
#     with open(f"/results/{benchmark_name}", "w") as f:
#         f.write(mean_time_microseconds)
