const { Schema } = require('mongoose')

const categorySchema = new Schema(
  {
    name: String,
    cases: [{ type: Schema.Types.ObjectId, ref: 'Case' }]
  },
  {
    timestamps: true
  }
)

module.exports = categorySchema
