const { check, validationResult } = require('express-validator');

exports.validateLoginRules = () => {
	return [
		check('email').not().isEmpty().withMessage("required").isEmail().withMessage("email"),
		check('password').not().isEmpty().withMessage("required").isLength({min: 4}).withMessage("minLength").isLength({max: 32}).withMessage("maxLength")
	]
}

exports.validateMenuRules = () => {
	return [
		check('name').not().isEmpty().withMessage("required"),
        check('category').not().isEmpty().withMessage("required"),
        check('description').not().isEmpty().withMessage("required"),
        check('price').not().isEmpty().withMessage("required")
	]
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      	return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        param: err.param, 
        message: err.msg 
    }))
  
    return res.status(422).json({
		status: 422,
      	errors: extractedErrors,
    })
}