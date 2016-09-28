var models = require("../../models");
var express = require('express');

module.exports = {
createLead : function createLead(lead)
	{
		//console.log("CHECK THIS FILE: " + JSON.stringify(lead.lead_data));
		models.Lead.findOrCreate({
			where: {
				leadID : lead.lead_id,
				adID : lead.ad_id,
				userID : lead.user_id
			},
			defaults : {}
		})
		.spread(function(new_lead, created){
			//console.log("New Lead :" + JSON.stringify(new_lead.get({plain: true})));
			//console.log("Created field: " + JSON.stringify(created));
		});/*
		var new_lead = models.Lead.create({
			leadID : lead.lead_id,
			adID : lead.ad_id,
	    userID : lead.user_id,
	    leadData : lead.lead_data
		});
		return new_advertisement;*/
	}
};
