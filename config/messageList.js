var validation = require('../controllers/validation/validation')

module.exports = {
    8:
    {
        message:'You will be contacted shortly...',
        validate: function(res){
            //nothing to validate
            return true
        }
    },
    0:
    {
        message:'Please reply with your Name:',
        validate: function(res){
            //validate is a string (no numbers and symbols*)
            return validation.isName()
        }
    },
    1:
    {
        message:'Please reply with your Last name:',
        validate: function(res){
            //validate is a string (no numbers and symbols*)
            return validation.isName()
        }
    },
    2:
    {
        message:'Please reply with your Phone number:',
        validate: function(res){
            //validate is a string (no numbers and symbols*)
            return validation.isPhoneNumber()
        }
    },
    3:
    {
        message:'Please reply with your Marital status:',
        validate: function(res){
            //validate is a string (no numbers and symbols*)
            return validation.isMarital()
        }
    },
    4:
    {
        message:'Please reply with your Date of birth:',
        validate: function(res){
            //validate is a string (no numbers and symbols*)
            return validation.isDate()
        }
    },
    5:
    {
        message:'Please reply with your Gender:',
        validate: function(res){
            //validate is a string (no numbers and symbols*)
            return validation.isGender()
        }
    },
    6:
    {
        message:'Please reply with your City:',
        validate: function(res){
            //validate is a string (no numbers and symbols*)
            return validation.isName()
        }
    },
    7:
    {
        message:'Please reply with your Email:',
        validate: function(res){
            //validate is a string (no numbers and symbols*)
            return validation.isEmail()
        }
    }
}
