FROM node:16.20.2-alpine
WORKDIR /app
COPY ./dist ./dist
COPY ./package.json ./package.json
RUN npm install -g pnpm && pnpm install -P

EXPOSE 3500
CMD [ "pnpm", "run", "start" ]

