FROM node:12-stretch as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json  ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.12.2
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
RUN chown nginx.nginx /usr/share/nginx/html/ -R