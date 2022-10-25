FROM node:12-buster-slim AS base
RUN apt-get update && apt-get install --no-install-recommends --yes openssl
WORKDIR /app

### BUILDER ###
FROM base AS builder

# Install production dependencies
COPY *.json yarn.lock ./

# Install all dependencies
RUN yarn install --ignore-engines

# Copy source files
COPY node_modules/ ./node_modules/
COPY public/ ./public/
COPY src/ ./src/ 

EXPOSE 3000

CMD ["yarn", "start"]

# # Build
# RUN yarn build

# # ### RUNNER ###
# FROM base
# WORKDIR /app
# COPY package.json ./
# RUN yarn install --ignore-engines

# # Copy runtime dependencies
# COPY --from=builder /app/build ./build
# COPY public/ ./public/
# COPY node_modules/ ./node_modules/
# COPY src/ ./src/

# EXPOSE 3000

# CMD ["yarn", "start"]

