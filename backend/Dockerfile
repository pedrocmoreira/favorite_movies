FROM node:20-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD npx prisma migrate dev && npm run dev

EXPOSE 3333
