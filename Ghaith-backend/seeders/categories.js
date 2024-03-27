const mongoose = require('mongoose')
const { Category } = require('../models')
require('dotenv').config()

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Successfully connected to MongoDB . . .')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })

const createCategories = async () => {
  let categories = [
    {
      name: 'Treatment'
    },
    {
      name: 'Education'
    },
    {
      name: 'Food'
    },
    {
      name: 'Home-Renovation'
    },
    {
      name: 'Clothing'
    },
    {
      name: 'Family'
    },
    {
      name: 'Emergency Relief'
    }
  ]

  await Category.deleteMany({})
  console.log('Creating Categories . . .')
  await Category.insertMany(categories)
  console.log('Categories created!')
  mongoose.connection.close()
}

createCategories()
