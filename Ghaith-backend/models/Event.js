const { Schema } = require('mongoose')

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    // date: { type: Date, required: true },
    requiredVolunteers: { type: Number, required: true },
    remainigVolunteers: Number,
    volunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

module.exports = eventSchema
