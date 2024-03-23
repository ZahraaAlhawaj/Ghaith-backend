const express = require('express')
const router = express.Router()

const charitiesController = require('../controllers/charities')

//find all Charity
router.get('/', charitiesController.findAllCharities)
//find Charity
router.get('/:id', charitiesController.findCharity)

router.post('/', charitiesController.createCharity)
//update Charity (edit profile)
router.put('/:id', charitiesController.updateCharity)

router.delete('/:id', charitiesController.deleteCharity)

module.exports = router
