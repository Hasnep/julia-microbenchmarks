FROM docker.io/python:3.10.6

# Create virtual environment
RUN python -m venv /venv/

# Install dependencies
COPY requirements.txt /
RUN /venv/bin/python -m pip install -r /requirements.txt

COPY micro_benchmarks /micro_benchmarks/

CMD [ "/venv/bin/python", "-m", "micro_benchmarks" ]
