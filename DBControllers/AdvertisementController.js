var models = require("../models");
var express = require('express');

module.exports = {
	createAdvertisement : function createAdvertisement(advertisement, callback)
	{
		models.Advertisement.findOrCreate({
			where : {
				advertisementID : advertisement.advertisement_id,
				pageID : advertisement.page_id
			},
			defaults : {}})
			.spread(function(new_advertisement, created){
				console.log("New created advertisement : " + JSON.stringify(new_advertisement.get({plain: true})));
				console.log("Created field: " + JSON.stringify(created));
				callback(new_advertisement.id);
			});/*
		var new_advertisement = models.Advertisement.create({
			pageID : advertisement.page_id,
			advertisementID : advertisement.advertisement_id
		});
		return new_advertisement;*/
	}
};
