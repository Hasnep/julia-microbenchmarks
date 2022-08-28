# Microbenchmarks

## Running locally

Generate the docker compose file

```shell
python3 scripts/generate-docker-compose.py $(ls benchmarks) > docker-compose.yaml
```

Run the benchmarks

```shell
docker compose up --build
```
