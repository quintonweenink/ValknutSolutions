"use strict"


module.exports = {
	toLower : function(res){
		return res.toLowerCase()
	},
	toUpper : function(res){
		return res.toUpperCase()
	},
	toNoSpace : function(res){
		return res.replace(/\s/g, '')
	},
	doNothing : function(res){
		return res
    }
}
