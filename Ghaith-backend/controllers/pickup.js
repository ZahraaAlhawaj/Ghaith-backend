const { Pickup, User } = require('../models')

const showChairties = (req, res) => {
  try {
    const userLatitude = req.body
    const userLongitude = req.body
    const userId = res.locals.payload.id //from Token :
    User.findOne({ _id: userId })

    const charities = Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [userLongitude, userLatitude]
          },
          $maxDistance: 5000
        }
      }
    })
    res.send(charities)
  } catch (error) {
    console.log(error)
  }
}

const createPickupRequest = (req, res) => {
  try {
    const newPickup = Pickup.create(req.body)
    res.send(newPickup)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  showChairties,
  createPickupRequest
}
