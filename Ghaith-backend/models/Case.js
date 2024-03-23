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
    collected_amount: { type: Number, default: 0 },
    start_date: Date,
    end_date: Date,
    donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }],
    Status: {
      type: String,
      enum: ['In Progress', 'Completed', 'Cancelled'],
      default: 'In Progress'
    }
  },
  {
    timestamps: true
  }
)

module.exports = caseSchema
