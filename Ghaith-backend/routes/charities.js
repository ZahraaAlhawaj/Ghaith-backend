const express = require('express')
const router = express.Router()

const charitiesController = require('../controllers/charities')

//find all Charity
router.get('/', charitiesController.findAllCharities)
//find Charity
router.get('/:id', charitiesController.findCharity)

// router.post('/', charitiesController.createCharity)
//update Charity (edit profile)
router.put('/:id', charitiesController.updateCharity)

router.delete('/:id', charitiesController.deleteCharity)

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router
