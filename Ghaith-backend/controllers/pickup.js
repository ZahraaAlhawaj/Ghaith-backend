const { Pickup, User, Charity } = require('../models')

const showChairties = async (req, res) => {
  try {
    // const latitude = req.body.latitude
    // const longitude = req.body.longitude

    // const charities = await Charity.find({
    //   location: {
    //     $near: {
    //       $geometry: {
    //         type: 'Point',
    //         coordinates: [longitude, latitude]
    //       },
    //       $maxDistance: 5000
    //     }
    //   }
    // })
    const charities = await Charity.find({})
    res.send(charities)
  } catch (error) {
    console.log(error)
  }
}

const createPickupRequest = async (req, res) => {
  try {
    const newPickup = await Pickup.create(req.body)
    res.send(newPickup)
  } catch (error) {
    console.log(error)
  }
}

const updatePickupRequest = async (req, res) => {
  try {
    const pickup = Pickup.findById(req.params.pickupId)
    await pickup.updateOne(req.body)
    res.send(pickup)
  } catch (error) {
    console.log(error)
  }
}
const deletePickupRequest = async (req, res) => {
  try {
    await Pickup.findByIdAndDelete(req.params.pickupId)
    res.send({ message: 'Pickup request deleted successfully' })
  } catch (error) {
    console.log(error)
  }
}

const getPickupsByCharity = async (req, res) => {
  try {
    const userId = res.locals.payload.id
    const pickups = await Pickup.find({ 'charity.user': userId }).populate(
      'charity'
    )
    res.send(pickups)
  } catch (error) {
    console.log(error)
  }
}

const updatePickupStatus = async (req, res) => {
  try {
    const pickupId = req.params.pickupId
    const newStatus = req.body.status
    const updatedPickup = await Pickup.findById(pickupId)
    await updatedPickup.updateOne({ status: newStatus })
    res.send(updatedPickup)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  showChairties,
  createPickupRequest,
  updatePickupRequest,
  deletePickupRequest,
  getPickupsByCharity,
  updatePickupStatus
}
