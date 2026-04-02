# We use node:22 as the base for building and installing dependencies.
FROM node:22 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# RUN --mount=type=secret,id=NODE_ENV \
#     NODE_ENV="$(cat /run/secrets/NODE_ENV)"

# Copy package.json and package-lock.json first to leverage Docker caching.
# If these files don't change, subsequent builds can skip 'npm install'.
COPY package.json .
COPY pnpm-lock.yaml .

RUN npm i -g pnpm@latest-10
RUN npm i -g serve

# Install dependencies including TypeScript
RUN pnpm install

# Copy the rest of the application source code
COPY . .

RUN pnpm run build

# Expose the port your app runs on
ENV PORT=5173
EXPOSE $PORT

# Run the application using the non-root user (recommended for security)
USER node

# Define the command to start your application
CMD [ "serve", "-s", "dist" ]
