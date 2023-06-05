const axios = require("axios")
const ApiError = require("../api-error")
const BASE_URL = "http://localhost"
const PORT = 7075
const PATH = "api/private/auth/"
const AUTH_URL = `${BASE_URL}:${PORT}/${PATH}`
const METHODS = [
    "messageNew",
    "messageDeleted",
    "messageChanged",
    "chatDeleted",
    "chatCreated",
    "chatRenamed",
    "notification"
]
module.exports = class AuthTransport {
    async messageNew() {

    }
    async messageDeleted() {

    }
    async messageChanged() {

    }
    async chatDeleted() {

    }
    async chatCreated() {

    }
    async chatRenamed() {

    }
    async notification() {
        
    }
}