const express = require('express')
const router = express.Router()

const authCtrl = require('../controllers/auth')

router.post('/register', authCtrl.Register)
router.post('/login', authCtrl.Login)

module.exports = router
