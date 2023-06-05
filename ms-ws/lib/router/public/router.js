const express = require("express")
const router = express.Router()

const wsRouter = require("./ws.router.js")

router.use("/ws", wsRouter)

module.exports = router;