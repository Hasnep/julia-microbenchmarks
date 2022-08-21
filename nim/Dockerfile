FROM docker.io/nimlang/nim:1.6.6

# Copy dependencies
COPY micro_benchmarks.nimble /

# Build binary
COPY src /src/
RUN nimble build --accept

CMD [ "/dist/run_benchmarks" ]
