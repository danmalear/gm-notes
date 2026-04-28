# We use node:22 as the base for building and installing dependencies.
FROM node:22 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

ENV NODE_OPTIONS="--dns-result-order=ipv4first"

RUN npm install -g pnpm
RUN npm install -g knex

# Copy package.json and package-lock.json first to leverage Docker caching.
# If these files don't change, subsequent builds can skip 'npm install'.
COPY package*.json ./

RUN pnpm install
RUN pnpm approve-builds --all

# Copy the rest of the application source code
COPY . .

# Expose the port your app runs on
ENV PORT=3000
EXPOSE $PORT

# Run the application using the non-root user (recommended for security)
USER node

# Define the command to start your application
CMD [ "node", "src/server.ts" ]
