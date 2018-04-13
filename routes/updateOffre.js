var express = require('express');
var router = express.Router();
var Offre = require('../models/models');

router.get('/', function(req, res, next) {
  res.render('updateOffre');
});

/* Retourne les informations de l'offre par l'id */
router.get('/:offre', function(req, res, next) {
    Offre.Offre.findById(req.params.offre, (err, doc) => {
        res.render('updateOffre', {
           "title" : "offreById",
           "offreById" : doc
        });
    });
});

/* Modifie l'offre */
router.post('/:offre/update', function(req, res, next) {
    Offre.Offre.findById(req.params.offre, (err, doc) => {
    if (err) {
        res.send("non modifié");
    } else {
        doc.nom = req.body.nomOffre;
        doc.type = req.body.type;
        doc.date = req.body.date;
        doc.nbJours = req.body.nbJour;
        doc.nbFigurants = req.body.nbFigurants;
        doc.roleDemande = req.body.role;

        doc.save((err, todo) => {
            if (err) {
                res.send("non modifié");
            }else{
                res.redirect("/offres");
            }        
        });
    }
    });
});

module.exports = router;
