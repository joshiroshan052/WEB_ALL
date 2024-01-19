const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/verify/:id', userController.verifyMail);

router.post('/forgot/password', userController.forgotPassword);
router.put('/password/reset/:token', userController.resetPassword);

module.exports = router;
