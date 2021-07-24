FROM node:14

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production
# If you are building your code for production

COPY . .

EXPOSE 3000

CMD [ "node", "./app.js" ]
