var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fraisSchema = new Schema({
  'date': Date,
  'trajet': String,
  'km': Number,
  'hbg': Number,
  'repas': Number,
  'peage': Number,
  'peageV': {
    type: Boolean,
    default: false
  },
  'repasV': {
    type: Boolean,
    default: false
  },
  'hbgV': {
    type: Boolean,
    default: false
  },
  'kmV': {
    type: Boolean,
    default: false
  },
  'trajetV': {
    type: Boolean,
    default: false
  },
  'adherents': {
    type: Schema.Types.ObjectId,
    ref: 'adherents'
  },
  'motifs': {
    type: Schema.Types.ObjectId,
    ref: 'motifs'
  },
  'tresories': {
    type: Schema.Types.ObjectId,
    ref: 'tresoriers'
  }
});

module.exports = mongoose.model('frais', fraisSchema);