const express = require('express')
const router = express.Router()
const requestCtrl = require('../controllers/requests')

router.post('/', requestCtrl.createRequest)

router.put('/:requestId', requestController.updateRequest)
router.delete('/:requestId', requestController.deleteRequest)

module.exports = router
