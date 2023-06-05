const express = require("express")
const router = express.Router()

const wsRouter = require("./ws.router")

router.use("/ws", wsRouter)

module.exports = router;