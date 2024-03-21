const express = require('express')
const router = express.Router()

const casesController = require('../controllers/cases')

//find all cases
router.get('/', casesController.findAllCases)

// finding urgent cases
router.get('/urgent', casesController.findUrgentCases)
//find case
router.get('/:id', casesController.findCase)

router.post('/', casesController.createCase)

//update Case
router.put('/:id', casesController.updateCase)

router.delete('/:id', casesController.deleteCase)

module.exports = router
