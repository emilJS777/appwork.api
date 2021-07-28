const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const validate = (schema) => async (req,res,next) => {
    await schema.validateAsync(req.body).then(() => next())
        .catch(err => res.send(new ApiError(httpStatus.BAD_REQUEST, err.details[0].message)))
    
}


module.exports = validate;