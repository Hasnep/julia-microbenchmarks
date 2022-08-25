FROM docker.io/julia:1.8.0

# Install dependencies
COPY Project.toml Manifest.toml /
RUN julia --project=/ -e 'import Pkg; Pkg.instantiate()'

COPY src /src/

CMD [ "julia", "--project=/", "/src/analysis.jl" ]
