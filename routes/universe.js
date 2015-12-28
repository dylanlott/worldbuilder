var express = require('express');
var router = express.Router();
var Universe = require('../controllers/UniverseController.js'); 
var User = require('../controllers/UserController.js'); 

/* GET users listing. */
router.get('/', User.requireAuth, Universe.listAll);
router.get('/:id', User.requireAuth, Universe.listOne); //takes a world ID 
router.post('/', User.requireAuth, Universe.create); 
router.put('/:id', User.requireAuth, Universe.update); 
router.delete('/:id', User.requireAuth, Universe.delete); 

module.exports = router;