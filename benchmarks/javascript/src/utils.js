import { writeFileSync } from "node:fs";

export const range = (n) => Array.from(Array(n).keys());

export const sum = (arr) => arr.reduce((a, b) => a + b, 0);

export const benchmark = (f, args, nTrials, nWarmups) => {
  let times = [];
  for (let i = 0; i < nTrials + nWarmups; i++) {
    let t1 = new Date().getTime();
    f(...args);
    let t2 = new Date().getTime();
    if (i >= nWarmups) {
      times.push(t2 - t1);
    }
  }
  return times;
};

export const getMeanTimeMicroseconds = (times) =>
  1_000_000 * (sum(times) / times.length);

export const writeBenchmarkResult = (benchmarkName, times) => {
  let meanTimeMicroseconds = getMeanTimeMicroseconds(times).toString();
  console.log(`${benchmarkName}: ${meanTimeMicroseconds}`);
  writeFileSync(`/results/${benchmarkName}`, meanTimeMicroseconds);
};
