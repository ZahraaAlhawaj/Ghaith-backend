const { Schema } = require('mongoose')

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    location: String,
    description: { type: String, required: true },
    date: Date,
    time: String,
    image: String,
    requiredVolunteers: { type: Number, required: true },
    volunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
)

module.exports = eventSchema
