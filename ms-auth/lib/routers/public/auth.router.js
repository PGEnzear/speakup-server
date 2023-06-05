const express = require("express");
const router = express.Router();

const {body} = require('express-validator');

const authOnly = require("@middlewares/authOnly.js")

const UserController = require("../../controllers/User.controller")

router.post("/login",
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    UserController.login
);

router.post("/logout",
    UserController.logout
);

router.post("/register",
    body('email').isEmail(),
    body('firstname').isLength({min: 2, max: 42}),
    body('lastname').isLength({min: 2, max: 42}),
    body('password').isLength({min: 4, max: 32}),
    UserController.registration
);

router.post("/refresh",
    UserController.refresh
);

router.post("/changePassword",
    body('oldPassword').isLength({min: 3, max: 32}),
    body('newPassword').isLength({min: 3, max: 32}),
    UserController.changePassword
);

router.post("/isLogin", authOnly, (req, res) => {
    res.send("ok")
})

router.post("/forgotPassword",
    UserController.forgotPassword
);

router.post("/changeForgotPassword",
    UserController.changeForgotPassword
);

router.get('/activate/:link',
    UserController.activate
);

module.exports = router