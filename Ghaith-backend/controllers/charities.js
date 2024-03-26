//user controller
const { Charity, User } = require('../models')
const middleware = require('../middleware')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport(
  (mailData = {
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.mailDataUser,
      pass: process.env.mailDataPass
    }
  })
)

const findAllCharities = async (req, res) => {
  try {
    const charities = await Charity.find({}).populate('user')
    res.send(charities)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const findCharity = async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id)
      .populate('donations')
      .populate('user')
    res.send(charity)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const createCharity = async (req, res) => {
  try {
    const charity = await Charity.create(req.body)
    res.send(charity)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const generateRandomPassword = (length) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }
  return password
}

const updateCharity = async (req, res) => {
  try {
    const previousCharity = await Charity.findById(req.params.id)
    const charity = await Charity.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    if (previousCharity.status === 'Pending' && charity.status === 'Approved') {
      // generate random password
      const password = generateRandomPassword(8)
      let passwordDigest = await middleware.hashPassword(password)

      const user = await User.findById(charity.user)
      user.passwordDigest = passwordDigest
      await user.save()
      // send email
      const message = {
        from: 'admin@ghaith.com',
        to: user.email,
        subject: 'Reset Password',
        text: `Thank you to register your charity with Ghaith Platform \n Your Password:\n${password} \n Your application has been approved.`
      }
      transport.sendMail(message, function (err, info) {
        onsole.log(info)
      })
    }
    res.send(charity)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const deleteCharity = async (req, res) => {
  try {
    await Charity.findByIdAndDelete(req.params.id)
    res.status(200).send('Charity Deleted Successfully')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

module.exports = {
  findAllCharities,
  findCharity,
  updateCharity,
  deleteCharity,
  createCharity
}
