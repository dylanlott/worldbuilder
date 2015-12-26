var Universe = require('../models/Universe.js'); 

module.exports = {

	create: function(req, res){
		console.log(req); 
		var newUniverse = new Universe(req.body); 
		newUniverse.owner = req.user._id; 
		newUniverse.save(function(err, universe){
			if(err) {
				console.log("Error creating Universe", err); 
				return res.status(500).end(); 
			}
			return res.status(200).json(universe).end(); 
		}); 
	},

	//takes an ID param 
	update: function(req, res){
		Universe
		.findByIdAndUpdate(req.params.id, 
			{
				name: req.body.name,
				isPublic: req.body.isPublic
			})
		.exec(function(err, universe){
			if(err){
				console.log("Error updating Universe", err)
				return res.status(500).end(); 
			}
			return res.status(200).json(universe).end(); 
		})
	},

	delete: function(req, res){
		Universe
		.findById(req.params.id)
		.remove()
		.exec(function(err, result){
			console.log(result); 
			if(err){
				return res.status(500).end(); 
			}
			return res.status(200).json(result).end(); 
		})
	},

	listAll: function(req, res){
		console.log("_id:", req.user._id);
		console.log("id:", req.user.id); 

		Universe
		.find({ 'owner': req.user._id }, function(err, data){
			if(err){
				return res.status(500).end(); 
			}	
			return res.status(200).json(data).end(); 
		})
	},

	listOne: function(req, res){
		console.log(req.body); 
		Universe
		.findById(req.params.id)
		.exec()
		.then(function(err, universe){
			if(err){
				return res.status(500).end(); 
			}
			return res.status(200).json(universe).end(); 
		});	
	}

}