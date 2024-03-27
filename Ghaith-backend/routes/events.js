const express = require('express')
const router = express.Router()

const eventCtrl = require('../controllers/events')
const middleware = require('../middleware')

router.get('/', eventCtrl.getAllEvents)
router.get(
  '/charity',
  middleware.stripToken,
  middleware.verifyToken,
  eventCtrl.getEventByCharity
)
router.get(
  '/user',
  middleware.stripToken,
  middleware.verifyToken,
  eventCtrl.getEventByUser
)
router.get('/:eventId', eventCtrl.getOneEvent)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  eventCtrl.createEvent
)
router.put('/:eventId', eventCtrl.updateEvent)
router.delete('/:eventId', eventCtrl.deleteEvent)
router.put(
  '/:eventId/join',
  middleware.stripToken,
  middleware.verifyToken,
  eventCtrl.joinEvent
)

module.exports = router
