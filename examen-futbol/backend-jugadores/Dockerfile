FROM oven/bun:1

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN bun install

COPY src ./src

EXPOSE 3002

CMD ["bun", "src/main.ts"]
