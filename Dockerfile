# Use Node.js 14 LTS (Long Term Support) version
FROM node:14

# Create app directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD [ "node", "server.js" ]
