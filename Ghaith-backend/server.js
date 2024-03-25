var createError = require('http-errors')
var express = require('express')
var path = require('path')
const cors = require('cors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()

require('./config/database')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const charitiesRouter = require('./routes/charities')
const categoriesRouter = require('./routes/categories')
const casesRouter = require('./routes/cases')
const authRouter = require('./routes/auth')
const donationsRouter = require('./routes/donations')
const pickupRouter = require('./routes/pickup')
const requestRouter = require('./routes/requests')
const eventsRouter = require('./routes/events')
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/charities', charitiesRouter)
app.use('/categories', categoriesRouter)
app.use('/cases', casesRouter)
app.use('/donations', donationsRouter)
app.use('/pickup', pickupRouter)
app.use('/request', requestRouter)
app.use('/events', eventsRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
