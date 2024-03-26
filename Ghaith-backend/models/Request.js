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
    status: {
      type: String,
      enum: ['Not Selected', 'Selected'],
      default: 'Not Selected'
    },
    case_code: String
  },
  {
    timestamps: true
  }
)

module.exports = requestSchema
