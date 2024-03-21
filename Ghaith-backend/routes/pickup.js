const express = require('express')
const router = express.Router()
const pickupCtrl = require('../controllers/pickup')

router.get('/', pickupCtrl.showChairties)

router.post('/', pickupCtrl.createPickupRequest)

router.put('/:pickupId', pickupController.updatePickupRequest)

router.delete('/:pickupId', pickupController.deletePickupRequest)

module.exports = router
