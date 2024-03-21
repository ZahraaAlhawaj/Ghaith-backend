const express = require('express')
const router = express.Router()
const donationCrtl = require('../controllers/donations')

router.post('/case/:caseId', donationCrtl.addCaseDonation)
router.post('/chairty/:chairtyId', donationCrtl.addDonation)

module.exports = router
