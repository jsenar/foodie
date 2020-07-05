const mongoose = require('mongoose');

const { Schema } = mongoose;

const BusinessSchema = new Schema({
  name:  String,
  alias: String,
  rating:   String,
  review_count: Number,
  price: String,
  location: { formatted_address: String },
  photos: [ String ],
  url: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const GroupSchema = new Schema({
  shortId: { type: String },
  dateCreated: { type: Number },
  businesses: [BusinessSchema],
});

mongoose.model('group', GroupSchema);
