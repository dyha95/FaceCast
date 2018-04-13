var express = require('express');
var router = express.Router();
var Models = require('../models/models');

/* Liste des candidatures */
router.get('/', function(req, res, next) {
    Models.Candidature
        .find({})
        .populate("figurant")
        .populate("offre")
        .exec(function(err, candidatures){
        if(err){
            throw err;
        }else{
            res.render('candidatures',{
                "title" : "Liste des candidatures",
                "listeCandidatures" : candidatures
            });
        }
    });
});


/* Modification de l'état */
router.post('/update/:id', function(req, res, next) {
    Models.Candidature.findById(req.params.id, (err, doc) => {
        if (err) {
            res.send("non modifié");
        } else {
            doc.etat = req.body.etat;

            doc.save((err, todo) => {
                if (err) {
                    res.send("non modifié");
                }else{
                    res.redirect("/candidatures");
                }        
            });
        }
    });
});

module.exports = router;
