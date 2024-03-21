const { Donation, Case, Charity, Category } = require('../models')

const addCaseDonation = async (req, res) => {
  try {
    const newDonation = await Donation.create(req.body)
    const donatedCase = await Case.findById(req.params.caseId)
    donatedCase.collected_amount += newDonation.amount
    await donatedCase.save()
    donatedCase.donations.push(newDonation_.id)
    await donatedCase.save()
    res.send(newDonation)
  } catch (error) {
    console.log(error)
  }
}

const addDonation = async (req, res) => {
  try {
    const newDonation = await Donation.create(req.body)
    const charity = await Charity.findById(req.params.chairtyId)
    charity.donations.push(newDonation_.id)
    await charity.save()
    res.send(newDonation)
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
  addCaseDonation,
  addDonation,
  statistics
}
