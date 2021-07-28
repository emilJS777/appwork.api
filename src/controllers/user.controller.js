const {userGetById} = require('../services').userService;

const userGet = async (req, res) => {
    const userId = req.user;
    await userGetById(userId, res)
}



module.exports = {
    userGet,
}