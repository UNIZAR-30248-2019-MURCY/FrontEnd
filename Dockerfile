FROM node:12 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm install --silent
RUN npm install npm install expo-cli --global
RUN expo build:web

FROM nginx:1.16.0-alpine
COPY --from=build /app/web-build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
