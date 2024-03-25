const express = require('express')
const router = express.Router()

const eventCtrl = require('../controllers/events')

router.get('/', eventCtrl.getAllEvents)
router.get('/:eventId', eventCtrl.getOneEvent)
router.post('/', eventCtrl.createEvent)
router.put('/:eventId', eventCtrl.updateEvent)
router.delete('/:eventId', eventCtrl.deleteEvent)
router.put('/eventId/join', eventCtrl.joinEvent)

module.exports = router
