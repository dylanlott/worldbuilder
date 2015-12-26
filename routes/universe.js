var express = require('express');
var router = express.Router();
var WorldController = require('../controllers/UniverseController.js'); 

/* GET users listing. */
router.get('/universe', Universe.listAll); 
router.get('/universe/:id', Universe.listOne); //takes a world ID 
router.post('/universe', Universe.create); 
router.put('/universe/:id', Universe.update); 
router.delete('/universe/:id', Universe.delete); 

module.exports = router;