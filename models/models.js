var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidature= Schema({
    etat: String,
    figurant: {type:Schema.Types.ObjectId, ref:'Figurant'},
    offre: {type:Schema.Types.ObjectId, ref:'Offre'},
    key: String
});

var offre = Schema ({
    nom: String,
    type: String,
    date: Date,
    nbJours: Number,
    nbFigurants: Number,
    roleDemande: String
});

var figurant = Schema({
    nom: String,
    prenom: String,
    email: String,
    clé: String
});

var Figurant = mongoose.model('Figurant', figurant);
var Offre = mongoose.model('Offre', offre);
var Candidature = mongoose.model('Candidature', candidature);

module.exports = {Figurant, Offre, Candidature};