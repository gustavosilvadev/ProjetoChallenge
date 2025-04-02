# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]
# *******************************************************************************
# *******************************************************************************

# FROM node:20-alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# WORKDIR /home/node/app

# COPY package*.json ./

# USER node

# RUN npm install

# COPY --chown=node:node . .

# EXPOSE 8080

# CMD [ "node", "app.js" ]
# *******************************************************************************
# *******************************************************************************


# Use the latest LTS version of Node.js
FROM node:20-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "start"]