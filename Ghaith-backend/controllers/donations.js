const { Donation, Case, Charity, Category } = require('../models')

const findAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({}).populate('user')
    res.send(donations)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const addDonation = async (req, res) => {
  try {
    const donation = await Donation.create({
      amount: req.body.amount,
      user: req.body.user
    })

    if (req.body.case) {
      const donatedCase = await Case.findById(req.body.case)
      donatedCase.donations.push(donation)
      donatedCase.collected_amount += donation.amount
      await donatedCase.save()
    }

    if (req.body.charity) {
      const charity = await Charity.findById(req.body.charity)
      charity.donations.push(donation)
      await charity.save()
    }

    res.send(donation)
  } catch (error) {
    console.log(error)
  }
}

const statistics = async (req, res) => {
  try {
    const numberOfDonations = await Donation.countDocuments()
    const numberOfCharities = await Charity.countDocuments()
    const numberOfCategories = await Category.countDocuments()
    const totalAmountDonations = Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ])
    res.send({
      numberOfDonations,
      totalAmountDonations,
      numberOfCharities,
      numberOfCategories
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  addDonation,
  statistics,
  findAllDonations
}
