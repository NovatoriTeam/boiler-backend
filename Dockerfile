FROM --platform=linux/amd64 node:21 as build
WORKDIR /app
COPY package*.json ./
COPY .husky/install.mjs .husky/
RUN npm install
COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:21

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV NODE_OPTIONS='--max_old_space_size=8192'
ENV HUSKY=0

WORKDIR /app
COPY package.json ./
COPY .husky/install.mjs .husky/
RUN npm install --only=production
COPY --from=build /app/dist ./dist
EXPOSE 3001
CMD npm run start:prod

