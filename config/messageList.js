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
		message:'Hi there,  welcome to the MarketLead.io chat bot. In order to evaluate you we will require some information in order to contact you. Firstly please reply with your first name:',
		validate: validation.isName,
		normalize: normalize.doNothing
	},
	1:
	{
		message:'Please reply with your last name:',
		validate: validation.isName,
		normalize: normalize.doNothing
	},
	2:
	{
		message:'Please reply with your phone number:',
		validate: validation.isPhoneNumber,
		normalize: normalize.toNoSpace
	},
	3:
	{
		message:'Please reply with your marital status (single | married):',
		validate: validation.isMarital,
		normalize: normalize.toLower
	},
	4:
	{
		message:'Please reply with your date of birth (dd/mm/yyyy):',
		validate: validation.isDate,
		normalize: normalize.doNothing
	},
	5:
	{
		message:'Please reply with your gender (male | female):',
		validate: validation.isGender,
		normalize: normalize.toLower
	},
	6:
	{
		message:'Please reply with your city:',
		validate: validation.isName,
		normalize: normalize.toLower
	},
	7:
	{
		message:'Please reply with your email:',
		validate: validation.isEmail,
		normalize: normalize.toLower
	}
}
