const axios = require("axios")
const ApiError = require("@exceptions/api-error")
const BASE_URL = "http://localhost"
const PORT = 5050
const PATH = "api/private/auth/"
const AUTH_URL = `${BASE_URL}:${PORT}/${PATH}`
const METHODS = [
    "authOnly",
    "getUserIdByRequest"
]
module.exports = class AuthTransport {
    static PrepareRequest(req) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                next(ApiError.UnauthorizedError());
            }
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                next(ApiError.UnauthorizedError());
            }
            return accessToken;
        } catch(e) {
            next(ApiError.UnauthorizedError());
        }
    }
    static async GetUserIdByRequest(req, res, next) {
        try {
            const accesstoken = AuthTransport.PrepareRequest(req);
            return new Promise((resolve, reject) => {
                axios({
                    method: "POST",
                    url: AUTH_URL + METHODS[1],
                    headers: {},
                    data: {
                        accesstoken
                    }
                }).then(function (response) {
                    const result = response.data
                    if(result.hasOwnProperty("id")) {
                        resolve(result.id)
                    } else {
                        next(ApiError.UnauthorizedError());
                    }
                }).catch(function (error) {
                    next(ApiError.UnauthorizedError());
                });
            })
        } catch(e) {
            next(ApiError.UnauthorizedError());
        }
    }
    static async AuthOnly(req, res, next) {
        try {
            const accesstoken = AuthTransport.PrepareRequest(req);
            return new Promise((resolve, reject) => {
                axios({
                    method: "POST",
                    url: AUTH_URL + METHODS[0],
                    headers: {},
                    data: {
                        accesstoken
                    }
                }).then(async function (response) {
                    const result = response.data
                    if(result.hasOwnProperty("status")) {
                        if(result.status == "ok") {
                            let userId = await AuthTransport.GetUserIdByRequest(req)
                            if(!userId) {
                                next(ApiError.UnauthorizedError());
                            }
                            req.user = {
                                id: userId
                            }
                            next();
                        } else {
                            next(ApiError.UnauthorizedError());
                        }
                    } else {
                        next(ApiError.UnauthorizedError());
                    }
                }).catch(function (error) {
                    console.log(error)
                    if(error) next(ApiError.UnauthorizedError());
                });
            });
        } catch(e) {
            next(ApiError.UnauthorizedError());
        }
    }
}