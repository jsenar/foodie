const { data } = require('../../testData.js')

// Create controller for GET request to '/users/all'
exports.groupGet = (req, res) => {
  // res.send('There will be dragons, not posts.')
  res.json(data)
}

