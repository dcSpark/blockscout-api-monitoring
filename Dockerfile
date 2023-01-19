FROM node:16.19.0-alpine


# Create app directory
WORKDIR /app


COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

RUN chmod 755 ./entrypoint.sh

EXPOSE 6060

ENTRYPOINT ["./entrypoint.sh"]
