const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')

//find all users
router.get('/', usersController.findAllUsers)
//find user
router.get('/:id', usersController.findUser)
//create user (in register)
router.post('/', usersController.createUser)
//update user (edit profile)
router.put('/:id', usersController.updateUser)

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router
