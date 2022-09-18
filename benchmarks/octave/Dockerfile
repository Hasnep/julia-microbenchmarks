FROM docker.io/matpower/octave:7.2.0

WORKDIR /
COPY src .

USER root
ENTRYPOINT [ "octave" ]
CMD [ "run_benchmarks.m" ]
