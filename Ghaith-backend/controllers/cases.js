//user controller
const { Case, Donation } = require('../models')

const findAllCases = async (req, res) => {
  try {
    const cases = await Case.find({})
    res.send(cases)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const findCase = async (req, res) => {
  try {
    const cases = await Case.findById(req.params.id)
      .populate('charity')
      .populate('category')
      .populate('donations')
    res.send(cases)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const findCharityCases = async (req, res) => {
  try {
    const cases = await Case.find({ charity: req.params.id })
    res.send(cases)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
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
    res.status(500).send({ errorMsg: error.message })
  }
}

const findStatistics = async (req, res) => {
  const cases = await Case.findById(req.params.id)
  let numberOfDonations
  let lastDonation
  let numberOfDays

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`
    return new Date(formattedDate)
  }

  // const date = new Date(cases.end_date)
  // const year = date.getFullYear()
  // const month = String(date.getMonth() + 1).padStart(2, '0')
  // const day = String(date.getDate()).padStart(2, '0')

  // const formatedEndDate = `${year}-${month}-${day}`

  // const startDate = new Date(cases.start_date)
  // const startyear = startDate.getFullYear()
  // const startmonth = String(startDate.getMonth() + 1).padStart(2, '0')
  // const startday = String(startDate.getDate()).padStart(2, '0')

  // const formatedStartDate = `${startyear}-${startmonth}-${startday}`

  const startDateOfDate = formatDate(cases.start_date)
  const endDateOfDate = formatDate(cases.end_date)

  const dayDifference =
    (endDateOfDate.getTime() - startDateOfDate.getTime()) / (1000 * 3600 * 24)
  console.log(dayDifference)

  try {
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const createCase = async (req, res) => {
  try {
    const newCase = await Case.create(req.body)
    res.send({
      case: newCase
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const updateCase = async (req, res) => {
  try {
    const cases = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.send(cases)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const deleteCase = async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id)
    res.send('Case Deleted Successfully')
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
  findCharityCases,
  findStatistics
}
