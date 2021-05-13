import * as express from 'express';
import * as mongoose from 'mongoose'
import * as cookieParser from 'cookie-parser'
import * as path from 'path'


import { getUser } from './controllers/auth/validate-user'


// OUR CUSTOM IMPORTS WILL SIT HERE

// IMPORTING OUR DIFF ROUTERS
import { router } from './router/router';

// IMPORTING TRANSACTION ROUTER
import { router as transactionRouter } from './router/transaction-router'

// IMPORTING OFFER ROUTER
import { router as offerRouter } from './router/offer-router'

// CREATING OUR SEVER APP WITH EXPRESS
const app = express()
// OUR APP WILL RUN ON THE PORT GIVEN BELOW
const PORT = 3000;
// THIS STRING IS THE LINK TO OUR MONGODB
const url = 'mongodb://localhost:27017/crypto' //



// const url = 'mongodb+srv://kalashin:Kalashin1@cluster0.4umw1.gcp.mongodb.net/crypto?retryWrites=true&w=majority'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   exposedHeaders: ['set-cookie']
// }

// MIDDLEWARES
//  COOKIE PARSER
app.use(cookieParser())
// JSON PARSER
app.use(express.json())
// AUTH ROUTER
app.use(router)
// TRANSACTION ROUTER
app.use(transactionRouter)
// OFFER ROUTER
app.use(offerRouter)
// PUBLIC FOLDER
app.use(express.static('public'))


// routes
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(result => app.listen(process.env.PORT || PORT, () => console.log(`app running on port ${process.env.PORT || PORT}`)))
.catch(err => console.log(err))


app.get('/user', getUser)
