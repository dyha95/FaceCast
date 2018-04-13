var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offre = Schema ({
    //_id: Schema.Types.ObjectId,
    nom: String,
    type: String,
    date: Date,
    nbJours: Number,
    nbFigurants: Number,
    roleDemande: String
});

var Offre = mongoose.model('Offre', offre);
module.exports = {Offre};