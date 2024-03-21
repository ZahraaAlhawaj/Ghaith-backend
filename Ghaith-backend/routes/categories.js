const express = require('express')
const router = express.Router()

const categoriesController = require('../controllers/categories')

//find all category
router.get('/', categoriesController.findAllCategories)
//find category
router.get('/:id', categoriesController.findCategory)

router.post('/', categoriesController.createCategory)

//update category
router.put('/:id', categoriesController.updateCategory)

router.delete('/:id', categoriesController.deleteCategory)

module.exports = router
