// User model

const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: string,
    phone_number: String,
    password: String,
    role: String,
    longitude: String,
    latitdue: String,
    birth_date: integer
  },
  {
    timestamps: true
  }
)

module.exports = userSchema
