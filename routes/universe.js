var express = require('express');
var router = express.Router();
var Universe = require('../controllers/UniverseController.js'); 

/* GET users listing. */
router.get('/', Universe.listAll); 
router.get('/:id', Universe.listOne); //takes a world ID 
router.post('/', Universe.create); 
router.put('/:id', Universe.update); 
router.delete('/:id', Universe.delete); 

module.exports = router;