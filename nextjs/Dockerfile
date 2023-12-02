FROM node:19-alpine AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:19-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

FROM node:19-alpine AS deploy

WORKDIR /app

ENV NODE_ENV production

COPY public ./public
COPY package.json ./package.json
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY --from=build /app/node_modules/next/dist/compiled/jest-worker ./node_modules/next/dist/compiled/jest-worker
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]