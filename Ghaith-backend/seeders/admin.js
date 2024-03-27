const mongoose = require('mongoose')
const { User } = require('../models')
require('dotenv').config()
const { hashPassword } = require('../middleware')

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB . . .')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })

const createAdmin = async () => {
  let admin = {
    name: 'Admin',
    email: 'admin@ghaith.com',
    passwordDigest: await hashPassword('ghaith123'),
    role: 'Super Admin',
    onboarding: true
  }

  console.log('Creating Admins . . .')
  await User.create(admin)
  console.log('Admins created!')
  mongoose.connection.close()
}

createAdmin()
