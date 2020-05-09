var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var tresoriersSchema = new Schema({
	'nom' : String,
	'prenom' : String,
	'num' : String,
	'email' : String,
	'modePasse' : String
});

module.exports = mongoose.model('tresoriers', tresoriersSchema);
