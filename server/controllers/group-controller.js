const mongoose = require('mongoose');
const shortid = require('shortid');
const { data } = require('../../testData.js')

// Create controller for GET request to '/users/all'
exports.groupGet = (req, res) => {
  // res.send('There will be dragons, not posts.')
  res.json(data)
}

const Group = mongoose.model('group');

exports.groupCreate = (req, res) => {
  const dateCreated = Date.now();
  const businesses = req.body.businesses;

  const shortId = shortid.generate();
  let group = new Group({shortId, dateCreated, businesses});
  group.save( (err, group) => {
    if (err) {
      res.send(err);
      return console.error(err);
    } else {
      res.send(group);
    }
  });
}