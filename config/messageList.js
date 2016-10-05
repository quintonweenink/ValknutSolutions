var validation = require('../controllers/validation/validation')

module.exports = {
    8:
    {
        message:'You will be contacted shortly...',
        validate: true
    },
    0:
    {
        message:'Please reply with your Name:',
        validate: validation.isName
    },
    1:
    {
        message:'Please reply with your Last name:',
        validate: validation.isName
    },
    2:
    {
        message:'Please reply with your Phone number:',
        validate: validation.isPhoneNumber
    },
    3:
    {
        message:'Please reply with your Marital status:',
        validate: validation.isMarital
    },
    4:
    {
        message:'Please reply with your Date of birth:',
        validate: validation.isDate
    },
    5:
    {
        message:'Please reply with your Gender:',
        validate: validation.isGender
    },
    6:
    {
        message:'Please reply with your City:',
        validate: validation.isName
    },
    7:
    {
        message:'Please reply with your Email:',
        validate: validation.isEmail
    }
}
