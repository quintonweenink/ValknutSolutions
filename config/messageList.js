var validation = require('../controllers/validation/validation')
var normalize = require('../controllers/validation/normalize')

module.exports = {
    8:
    {
        message:'You will be contacted shortly...',
        validate: true,
		normalize: normalize.doNothing
    },
    0:
    {
        message:'Please reply with your Name:',
        validate: validation.isName,
		normalize: normalize.doNothing
    },
    1:
    {
        message:'Please reply with your Last name:',
        validate: validation.isName,
		normalize: normalize.doNothing
    },
    2:
    {
        message:'Please reply with your Phone number:',
        validate: validation.isPhoneNumber,
		normalize: normalize.toNoSpace
    },
    3:
    {
        message:'Please reply with your Marital status:',
        validate: validation.isMarital,
		normalize: normalize.toLower
    },
    4:
    {
        message:'Please reply with your Date of birth:',
        validate: validation.isDate,
		normalize: normalize.doNothing
    },
    5:
    {
        message:'Please reply with your Gender:',
        validate: validation.isGender,
		normalize: normalize.toLower
    },
    6:
    {
        message:'Please reply with your City:',
        validate: validation.isName,
		normalize: normalize.toLower
    },
    7:
    {
        message:'Please reply with your Email:',
        validate: validation.isEmail,
		normalize: normalize.toLower
    }
}
