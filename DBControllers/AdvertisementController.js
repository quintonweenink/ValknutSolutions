var models = require("../models");
var express = require('express');

module.exports = {
createAdvertisement : function createAdvertisement(advertisement)
{
	var new_advertisement = models.Advertisement.create({
		pageID : advertisement.page_id,
		advertisementID : advertisement.advertisement_id
	});
	return new_advertisement;
}
};
