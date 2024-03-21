const express = require('express')
const router = express.Router()
const pickupCtrl = require('../controllers/pickup')

router.get('/', pickupCtrl.showChairties)

module.exports = router
