const express = require("express");
const WsController = require("@controllers/Ws.controller");
const router = express.Router()

const {body} = require('express-validator');

router.post("/authorize", 
    body("accesstoken").notEmpty(),
    body("ws_uuid").notEmpty(),
    WsController.AuthtorizeUser)

module.exports = router;