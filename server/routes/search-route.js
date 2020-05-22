const express = require('express')

// Import home controller
const searchController = require('../controllers/search-controller.js')

// Create express router
const router = express.Router()

// Create route between homeControllers and '/' endpoint
router.post('/', searchController.search)

// Export router
module.exports = router