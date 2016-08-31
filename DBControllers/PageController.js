var models = require("../models");
var express = require('express');

module.exports = {
	createPage : function createPage(page)
	{
		models.Page.update({
			pageAccessToken : page.page_access_token
		},{
			where : {
				pageID : page.page_id
			}
		});

		var new_page = models.Page.findOrCreate({
			where : {
				pageID : page.page_id,
				pageName : page.page_name
			},
			defaults : {
				pageAccessToken : page.page_access_token
			}})
			.spread(function(new_page, created){
				console.log("New Page: " + JSON.stringify(new_page.get({plain: true})));
				console.log("Created field: " + JSON.stringify(created));
			});
			return new_page;

	}
	
};
