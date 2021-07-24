FROM node:14

WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --only=production
# If you are building your code for production

COPY . .

RUN npm run compile

EXPOSE 3000

<<<<<<< HEAD
CMD [ "node", "app.js" ]
=======
CMD [ "node", "./app.js" ]
>>>>>>> c5579ed5f2b384f32c3e268f1ff1ce98f76f9c4c
