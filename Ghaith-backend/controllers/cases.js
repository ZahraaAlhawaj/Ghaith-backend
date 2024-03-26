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
  try {
    const cases = await Case.findById(req.params.id).populate('donations')
    //find number of donation
    const numberOfDonations = cases.donations.length
    // console.log('number: ', numberOfDonations)

    //find number of days until end day
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`
      return new Date(formattedDate)
    }
    //const startDateOfDate = formatDate(cases.start_date)
    const endDateOfDate = formatDate(cases.end_date)

    const currentDate = new Date()
    const differenceDays = endDateOfDate.getTime() - currentDate
    const dayDifference = Math.ceil(differenceDays / (1000 * 60 * 60 * 24))

    //const dayDifference = (endDateOfDate.getTime() - startDateOfDate.getTime()) / (1000 * 3600 * 24)

    //get last donation
    const casesLast = await Case.findById(req.params.id).populate({
      path: 'donations',
      options: { sort: { updatedAt: -1 }, limit: 1 }
    })

    const mostRecentDonation = casesLast.donations[0]
    const lastUpdateTime = mostRecentDonation.updatedAt
    const timeElapsed = Date.now() - lastUpdateTime.getTime()

    let timeElapsedText
    if (timeElapsed < 6000) {
      const seconds = Math.floor(timeElapsed / 1000)
      timeElapsedText = `${seconds} sec`
    } else if (timeElapsed < 3600000) {
      const minutes = Math.floor(timeElapsed / 60000)
      timeElapsedText = `${minutes} min`
    } else if (timeElapsed < 86400000) {
      const hours = Math.floor(timeElapsed / 3600000)
      timeElapsedText = `${hours} hour`
    } else {
      const dayS = Math.floor(timeElapsed / 86400000)
      timeElapsedText = `${dayS} days`
    }

    // console.log('time', timeElapsedText)

    res.send({
      timeElapsedText,
      dayDifference,
      numberOfDonations
    })
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
