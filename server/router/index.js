const Router = require('express').Router;
const userController = require('../controllers/user-controller');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activateLink);
router.get('/refresh', userController.refreshToken);
router.get('/users', userController.getUsers);

module.exports = router;