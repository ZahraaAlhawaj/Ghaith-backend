const { Schema } = require('mongoose')

const requestSchema = new Schema(
  {
    title: String,
    description: String,
    family_member: Number,
    salary: Number,
    expected_amount: Number,
    expected_date: Date,
    type: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    charity: { type: Schema.Types.ObjectId, ref: 'Charity' },
    document: String,
    status: { type: String, default: 'Not Selected' } //Not Selected , Selected , Approved , Rejected
  },
  {
    timestamps: true
  }
)

module.exports = requestSchema
