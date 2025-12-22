FROM node:24-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Build the project
RUN yarn build

# Expose port
EXPOSE 3000

# Start BrowserSync
CMD ["yarn", "serve"]
