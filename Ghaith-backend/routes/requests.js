const express = require('express')
const router = express.Router()
const requestCtrl = require('../controllers/requests')

router.post('/', requestCtrl.createRequest)

module.exports = router
