// User model

const { Schema } = require('mongoose')

const requestSchema = new Schema(
  {
    title: String,
    description: String,
    family_member: Number,
    salary: Number,
    expected_amount: Number,
    type: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    charity: { type: Schema.Types.ObjectId, ref: 'Charity' },
    document: String,
    status: String
  },
  {
    timestamps: true
  }
)

module.exports = requestSchema
