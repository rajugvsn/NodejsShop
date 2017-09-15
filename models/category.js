var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  categoryId: {type: Number, required: true},
  category: {type: String, required: true},
  datestamp: {type: Date, Default: Date.now()}
});

module.exports = mongoose.model('Category', schema);