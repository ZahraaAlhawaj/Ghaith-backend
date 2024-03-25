const { Schema } = require('mongoose')

const pickupSchema = new Schema(
  {
    date: Date,
    time: String,
    type: { type: String, enum: ['Cloth', 'Food', 'Other'], default: 'Other' },
    quantity: Number,
    urgent: { type: Boolean, default: false },
    status: { type: String, default: 'submitted' },
    charity: { type: Schema.Types.ObjectId, ref: 'Charity' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number
  },
  {
    timestamps: true
  }
)

module.exports = pickupSchema
