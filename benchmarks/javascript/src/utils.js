import { writeFileSync } from "node:fs";

export const range = (n) => Array.from(Array(n).keys());

export const sum = (arr) => arr.reduce((a, b) => a + b, 0);

export const benchmark = (f, args, n_trials, n_warmups) => {
  let times = [];
  for (let i = 0; i < n_trials + n_warmups; i++) {
    let t1 = new Date().getTime();
    f(...args);
    let t2 = new Date().getTime();
    if (i >= n_warmups) {
      times.push(t2 - t1);
    }
  }
  return times;
};

export const get_mean_time_microseconds = (times) =>
  1_000_000 * (sum(times) / times.length);

export const write_benchmark_result = (benchmark_name, times) => {
  let mean_time_microseconds = get_mean_time_microseconds(times).toString();
  console.log(`${benchmark_name}: ${mean_time_microseconds}`);
  writeFileSync(`/results/${benchmark_name}`, mean_time_microseconds);
};
