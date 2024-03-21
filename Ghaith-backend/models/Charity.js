const { Schema } = require('mongoose')

const charitySchema = new Schema(
  {
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    longitude: String,
    latitdue: String,
    location: String,
    cr_number: String,
    donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }]
  },
  {
    timestamps: true
  }
)

module.exports = charitySchema
