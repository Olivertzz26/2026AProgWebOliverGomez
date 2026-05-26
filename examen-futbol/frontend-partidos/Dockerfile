FROM oven/bun:1

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN bun install

COPY src ./src

EXPOSE 5173

CMD ["bun", "src/main.ts"]

