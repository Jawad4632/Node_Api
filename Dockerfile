FROM node:22-alpine AS builder

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate

FROM node:22-alpine

WORKDIR /backend

COPY --from=builder /backend ./

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]