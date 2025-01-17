FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .

RUN mpn ci
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]