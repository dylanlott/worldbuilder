var Universe = require('../models/World.js'); 

module.exports = {

	create: function(req, res){
		console.log(req); 
		var newWorld = new World(req.body); 
		newWorld.owner = req.user._id; 
		newWorld.save(function(err, world){
			if(err) {
				console.log("Error creating World", err); 
				return res.status(500).end(); 
			}
			return res.status(200).json(world).end(); 
		});
	},

	//takes an ID param
	update: function(req, res){
		World
		.findByIdAndUpdate(req.params.id, 
		{
			name: req.body.name,
			owner: req.body.owner, 
			solarSystem: req.body.solarSystem, 
		})
		.exec(function(err, world){
			if(err){
				console.log("Error updating world", err)
				return res.status(500).end(); 
			}
			return res.status(200).json(world).end(); 
		})
	},

	delete: function(req, res){
		World
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

		World
		.find({ 'owner': req.user._id }, function(err, data){
			if(err){
				return res.status(500).end(); 
			}	
			return res.status(200).json(data).end(); 
		})
	},

	listOne: function(req, res){
		console.log(req.body); 
		World
		.findById(req.params.id)
		.exec()
		.then(function(err, world){
			if(err){
				return res.status(500).end(); 
			}
			return res.status(200).json(world).end(); 
		});	
	}

}