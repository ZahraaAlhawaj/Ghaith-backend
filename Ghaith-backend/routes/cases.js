const express = require('express')
const router = express.Router()

const casesController = require('../controllers/cases')
const middleware = require('../middleware')

//find all cases
router.get('/', casesController.findAllCases)
//find charity cases
router.get('/charity/:id', casesController.findCharityCases)
// finding urgent cases
router.get('/urgent', casesController.findUrgentCases)
//find statistics
router.get('/:id/statistics', casesController.findStatistics)
//find case
router.get('/:id', casesController.findCase)
//create case
router.post('/',  middleware.stripToken,
middleware.verifyToken, casesController.createCase)
//update Case
router.put('/:id', casesController.updateCase)
//delete case
router.delete('/:id', casesController.deleteCase)

module.exports = router
