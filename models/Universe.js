var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var universeModel = new Schema({
	name: {type: String},
	timestamp: {type: Date, default: Date.now},
	owner: {type: String, required: true},
	isPublic: {type: Boolean, default: false}
})

module.exports = mongoose.model('Universe', universeModel);