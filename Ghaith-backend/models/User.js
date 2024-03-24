// User model

const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: String,
    phone_number: String,
    passwordDigest: String,
    role: {
      type: String,
      enum: ['Super Admin', 'Admin', 'User'],
      default: 'User'
    },
    longitude: String,
    latitdue: String,
    birth_date: Date
  },
  {
    timestamps: true
  }
)

module.exports = userSchema
