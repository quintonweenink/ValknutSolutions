var express = require('express');

module.exports = function(app, passport){

	app.route('/api/analyst')
	//User Post route
    .post(function(req, res) {
			var newAnalyst = {
				email: 'a',
				password: 'lelelel'
		};
			analystController.createAnalyst(newAnalyst)
			.then(function(analyst){
        res.json(analyst.dataValues);
    }) .catch(function(error){
         console.log("ops: " + error);
         res.status(500).json({ error: 'error' });
     });
	})
	//User Get route
    .get(function(req, res) {
			models.Analyst.findAll().then(function(users){
				res.json(users);
		});
		//Logic for returning all users
	});

};
