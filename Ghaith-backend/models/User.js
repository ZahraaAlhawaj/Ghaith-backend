// User model

const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: String,
    phone_number: String,
    passwordDigest: String,
    role: String,
    longitude: String,
    latitdue: String,
    birth_date: Number
  },
  {
    timestamps: true
  }
)

module.exports = userSchema
