FROM node:14.16.1-alpine
WORKDIR /app
COPY package.json package-lock.json webpack.mix.js ./
RUN npm install
COPY . ./
RUN npm run prod --unsafe
