const { Donation, Case, Charity } = require('../models')

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
module.exports = {
  addCaseDonation,
  addDonation
}
