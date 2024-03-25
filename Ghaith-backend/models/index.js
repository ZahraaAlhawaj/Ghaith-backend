const mongoose = require('mongoose')

const userSchema = require('./User')
const caseSchema = require('./Case')
const charitySchema = require('./Charity')
const categorySchema = require('./Category')
const donationSchema = require('./Donation')
const pickupSchema = require('./Pickup')
const requestSchema = require('./Request')
const eventSchema = require('./Event')

const User = mongoose.model('User', userSchema)
const Case = mongoose.model('Case', caseSchema)
const Charity = mongoose.model('Charity', charitySchema)
const Category = mongoose.model('Category', categorySchema)
const Donation = mongoose.model('Donation', donationSchema)
const Pickup = mongoose.model('Pickup', pickupSchema)
const Request = mongoose.model('Request', requestSchema)
const Event = mongoose.model('Event', eventSchema)

module.exports = {
  User,
  Case,
  Category,
  Charity,
  Donation,
  Pickup,
  Request,
  Event
}
