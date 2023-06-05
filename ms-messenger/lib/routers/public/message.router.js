const MessageController = require("../../controllers/Message.controller")
const express = require("express")
const router = express.Router();

const { body } = require('express-validator');

router.get("/getLastMessages", 
  body('limit').notEmpty().isNumeric(),
  body('chatId').notEmpty().isNumeric(),
  MessageController.getLastMessages
)

router.get("/getMessage",
  body("messageId").notEmpty().isNumeric(),
  MessageController.getMessage
)

router.get("/getMessages",
  body("chatId").notEmpty().isNumeric(),
  body('limit').notEmpty().isNumeric(),
  MessageController.getMessages
)

router.post("/sendMessage", 
  body('message').notEmpty(),
  body('chatId').notEmpty().isNumeric(),
  MessageController.sendMessage
)

router.post("/deleteMessage", 
  body('messageId').notEmpty().isNumeric(),
  MessageController.deleteMessage
)
router.post("/editMessage", 
  body('messageId').notEmpty().isNumeric(),
  body('message').notEmpty(),
  MessageController.editMessage
)

module.exports = router