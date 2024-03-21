const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')
const middleware = require('../middleware')

//find all users
// router.get('/', usersController.findAllUsers)

//get user info
router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.getUserInfo
)

//find user
router.get('/:id', usersController.findUser)
//create user (in register)
router.post('/', usersController.createUser)
//update user (edit profile)
router.put('/:id', usersController.updateUser)

module.exports = router
