var express = require('express');
var router = express.Router();
var Models = require('../models/models');

/* Liste des figurants */
router.get('/', function(req, res, next){
    Models.Figurant.find({}, function(err, doc){
        if(err){
            throw err;
        }else{
            res.render('figurants',{
                "title" : "Liste des figurants",
                "listeFigurants" : doc
            });
        }
    });
});

module.exports = router;