var express = require('express');
var router = express.Router();
var Models = require('../models/models');

/* Liste des offres */
router.get('/', function(req, res, next) {
    Models.Offre.find({}, function(err, doc){
        if(err){
            throw err;
        }else{
            res.render('offres',{
                "title" : "Liste des offres",
                "listeOffres" : doc
            });
        }
    });
});


/* Renvoie vers le formulaire de modification */
router.get('/ajoutOffre', function(req, res, next) {
    res.render('ajoutOffre');
});



/* Ajoute une offre */
router.post('/addOffer', function(req, res) { 
    var newOffer = new Models.Offre({
        nom:req.body.nomOffre,
        type:req.body.type,
        date:req.body.date,
        nbJours:req.body.nbJour,
        nbFigurants:req.body.nbFigurants,
        roleDemande:req.body.role
    });
    newOffer.save(function (err) {
        if (err) { 
            res.send("Pas glop !");
        }
        else{res.redirect("/offres");}
    });
});


/* Supprime une offre et toutes les candidatures liées à celle-ci */
router.get('/deleteOffer/:offre', function(req, res, next) {
    Models.Offre.findByIdAndRemove(req.params.offre, (err, doc) => {
        if (err) { 
            res.send("Pas supprimé !");
        }
    });
    Models.Candidature.find({"offre":req.params.offre}).remove().exec(function(err,data){
        if(err){
            throw err;
        }else{
            res.redirect("/offres");
        }
    });
});


module.exports = router;
