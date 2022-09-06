FROM node:16

RUN yarn global add @vue/cli . -g

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080
CMD ["yarn", "serve"]