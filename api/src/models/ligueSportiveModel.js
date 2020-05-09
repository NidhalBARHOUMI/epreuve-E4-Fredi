var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ligueSportiveSchema = new Schema({
	'nom' : String
});

module.exports = mongoose.model('ligueSportive', ligueSportiveSchema);
