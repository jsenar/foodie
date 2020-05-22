const express = require('express')

// Import home controller
const groupController = require('../controllers/group-controller.js')

// Create express router
const router = express.Router()

// Create route between homeControllers and '/' endpoint
router.get('/', groupController.groupGet)

// Export router
module.exports = router