FROM oven/bun:canary-alpine AS base

WORKDIR /app
COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile --production
COPY . .
# RUN bun run build

# FROM oven/bun:canary-alpine AS release

# WORKDIR /app
# COPY --from=base /app/node_modules /app/node_modules
# COPY --from=base /app/package.json /app
# COPY --from=base /app/build /app

EXPOSE 3000

CMD ["bun", "start"]
# CMD ["bun", "run", "index.js"]
