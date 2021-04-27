import * as express from 'express';
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'


// OUR CUSTOM IMPORTS WILL SIT HERE
// IMPORTING OUR DIFF ROUTERS
import router from './router/router';

// CREATING OUR SEVER APP WITH EXPRESS
const app = express()
// OUR APP WILL RUN ON THE PORT GIVEN BELOW
const PORT = 8080;
// THIS STRING IS THE LINK TO OUR MONGODB
const url = 'mongodb://localhost:27017/crypto'


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie']
}

// MIDDLEWARES
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(router)


// routes
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(result => app.listen(PORT, () => console.log(`app running on port ${PORT}`)))
.catch(err => console.log(err))
