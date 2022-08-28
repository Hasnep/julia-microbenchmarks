FROM docker.io/crystallang/crystal:1.5.0

# Install dependencies
COPY shard.yml shard.lock /
RUN shards install

# Build binary
COPY src /src/
RUN shards build --release

CMD [ "/bin/run_benchmarks" ]
