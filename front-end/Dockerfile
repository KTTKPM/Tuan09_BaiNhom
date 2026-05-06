FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM base AS build-env
COPY . .
RUN npm run build

FROM base AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS production
WORKDIR /app
COPY --from=build-env /app/build ./build
COPY package.json package-lock.json ./
EXPOSE 3000
CMD ["npm", "run", "start"]