var models = require("../models");
var express = require('express');

module.exports = {
	createPage : function createPage(page)
	{
		var new_page = models.Page.create({
			pageID : page.page_id,
			pageName : page.page_name,
			pageAccessToken : page.page_access_token
		});
		return new_page;
	}
};
