const express = require('express')
const router = express.Router()
const pickupCtrl = require('../controllers/pickup')
const middleware = require('../middleware')

router.post('/charites', pickupCtrl.showChairties)
router.get('/', pickupCtrl.showAllPickup)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  pickupCtrl.createPickupRequest
)

router.put(
  '/:pickupId',
  middleware.stripToken,
  middleware.verifyToken,
  pickupCtrl.updatePickupRequest
)
router.put(
  '/:pickupId/status',

  pickupCtrl.updatePickupStatus
)

router.delete(
  '/:pickupId',
  middleware.stripToken,
  middleware.verifyToken,
  pickupCtrl.deletePickupRequest
)

router.get(
  '/charity',
  middleware.stripToken,
  middleware.verifyToken,
  pickupCtrl.getPickupsByCharity
)

module.exports = router
