const mongoose = require('mongoose');
const shortid = require('shortid');
const { data: testData } = require('../../testData.js')

const Group = mongoose.model('group');

// Create controller for GET request to '/users/all'
exports.groupGet = (req, res) => {
  // res.send('There will be dragons, not posts.')
  if (req.query.shortId === 'test') {
    res.json(testData);
  }

  Group.findOne({ 'shortId': req.query.shortId, function (err, group) {
    console.log({group})
    if (err) {
      res.send(err);
      return console.error(err);
    } else {
      res.send(group);
    }
  }})
  res.err('No group was found')
}

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