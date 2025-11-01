# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# RUN npm install -g nodemon

# COPY src ./src

# EXPOSE 3000

# CMD ["nodemon", "src/index.js"]

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY src ./src

EXPOSE 3000

CMD ["nodemon", "--legacy-watch", "src/index.js"]
