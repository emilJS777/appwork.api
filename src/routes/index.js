const router = require('express').Router();

// auth routes
router.use('/auth', require('./auth.router'))
// user routes
router.use('/user', require('./user.router'))

module.exports = router;