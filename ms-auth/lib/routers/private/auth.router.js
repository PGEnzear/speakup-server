const express = require("express");
const router = express.Router();

const {body} = require('express-validator');

const TransportController = require("@controllers/Transport.controller.js")

router.post("/authOnly",
    body('accesstoken').notEmpty(),
    TransportController.AuthOnly
)

router.post("/getUserIdByRequest",
    body('accesstoken').notEmpty(),
    TransportController.GetUserIdByRequest
)

module.exports = router