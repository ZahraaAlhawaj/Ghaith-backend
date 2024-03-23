const express = require('express')
const router = express.Router()
const donationCrtl = require('../controllers/donations')

router.get('/statistics', donationCrtl.statistics)
router.post('/case/:caseId', donationCrtl.addCaseDonation)
router.post('/charity/:charityId', donationCrtl.addDonation)

module.exports = router
