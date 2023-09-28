FROM node:16.17.0-alpine
WORKDIR /app
COPY ./dist ./dist
COPY ./config ./config
COPY ./package.json ./package.json
RUN npm install -g pnpm && pnpm install -P

EXPOSE 3500
CMD [ "npm", "run", "start" ]

