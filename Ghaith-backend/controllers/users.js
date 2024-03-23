//user controller
const { User, Pickup, Request, Donation } = require('../models')

const findAllUsers = async (req, res) => {
  const users = await User.find({})
  res.send(users)
}

const getUserInfo = async (req, res) => {
  try {
    const userId = res.locals.payload.id
    const user = await User.findById(userId)
    const pickup = await Pickup.find({ user: userId })
    const request = await Request.find({ user: userId })
    const donation = await Donation.find({ user: userId })
    res.send({ user, pickup, request, donation })
  } catch (error) {
    console.log(error)
  }
}
const findUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.send(user)
}

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

module.exports = {
  findAllUsers,
  findUser,
  createUser,
  updateUser,
  getUserInfo
}
