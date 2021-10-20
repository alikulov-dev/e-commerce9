const express = require("express");
const router = express.Router();
const UserController = require('../../controller/user')
const {isAuth} = require('../../middleware/isAuth')
router.post('/create',isAuth,UserController.register)
router.post('/login',UserController.auth);
router.post('/log-out',isAuth,UserController.logout)
router.get("/login",UserController.login);
module.exports = router;
