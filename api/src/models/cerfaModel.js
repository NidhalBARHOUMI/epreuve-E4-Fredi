var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cerfaSchema = new Schema({
  'tresoriers': {
    type: Schema.Types.ObjectId,
    ref: 'tresoriers'
  },
  'cerfa': String,
  'adherents': {
    type: Schema.Types.ObjectId,
    ref: 'adherents'
  }
});

module.exports = mongoose.model('cerfa', cerfaSchema);