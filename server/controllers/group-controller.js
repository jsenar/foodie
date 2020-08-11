const mongoose = require('mongoose');
const shortid = require('shortid');
const { data: testData } = require('../../testData.js')

const Group = mongoose.model('group');

const LIKED = "LIKED";
const DISLIKED = "DISLIKED";

exports.groupGet = async (req, res) => {
  if (req.query.shortId === 'test') {
    res.json(testData);
  }

  const group = await Group.findOne({ shortId: req.query.shortId }).exec();

  res.send(group)
}

exports.groupCreate = (req, res) => {
  const dateCreated = Date.now();
  const businesses = req.body.params.businesses;

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

exports.groupUpdate = async (req, res) => {
  const { alias, increment, shortId } = req.body.params;
  
  const group = await Group.findOne({ shortId }).exec();

  const businessIndex = group.businesses.findIndex((business) => business.alias === alias);

  if (businessIndex === -1) {
    res.send('Error finding business')
  }
  
  if (increment === LIKED) {
    group.businesses[businessIndex].likes += 1;
  } else if (increment === DISLIKED) {
    group.businesses[businessIndex].dislikes += 1;
  }

  await group.save();
  res.send("Saved successfully");
}