const express = require("express")
const router = express.Router();

const privateRouter = require("./private/router.js")
const publicRouter = require("./public/router.js")

router.use("/private", privateRouter)
router.use("/public", publicRouter)

module.exports = router