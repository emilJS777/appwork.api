const {userModel} = require('../models')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const httpStatus = require('http-status')

const userGetById = async (userId, res) => {
    const user = userModel.cacheGetById(userId)
    if(!user) return res.send(new ApiError(httpStatus.UNAUTHORIZED, 'not correct user-id'))
    const {Email, EmailActive, FirstName, LastName, Wallet} = user;
    res.send(new ApiResponse({Email, EmailActive, FirstName, LastName, Wallet}))
}   

module.exports = {
    userGetById,
}