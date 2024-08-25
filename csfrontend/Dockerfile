# csfrontend/Dockerfile

# Use the official Node.js image as the base image
FROM node:18-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React app
RUN npm run build

# Use an Nginx image to serve the built application
FROM nginx:alpine

# Copy the custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the React app build output to the appropriate directory in Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
