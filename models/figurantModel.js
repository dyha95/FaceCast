var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var figurant = Schema({
    nom: String,
    prenom: String,
    email: String,
    clé: String
    //key: Schema.Types.ObjectId
});

var Figurant = mongoose.model('Figurant', figurant);

module.exports = {Figurant};