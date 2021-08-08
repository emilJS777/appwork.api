const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status')
const {tokenModel} = require('../models')

const auth = async (req, res, next) => {

    // find token in headers
    const userToken = req.headers.authorization

    // token verify
    const decoded = tokenModel.verify(userToken)

    // token match
    if(!decoded || decoded.type !== 'access' || !tokenModel.cacheCoincidence({AccessToken: userToken, UserId: decoded.id}))
        return res.send(new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized'))
    
    req.user = decoded.id;
    next()
}

module.exports = auth;