const { Schema } = require('mongoose')

const charitySchema = new Schema(
  {
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    logo: String,
    googlemaplink: String,
    // location: {
    //   type: {
    //     type: String,
    //     enum: ['Point'],
    //     default: 'Point' // Set the default value to 'Point'
    //   },
    //   coordinates: {
    //     type: [Number]
    //   }
    // },
    // cr_number: String,
    donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }]
  },
  {
    timestamps: true
  }
)

// Add the geospatial index
charitySchema.index({ location: '2dsphere' })

module.exports = charitySchema
