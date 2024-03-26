const { Schema } = require('mongoose')

const charitySchema = new Schema(
  {
    name: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    logo: String,
    googlemaplink: String,
    googlemaplink: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: false
      },
      coordinates: {
        type: [Number],
        required: false
      }
    },
    cr_number: String,
    donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }],
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Inactive'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
)

// Add the geospatial index
charitySchema.index({ location: '2dsphere' })

module.exports = charitySchema
