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
            return true
        }
    },
    1:'Please reply with your Last name:',
    2:'Please reply with your Phone number:',
    3:'Please reply with your Marital status:',
    4:'Please reply with your Date of birth:',
    5:'Please reply with your Gender:',
    6:'Please reply with your City:',
    7:'Please reply with your Email:'
}
