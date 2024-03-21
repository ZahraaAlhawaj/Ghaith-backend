const { Schema } = require('mongoose')

const donationSchema = new Schema(
  {
    amount: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

module.exports = donationSchema
