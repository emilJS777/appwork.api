const router = require('express').Router()
const {userGet} = require('../controllers').userController
const auth = require('../middlewares/auth')

router
    .route('/')
    .get(auth, userGet)


module.exports = router;