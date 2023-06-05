const path = require("path")
require('dotenv').config({
    path: path.join(__dirname, ".env"),
    encoding: "utf8"
})
require('module-alias/register')
const express = require('express')
const router = require('@routers/router.js')
const database = require('@database/db.js')
const configure = require("@utils/configure.js");
const errorMiddleware = require('@middlewares/error-middleware');

require('@models/models.js')

const app = express()

configure(app)
app.use("/api", router);
app.use(errorMiddleware);

const appPORT = process.env.PORT;

const start = async () => {
    try {
        await database.authenticate()
        await database.sync()
        app.listen(appPORT, () => console.log(`Message service started on port ${appPORT} at ${new Date()}`))
    } catch (e) {
        console.log(e)
    }
}

start()