const { Request } = require('../models')

const createRequest = async (req, res) => {
  try {
    const newRequest = await Request.create(req.body)
    res.send(newRequest)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createRequest
}
