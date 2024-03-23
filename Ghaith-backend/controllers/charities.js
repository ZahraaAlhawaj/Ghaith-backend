//user controller
const { Charity } = require('../models')

const findAllCharities = async (req, res) => {
  try {
    const charities = await Charity.find({})
    res.send(charities)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const findCharity = async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id)
      .populate('donations')
      .populate('user')
    res.send(charity)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const createCharity = async (req, res) => {
  try {
    const charity = await Charity.create(req.body)
    res.send(charity)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const updateCharity = async (req, res) => {
  try {
    const charity = await Charity.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.send(charity)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const deleteCharity = async (req, res) => {
  try {
    await Charity.findByIdAndDelete(req.params.id)
    res.status(200).send('Charity Deleted Successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

module.exports = {
  findAllCharities,
  findCharity,
  updateCharity,
  deleteCharity,
  createCharity
}
