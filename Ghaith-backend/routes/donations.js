const express = require('express')
const router = express.Router()
const donationCrtl = require('../controllers/donations')

router.get('/statistics', donationCrtl.statistics)
router.post('/', donationCrtl.addDonation)

module.exports = router
