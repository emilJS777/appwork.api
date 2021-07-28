const router = require('express').Router();
const {login, registration, refreshToken, logout} = require('../controllers').authController;
const {registrationSchema, loginSchema, refreshTokenSchema} = require('../validations').authValidation;
const validate = require('../middlewares/validate')
const auth = require('../middlewares/auth')

router
    .route('/login')
    .post(validate(loginSchema), login)

router
    .route('/registration')
    .post(validate(registrationSchema), registration)

router
    .route('/refresh-token')
    .post(validate(refreshTokenSchema), refreshToken)

router
    .route('/logout')
    .delete(auth, logout)
    
router
    .route('/confirm-token')
    .get(auth, (req,res) => res.send({success:true, userId: req.user}))



module.exports = router