const path = require("path")
require("dotenv").config({
    path: path.join(__dirname, ".env")
})
require('module-alias/register')

const errorHandler = require("./middlewares/error-middleware")

const router = require("./router/router")

const express = require("express")
const WebSocketServer = require("./ws.server")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json());

app.use("/api", router)
app.use(errorHandler)

const API_PORT = process.env.API_PORT
const WS_PORT = process.env.WS_PORT

WebSocketServer.setPort(WS_PORT)

const startAPIServer = async (port) => {
    return new Promise((resolve, reject) => {
        try {
            app.listen(port, () => {
                console.log(`Api Server started on port ${port}`)
                return resolve(true)
            })
        } catch(e) {
            console.warn(e)
            return reject(e)
        }
    })
};

const startWSServer = async () => {
    try {
        await WebSocketServer.start();
        console.log(`WS Server started on port ${WS_PORT}`)
    } catch(e) {
        console.warn(e)
        return e;
    }
}

const start = async () => {
    try {
        await startWSServer();
        await startAPIServer(API_PORT);
        return true
    } catch(e) {
        console.log(e)
    }
}

start().then(r => {
    if(r) {
        console.log("App started successfully")
    }
})