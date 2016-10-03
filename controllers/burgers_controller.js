/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/index');
});

router.get('/index', function (req, res) {
	burger.selectAll(function (data) {
		var hbsObject = { burgers: data };

		// console.log(hbsObject);
		
		res.render('index', hbsObject);
	});
});

router.post('/index/insertOne', function (req, res) {
	burger.insertOne(['burger_name'], [req.body.burger_name], function () {
		res.redirect('/index');
	});
});

router.put('/index/updateOne/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.updateOne({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/index');
	});
});

module.exports = router;