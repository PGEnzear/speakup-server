const express = require("express")
const router = express.Router();

const messageRouter = require("./message.router")
const chatRouter = require("./chat.router")

router.use("/message", messageRouter)
router.use("/chat", chatRouter)

module.exports = router