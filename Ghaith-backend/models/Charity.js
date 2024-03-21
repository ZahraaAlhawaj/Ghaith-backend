const { Schema } = require('mongoose')

const charitySchema = new Schema(
  {
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    googlemaplink: String,
    location: {
      type: Point,
      coordinates: [longitude, latitdue]
    },
    cr_number: String,
    donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }]
  },
  {
    timestamps: true
  }
)

module.exports = charitySchema
