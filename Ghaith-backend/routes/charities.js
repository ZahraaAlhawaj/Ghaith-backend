const express = require('express')
const router = express.Router()
const middleware = require('../middleware')

const charitiesController = require('../controllers/charities')

//find all Charity
router.get('/', charitiesController.findAllCharities)

//find approved Charity
router.get('/approved', charitiesController.findApprovedCharities)

//find Charity
router.get('/:id', charitiesController.findCharity)

router.post('/', charitiesController.createCharity)
//update Charity (edit profile)
router.put('/:id', charitiesController.updateCharity)

router.delete('/:id', charitiesController.deleteCharity)

module.exports = router
