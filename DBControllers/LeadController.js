var models = require("../models");
var express = require('express');

module.exports = {
createLead : function createLead(lead)
{
	var new_lead = models.Lead.create({
		leadID : lead.lead_id,
		adID : lead.ad_id,
    userID : lead.user_id,
    leadData ; lead.lead_data
	});
	return new_advertisement;
}
};
