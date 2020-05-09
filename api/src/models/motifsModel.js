var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var motifsSchema = new Schema({
	'libelle' : String
});

module.exports = mongoose.model('motifs', motifsSchema);
