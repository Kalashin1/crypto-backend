const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
require('dotenv').config()


import { getUser } from './controllers/auth/validate-user'


// OUR CUSTOM IMPORTS WILL SIT HERE

// IMPORTING OUR DIFF ROUTERS
import { router } from './router/router';

// IMPORTING TRANSACTION ROUTER
import { router as transactionRouter } from './router/transaction-router'


// CREATING OUR SEVER APP WITH EXPRESS
const app = express()
// OUR APP WILL RUN ON THE PORT GIVEN BELOW
const PORT = 3000;
// THIS STRING IS THE LINK TO OUR MONGODB
// const url = 'mongodb://localhost:27017/crypto' //



const url = 'mongodb+srv://kalashin:Kalashin1@cluster0.4umw1.gcp.mongodb.net/crypto?retryWrites=true&w=majority'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

const corsOptions = {
  origin: ['https://legatoex-zp4banx7ka-uc.a.run.app', 'http://localhost:3000'],
  credentials: true,
  exposedHeaders: ['set-cookie']
}

// MIDDLEWARES
app.use(cors(corsOptions))
//  COOKIE PARSER
app.use(cookieParser())
// JSON PARSER
app.use(express.json())
// AUTH ROUTER
app.use(router)
// TRANSACTION ROUTER
app.use(transactionRouter)
// PUBLIC FOLDER
app.use(express.static('public'))


// routes
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(_result => app.listen(process.env.PORT || PORT, () => console.log(`app running on port ${process.env.PORT || PORT}`)))
.catch(err => console.log(err))


app.get('/user', getUser)
