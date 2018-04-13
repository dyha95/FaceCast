var express = require('express');
var router = express.Router();
var path = require('path');
var Models = require('../models/models');

/************* API REST *************/

/*RETOURNE TOUTES LES OFFRES DU MOMENT*/
//router.get('/offres', function(req, res, next) {
//    Models.Offre.find({date: {$gte: new Date()}}, function(err, offres){
//        if(err){
//            throw err;
//        }else{
//            console.log("taille: "+Object.keys(offres).length);
//
//            var id = offres[0]._id;
//            console.log("id offre: "+id);
//            res.json({
//                offres
//            });
//        }
//    });
//});

//retourne toutes les offres si la clé trouvée dans l'URL existe
router.get('/offres/:key', function(req, res, next) {
    Models.Figurant.find({clé:req.params.key}, function(err, figurant){
        if(err){
            throw err;
        }else{
            if(Object.keys(figurant).length>0){
                Models.Offre.find({date: {$gte: new Date()}}, function(err, offres){
                    if(err){throw err;}
                    else{
                        res.json({offres});
                    }
                });
            }else{
                res.send("erreur");
            }
        }
    });
});

router.get('/offresPassees/:key', function(req, res, next) {
    Models.Figurant.find({clé:req.params.key}, function(err, figurant){
        if(err){
            throw err;
        }else{
            if(Object.keys(figurant).length>0){
                Models.Offre.find({date: {$lte: new Date()}}, function(err,pOffres){
                    if(err){throw err;}
                    else{
                        res.json({pOffres});
                    }
                });
            }else{
                res.send("erreur");
            }
        }
    });
});


//retourne la clé en fonction de l'adresse email dans l'URL
router.route('/key/:email')
    .get(function(req, res, next) {
        Models.Figurant.find({email:req.params.email},{clé: true, _id: false}, function(err, figurants){
            if(err){
                throw err;
            }else{
                res.json(figurants[0]);
            }
        });
    });

/*TOUTES LES CANDIDATURES*/
router.route('/candidatures')

    /*RETOURNE LES CANDIDATURES*/
    .get(function(req, res, next) {
        Models.Candidature
            .find({})
            .populate("figurant")
            .populate("offre")
            .exec(function(err, candidatures){
            if(err){
                throw err;
            }else{
                res.json({
                    candidatures
                });
            }
        });
    });

router.route('/candidatures/:key')

    //ajoute une candidature en fonction de la clé
   .post(function(req, res, next) {    
        Models.Figurant.find({clé:req.params.key}, function(err, figurant){
            if(err){
                throw err;
            }else{
                if(Object.keys(figurant).length>0){
                    var id = figurant[0]._id;
                    Models.Candidature.find({                               etat: "en attente",
                        figurant: id,
                        offre: req.body.offre,
                        key: req.params.key}, function(err,cand){
                        if(err){
                            throw err;
                        }else{
                            if(Object.keys(cand).length>0){
                                res.send("candidature déjà existante");
                            }else{
                                var newCandidature = new Models.Candidature({
                                    etat: "En attente",
                                    figurant: id,
                                    offre: req.body.offre,
                                    key: req.params.key
                                });
                                
                                newCandidature.save(function (err) {
                                    if (err) {
                                        res.send("Pas ajouté !");
                                    }else{
                                        res.send("ok");
                                    }
                                });       
                            }
                        }
                    });
                }  
            }
        });
   });
       

router.route('/candidaturesPassees/:apikey')
    //retourne les candidatures dont l'état est "accepté" ou "refusé"
        .get(function(req, res, next) {
            Models.Candidature
                .find({
                "$or":[{
                    key:req.params.apikey,
                    etat:"Accepté"},
                      {
                    key:req.params.apikey,
                    etat:"Refusé"   
                      }]                
            
            })
                .populate("figurant")
                .populate("offre")
                .exec(function(err,candPassées) {
                if (err){
                    throw err;
                }else{
                    res.json({candPassées});
                }
            });
    });

/*CANDIDATURES PAR ID*/

router.route('/candidatures/:apikey')

    //retourne les candidatures en fonction de la clé dans l'URL
    .get(function(req, res, next) {
            Models.Candidature
                .find({key:req.params.apikey})
                .populate("figurant")
                .populate("offre")
                .exec(function(err,mesCandidatures) {
                if (err){
                    throw err;
                }else{
                    res.json({mesCandidatures});
                }
            });
    });
                      
                      

    


    /*SUPPRIME UNE CANDIDATURE*/
/*    .delete(function(req, res, next) {
        Models.Candidature.findByIdAndRemove(req.params.id, (err, doc) => { 
            if (err) { 
                res.send({"message":"Candidature non supprimée"});
            }
            else{    
                res.status(200).send(
                    {
                        message: "Candidature supprimée",
                        id: doc._id 
                    });
            }
        });        
    })*/

    /*MODIFIE UNE CANDIDATURE*/
/*    .put(function(req, res, next) {
        Models.Candidature.findById(req.params.id, (err, doc) => { 
            if (err) {
                res.send("non modifié");
            } else {
                doc.etat = req.body.etat;
                doc.figurant = req.body.figurant;
                doc.offre = req.body.offre;
    
                doc.save((err, todo) => {
                    if (err) {
                        res.send({
                            message: "Candidature non modifiée"
                        });
                    }else{
                        res.send({"message":"Candidature modifiée"});
                    }
                });
            }   
        });
    });*/

router.route('/figurants')

    /*RETOURNE LES FIGURANTS*/
    .get(function(req, res, next) {
        Models.Figurant.find({}, function(err, figurants){
            if(err){
                throw err;
            }else{
                res.json({
                    figurants
                });
            }
        });
    })


router.route('/figurants/:id')

    /*RETOURNE LES FIGURANTS PAR KEY API*/
    .get(function(req, res, next) {
        Models.Figurant.find({ clé: req.params.id }, function(err,docs) {
            if (err){
                throw err;
            }else{
                res.json(docs);
            }
        });
    })
    
module.exports = router;
