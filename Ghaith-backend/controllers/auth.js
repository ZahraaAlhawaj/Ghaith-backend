const { User } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { email, password } = req.body

    let passwordDigest = await middleware.hashPassword(password)

    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      delete req.body.password
      delete req.body.confirmPassword
      req.body.passwordDigest = passwordDigest

      const user = await User.create(req.body)
      res.send(user)
    }
  } catch (error) {
    return error
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )

    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }

    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}
const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}
module.exports = {
  Register,
  Login,
  CheckSession
}
