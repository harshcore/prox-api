FROM node:20-slim

#Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY . ./
 # INSTALL NPM
RUN npm install 
  # && \
  # npm -v && \
  # npm install -g
CMD ["npm", "start"]
