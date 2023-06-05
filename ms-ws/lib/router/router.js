const express = require("express")
const router = express.Router()

const publicRouter = require("./public/router")
const privateRouter = require("./private/router")

router.use("/public", publicRouter)
router.use("/private", privateRouter)

module.exports = router;