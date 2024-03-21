//user controller
const { User } = require('../models')

const findAllUsers = async (req, res) => {
  const users = await User.find({})
  res.send(users)
}

const findUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.send(user)
}

const createUser = async (req, res) => {
  try {
    await User.create(req.body)
    res.send('user cerated')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

module.exports = {
  findAllUsers,
  findUser,
  createUser,
  updateUser
}
