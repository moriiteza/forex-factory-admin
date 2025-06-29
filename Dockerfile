FROM docker.arvancloud.ir/node:24-alpine3.21 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN yarn install

COPY . /app

RUN npm run build

FROM docker.arvancloud.ir/nginx:1.23.4-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8005

# run nginx
CMD ["nginx", "-g", "daemon off;"]
