const express = require('express')
const router = express.Router()
const requestCtrl = require('../controllers/requests')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  requestCtrl.findAllRequest
)

router.get('/charityrequest', requestCtrl.findCharityRequest)

router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  requestCtrl.createRequest
)

router.put(
  '/:requestId',
  middleware.stripToken,
  middleware.verifyToken,
  requestCtrl.updateRequest
)
router.delete(
  '/:requestId',
  middleware.stripToken,
  middleware.verifyToken,
  requestCtrl.deleteRequest
)
router.post(
  '/:requestId',
  middleware.stripToken,
  middleware.verifyToken,
  requestCtrl.selectRequest
)

module.exports = router
