const express = require('express')
const router = express.Router()
const pickupCtrl = require('../controllers/pickup')

router.post('/charites', pickupCtrl.showChairties)

router.post('/', pickupCtrl.createPickupRequest)

router.put('/:pickupId', pickupCtrl.updatePickupRequest)
router.put('/:pickupId/status', pickupCtrl.updatePickupStatus)

router.delete('/:pickupId', pickupCtrl.deletePickupRequest)

router.get('/charity', pickupCtrl.getPickupsByCharity)

module.exports = router
