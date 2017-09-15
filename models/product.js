var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  image: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  specifications: {type: Object},
  brand: {type: String, required: true},
  categoryId: {type: Number, required: true},
  price: {type: Number, required: true},
  offerprice: {type: Number, required: true},
  taxpercent: {type: Number, required: true},
  stock: {type: Number, required: true},
  rewardpoints: {type: Number, default: 0},
  isfeatured: {type: Boolean, default: false},
  datestamp: {type: Date, default: Date.now() }
});

module.exports = mongoose.model('Product', schema);