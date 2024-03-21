const express = require('express')
const router = express.Router()
const requestCtrl = require('../controllers/requests')

router.get('/', requestCtrl.findAllRequest)
router.post('/', requestCtrl.createRequest)

router.put('/:requestId', requestCtrl.updateRequest)
router.delete('/:requestId', requestCtrl.deleteRequest)
router.post('/:requestId', requestCtrl.selectRequest)

module.exports = router
