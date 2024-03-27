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

router.post('/', requestCtrl.createRequest)

router.put('/:requestId', requestCtrl.updateRequest)
router.delete('/:requestId', requestCtrl.deleteRequest)
router.post('/:requestId', requestCtrl.selectRequest)

module.exports = router
