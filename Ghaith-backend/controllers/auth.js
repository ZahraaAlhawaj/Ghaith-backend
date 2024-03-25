const { User, Charity } = require('../models')
const middleware = require('../middleware')

const getCoordinates = (link) => {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/
  const match = link.match(regex)
  if (match) {
    const latitude = parseFloat(match[1])
    const longitude = parseFloat(match[2])
    return { latitude, longitude }
  } else {
    return null
  }
}

const Register = async (req, res) => {
  try {
    const { email, password } = req.body.user

    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      delete req.body.user.password
      delete req.body.user.confirmPassword

      if (req.body.user.role === 1) {
        let passwordDigest = await middleware.hashPassword(password)
        req.body.user.passwordDigest = passwordDigest
        req.body.user.role = 'User'
      } else {
        req.body.user.role = 'Admin'
      }

      let charity = null
      const user = await User.create(req.body.user)
      if (req.body.charity) {
        req.body.charity.user = user._id

        // get charity location
        const mapCoords = getCoordinates(req.body.charity.googlemaplink)
        if (mapCoords) {
          const location = {
            type: 'Point',
            coordinates: [mapCoords['longitude'], mapCoords['latitude']]
          }

          req.body.charity.location = location
        }

        charity = await Charity.create(req.body.charity)
      }
      res.send({ user, charity })
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
        name: user.name,
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

// // Example usage
// const link = 'https://www.google.com/maps/@40.7128,-74.0060'
// const coordinates = getCoordinatesFromGoogleMapsLink(link)
// console.log(coordinates)

module.exports = {
  Register,
  Login,
  CheckSession
}
