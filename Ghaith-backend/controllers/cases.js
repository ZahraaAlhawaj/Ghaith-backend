//user controller
const { Case } = require('../models')

const findAllCases = async (req, res) => {
  const cases = await Case.find({})
  res.send(cases)
}

const findCase = async (req, res) => {
  const cases = await Case.findById(req.params.id)
  res.send(cases)
}

const createCase = async (req, res) => {
  try {
    await Case.create(req.body)
    res.send('case cerated')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const updateCase = async (req, res) => {
  try {
    const cases = await Case.findByIdAndUpdate(req.params.id, req.body)
    res.send(cases)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const deleteCase = async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id)
    res.send('Case Deleted')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

module.exports = {
  findAllCases,
  findCase,
  createCase,
  updateCase,
  deleteCase
}
