const { Schema } = require('mongoose')

const caseSchema = new Schema(
  {
    code: String,
    image: String,
    name: String,
    description: String,
    charity: { type: Schema.Types.ObjectId, ref: 'Charity' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    total_amount: Number,
    collected_amount: Number,
    start_date: Date,
    end_date: Date,
    donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }],
    Status: String
  },
  {
    timestamps: true
  }
)

module.exports = caseSchema
