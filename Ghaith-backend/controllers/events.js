const { Event, User } = require('../models')

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({})
    res.send(events)
  } catch (error) {
    console.log(error)
  }
}

const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
    res.send(event)
  } catch (error) {
    console.log(error)
  }
}

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body)
    res.send(event)
  } catch (error) {
    console.log(error)
  }
}

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { ...req.body },
      { new: true }
    )
    res.send(event)
  } catch (error) {
    console.log(error)
  }
}

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.eventId)
    res.send(event)
  } catch (error) {
    console.log(error)
  }
}
const joinEvent = async (req, res) => {
  try {
    const userId = res.locals.payload.id
    const user = await User.findById(userId)
    const event = await Event.findById(req.params.eventId)
    if (event.volunteers.includes(userId)) {
      return res.send({
        success: false,
        msg: 'You have already joined this event.'
      })
    }
    if (event.requiredVolunteers === event.volunteers.length) {
      return res.send({
        success: false,
        msg: 'This event has reached its maximum capacity.'
      })
    }

    event.volunteers.push(user._id)
    await event.save({ success: true, event })

    res.send(event)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent
}