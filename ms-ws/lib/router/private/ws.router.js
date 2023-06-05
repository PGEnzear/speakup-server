const express = require("express")
const router = express.Router()

const {body} = require('express-validator');

const TransportController = require("@controllers/Transport.controller.js")

router.post("/chatCreated",
    body("userId"),
    body("chatId"),
    TransportController.ChatCreated
)

router.post("/chatDeleted",
    body("userId"),
    body("chatId"),
    TransportController.ChatDeleted
)

router.post("/chatRenamed",
    body("userId"),
    body("chatId"),
    TransportController.ChatRenamed
)

router.post("/messageNew",
    body("userId"),
    body("messageId"),
    TransportController.MessageNew
)

router.post("/messageDeleted",
    body("userId"),
    body("messageId"),
    TransportController.MessageDeleted
)

router.post("/messageChanged",
    body("userId"),
    body("messageId"),
    TransportController.MessageChanged
)

module.exports = router;