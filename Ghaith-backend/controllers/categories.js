const { Category } = require('../models')

const findAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate('cases')
    res.send(categories)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const findCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    res.send(category)
  } catch (error) {
    res.status(500).send({ errorMsg: error.message })
  }
}

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.send(category)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.send(category)
  } catch (error) {
    console.log(error)
    res.status(500).send({ errorMsg: error.message })
  }
}

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).send('Category Deleted Successfully')
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
