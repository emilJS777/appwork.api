const {createAccount, loginAccount, refreshPairTokens, desroyPairTokens} = require('../services').authService;
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')

const login = async (req, res) => {
    const {Email, Password} = req.body;
    await loginAccount(Email, Password, res);
}

const registration = async (req, res) => {
    const {Email, Password, FirstName, LastName} = req.body;
    await createAccount(Email, Password, FirstName, LastName, res);
}

const refreshToken = async (req, res) => {
    await refreshPairTokens(req.body.RefreshToken, res);
}

const logout = async (req, res) => {
    const userId = req.user;
    await desroyPairTokens(userId, res);
}

module.exports = {
    login,
    registration,
    refreshToken,
    logout,
}