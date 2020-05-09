var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adherentsSchema = new Schema({
	'nom': String,
	'prenom': String,
	'sexe': Number,
	'date': Date,
	'adresse': String,
	'ville': String,
	'codePostal': String,
	'num': String,
	'email': String,
	'modePasse': String,
	'ligueSportive': {
		type: Schema.Types.ObjectId,
		ref: 'ligueSportive'
	}
});

module.exports = mongoose.model('adherents', adherentsSchema);