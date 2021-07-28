const {userModel, tokenModel} = require('../models')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')
const httpStatus = require('http-status')



// Login account
const loginAccount = async (email, password, res) => {
    // if the user does not exist or the password does not match return new api error
    const user = await userModel.getOne({Email: email})
    if(!user || !userModel.passwordCompare(password, user.PasswordHash))
        return res.send(new ApiError(httpStatus.NO_CONTENT, 'email and/or password are not correct'))
    
    // generate a pair of tokens 
    const access = tokenModel.sign({id: user._id, type: 'access'})
    const refresh = tokenModel.sign_refresh({id: user._id, type: 'refresh'})
    const {AccessToken, RefreshToken} = await tokenModel.save(access, refresh, user._id)

    // and bring them back 
    return res.send(new ApiResponse({AccessToken, RefreshToken}));
}



// Registration create new account
const createAccount = async (email, password, firstName, lastName, res) => {
    // if the email is taken to return the conflict
    if((await userModel.emailIsTaken(email))) 
        return res.send(new ApiError(httpStatus.CONFLICT, 'Email is taken'));

    // if it doesn't exist, hash the password and create a new user
    const passwordHash = userModel.passwordHash(password);
    const newUser = await userModel.create(email, passwordHash, firstName, lastName)
    // and return the user
    return res.send(new ApiResponse(newUser));
}



// Refresh Token
const refreshPairTokens = async (refreshToken, res) => {
    // verify refresh token
    const decoded = tokenModel.verify(refreshToken)
    if(!decoded || decoded.type !== 'refresh' || !(await tokenModel.coincidence({RefreshToken: refreshToken, UserId: decoded.id})))
        return res.send(new ApiError(httpStatus.BAD_REQUEST, 'no correct refresh token'))

    // generate a pair of tokens and get
    const access = tokenModel.sign({id: decoded.id, type: 'access'})
    const refresh = tokenModel.sign_refresh({id: decoded.id, type: 'refresh'})
    // save tokens and return result
    const {AccessToken, RefreshToken} = await tokenModel.save(access, refresh, decoded.id)
    return res.send(new ApiResponse({AccessToken, RefreshToken}))
}



// Logout desrtoy user tokens
const desroyPairTokens = async (userId, res) => {
    const removeToken = await tokenModel.destroy(userId)
    if(!removeToken)
        return res.send(new ApiError(httpStatus.NOT_FOUND, 'pair tokens not found'))
    return res.send(new ApiResponse())
}

module.exports = {
    loginAccount,
    createAccount,
    refreshPairTokens,
    desroyPairTokens,
}
