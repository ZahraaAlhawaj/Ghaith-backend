//user controller
const { Category } = require('../models')

const findAllCategories = async (req, res) => {
  const categories = await Category.find({})
  res.send(categories)
}

const findCategory = async (req, res) => {
  const category = await Category.findById(req.params.id)
  res.send(category)
}

const createCategory = async (req, res) => {
  try {
    await Category.create(req.body)
    res.send('category cerated')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send('category updated')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.send('Category Deleted')
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

module.exports = {
  findAllCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
