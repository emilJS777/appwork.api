const {Schema, model, SchemaType} = require('mongoose');

const TokenSchema = new Schema({
    AccessToken: {
        type: String,
        unique: true,
        require: true,
    },
    
    RefreshToken: {
        type: String,
        unique: true,
        require: true
    },

    UserId: {
        type: Schema.Types.ObjectId,
        require: true,
        unique: true,
        ref: 'User',
    }
})

const Token = module.exports = model('Token', TokenSchema);
const jwt = require('jsonwebtoken')
require('dotenv').config()


// Generate new token
Token.sign = (payload) => {
    // const payload = {id: userId, type: 'access'}
    return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRESS_IN})
}
// Generate new refresh
Token.sign_refresh = (payload) => {
    // const payload = {id: userId, type: 'refresh'}
    return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRESS_IN})
}
//  Save access_token in database
Token.save = async (AccessToken, RefreshToken, UserId) => {
    const tokenByUserId = await Token.findOne({UserId})
    if(!tokenByUserId) return await new Token({AccessToken, RefreshToken, UserId}).save()
    tokenByUserId.AccessToken = AccessToken;
    tokenByUserId.RefreshToken = RefreshToken;
    return await tokenByUserId.save();
}

// token access match
Token.coincidence = async (payload) => {
    const hasToken = await Token.findOne(payload)
    return !!hasToken;
}


// Verify Token
Token.verify = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) return null;
        console.log(decoded);
        return decoded;
    })
}

// Destroy Tokens
Token.destroy = async (userId) => {
    const token = await Token.deleteOne({UserId: userId})
    return token;
}