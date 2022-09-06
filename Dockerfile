FROM node:16

RUN yarn global add http-server @vue/cli

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080
CMD ["http-server", "dist"]