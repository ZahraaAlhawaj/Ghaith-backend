//user controller
const { Case } = require('../models')

const findAllCases = async (req, res) => {
  const cases = await Case.find({})
  res.send(cases)
}

const findCase = async (req, res) => {
  const cases = await Case.findById(req.params.id)
    .populate('charity')
    .populate('category')
    .populate('donations')
  res.send(cases)
}

const findCharityCases = async (req, res) => {
  const cases = await Case.find({})
  let allCases = []
  for (let i = 0; i < cases.length; i++) {
    if (cases[i].charity == req.params.id) {
      allCases.push(cases[i])
    }
  }
  res.send(allCases)
  //const charityId = cases.charity._id
}

const findUrgentCases = async (req, res) => {
  try {
    const currentDate = new Date()
    const twoDaysFromNow = new Date()
    twoDaysFromNow.setDate(currentDate.getDate() + 2)

    const urgentCases = await Case.find({
      start_date: { $lte: currentDate },
      end_date: { $gte: currentDate, $lte: twoDaysFromNow },
      total_amount: { $gt: 0, $gte: 1000 },
      collected_amount: { $lt: total_amount * 0.5 }
    })
      .sort({ total_amount: -1 })
      .limit(10)
    res.send(urgentCases)
  } catch (error) {
    console.log(error)
  }
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
  deleteCase,
  findUrgentCases,
  findCharityCases
}
