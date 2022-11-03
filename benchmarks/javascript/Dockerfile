FROM docker.io/node:18.7.0

WORKDIR /microbenchmark

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY src src/

CMD [ "node", "src/run_benchmarks.js" ]
