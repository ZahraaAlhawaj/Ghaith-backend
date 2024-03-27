const { Request, Case, Charity } = require('../models')

const findAllRequest = async (req, res) => {
  try {
    console.log(res.locals.payload.charityId)
    let requests = await Request.find({})
    if (res.locals.payload.role === 'Admin') {
      requests = await Request.aggregate([
        {
          $match: {
            $or: [
              { status: 'Not Selected' },
              { charity: res.locals.payload.charityId }
            ]
          }
        }
      ])
    }
    res.send(requests)
  } catch (error) {
    console.log(error)
  }
}

const findCharityRequest = async (req, res) => {
  try {
    const charityId = res.locals.payload.charity.id
    const requests = await Request.find({ charity: charityId })
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
    const request = await Request.findById(req.params.requestId)
    const updatedReques = await request.updateOne(req.body)
    res.send(request)
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

const generateCode = () => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    code += charset[randomIndex]
  }
  return code
}

const selectRequest = async (req, res) => {
  try {
    req.body.code = generateCode()
    if (!req.body.image) {
      req.body.image = ''
    }
    const newCase = await Case.create(req.body)

    const selectedRequest = await Request.findById(req.params.requestId)
    if (newCase) {
      selectedRequest.charity = req.body.charityId
      selectedRequest.status = 'Selected'
      selectedRequest.case_code = newCase.code
      await selectedRequest.save()
    }

    res.send({
      request: selectedRequest,
      case: newCase
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  createRequest,
  updateRequest,
  deleteRequest,
  findAllRequest,
  selectRequest,
  findCharityRequest
}
