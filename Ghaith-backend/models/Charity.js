const { Schema } = require('mongoose')

const charitySchema = new Schema(
  {
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    logo: String,
    longitude: String,
    latitdue: String,
    googlemaplink: String,
    // location: {
    //   type: String,
    //   coordinates: [Longitude, Latitude]
    // },
    cr_number: String,
    donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }]
  },
  {
    timestamps: true
  }
)

module.exports = charitySchema
