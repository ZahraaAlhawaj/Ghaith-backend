const express = require('express')
const router = express.Router()

const authCtrl = require('../controllers/auth')
const middleware = require('../middleware')

router.post('/register', authCtrl.Register)
router.post('/login', authCtrl.Login)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  authCtrl.CheckSession
)

router.put(
  '/reset',
  middleware.stripToken,
  middleware.verifyToken,
  authCtrl.ResetPassword
)

module.exports = router
