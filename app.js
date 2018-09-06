require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const flash = require('connect-flash')
const fileUpload = require("express-fileupload")
const axios = require('axios');
const resetInterval = require("./resetinterval/resetinterval");

mongoose.Promise = Promise
mongoose
    .connect(
        process.env.MONGODB_URI,
        { useMongoClient: true }
    )
    .then(() => {
        console.log('Connected to Mongo!')
        setInterval(resetInterval, 1200000)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    })

const app_name = require('./package.json').name
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express()

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(flash())

app.use(
    session({
        secret: 'our-passport-local-strategy-app',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 99999999999 }),
    })
)

require('./utils/passport')

app.use(passport.initialize())
app.use(passport.session())

// Express View engine setup



app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use("/arcade", express.static(path.join(__dirname, 'arcade')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator'

/* console.log("session", passport)
app.locals.username = 'Morpheus' */


const index = require('./routes/index')
app.use('/', index)

const auth = require('./routes/auth')
app.use('/auth', auth)

module.exports = app

app.listen(3000)