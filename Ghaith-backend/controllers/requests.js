const { Request, Case } = require('../models')

const findAllRequest = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'Not Selected' })
    res.send(requests)
  } catch (error) {
    console.log(error)
  }
}
const createRequest = async (req, res) => {
  try {
    const newRequest = await Request.create(req.body)
    res.send(newRequest)
  } catch (error) {
    console.log(error)
  }
}

const updateRequest = async (req, res) => {
  try {
    const request = Request.findById(req.params.requestId)
    await request.updateOne(req.body)
  } catch (error) {
    console.log(error)
  }
}

const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.requestId)
    res.send({ message: 'Pickup request deleted successfully' })
  } catch (error) {
    console.log(error)
  }
}

const selectRequest = async (req, res) => {
  try {
    const selectedRequest = await Request.findById(req.params.requestId)
    selectedRequest.status = 'Selected'
    await selectedRequest.save()
    const newCase = await Case.create({})
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  createRequest,
  updateRequest,
  deleteRequest,
  findAllRequest,
  selectRequest
}
