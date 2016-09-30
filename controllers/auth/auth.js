"use strict"

var jwt = require('jsonwebtoken')

var auth = require('../../config/auth')

const config = require('../../config/auth')

module.exports = {

    authenticate : function(req, res, next){
        // check header or url parameters or post parameters for token
        var token
        // decode token
        if (token = req.body.token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Failed to authenticate token.' })
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.json({
                success: false,
                message: 'No token provided.'
            })

        }
    },
    generateToken : function(analyst){
        if (!analyst){
            return {
                success: false,
                message: 'Authentication failed. Analyst not found'
            };
        }
        var newtoken = jwt.sign(analyst.dataValues, auth.secret, {
          expiresIn: 1440 // expires in 24 hours
        })
        return { success: true,
                    message: 'Token is provided',
                    token: newtoken
                }
    }

}
