var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var  worldModel = new Schema({
  name: {type: String},
  timestamp: {type: Date, default: Date.now},
  owner: {type: String},
  solarSystem: {type: String}
});

module.exports = mongoose.model('World', worldModel);