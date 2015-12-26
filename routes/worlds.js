var express = require('express');
var router = express.Router();
var WorldController = require('../controllers/WorldController.js'); 

/* GET users listing. */
router.get('/worlds', WorldController.listAll); 
router.get('/worlds/:id', WorldController.listOne); //takes a world ID 
router.post('/worlds', WorldController.create); 
router.put('/worlds/:id', WorldController.update); 
router.delete('/worlds/:id', WorldController.delete); 

module.exports = router;