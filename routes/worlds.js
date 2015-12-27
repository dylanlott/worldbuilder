var express = require('express');
var router = express.Router();
var World = require('../controllers/WorldController.js'); 

/* GET users listing. */
router.get('/worlds', World.listAll); 
router.get('/worlds/:id', World.listOne); //takes a world ID 
router.post('/worlds', World.create); 
router.put('/worlds/:id', World.update); 
router.delete('/worlds/:id', World.delete); 

module.exports = router;