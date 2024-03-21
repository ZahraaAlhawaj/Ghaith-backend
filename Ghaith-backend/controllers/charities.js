//user controller
const { Charity } = require('../models')

const findAllCharities = async (req, res) => {
  const charities = await Charity.find({})
  if (charities) {
    console.log('hi')
  } else {
    console.log('not found')
  }
  res.send(charities)
}

const findCharity = async (req, res) => {
  const charity = await Charity.findById(req.params.id)
    .populate('donations')
    .populate('user')
  res.send(charity)
}

// const createCharity = async (req, res) => {
//   try {
//     await Charity.create(req.body)
//     res.send('charity cerated')
//   } catch (error) {
//     console.log(error)
//     res.status(500).send({ errorMsg: error.message })
//   }
// }

const updateCharity = async (req, res) => {
  try {
    const charity = await Charity.findByIdAndUpdate(req.params.id, req.body)
    res.send('charity updated')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const deleteCharity = async (req, res) => {
  try {
    await Charity.findByIdAndDelete(req.params.id)
    res.send('Charity Deleted')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

module.exports = {
  findAllCharities,
  findCharity,
  updateCharity,
  deleteCharity
}
