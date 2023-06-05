const {validationResult} = require('express-validator');

const ApiError = require("@exceptions/api-error.js")

const WsServer = require("../ws.server")

const AuthTransport = require("@transport/AuthTransport")

class WsController {

    async AuthtorizeUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const {accesstoken, ws_uuid} = req.body;

            const wsClients = WsServer.clients;

            let wsClient = null;

            for (let client of wsClients.values()) {
                if(client.uuid == ws_uuid) {
                    wsClient = client
                    break;
                }
            }

            if(!wsClient) {
                return next(ApiError.UnauthorizedError("Ws Connection not found"))
            }

            const ws_connection = wsClient.ws_connection

            const id = await AuthTransport.GetUserIdByAccessToken(accesstoken)
            
            if(!id) {
                return next(ApiError.UnauthorizedError("Invaid AccessToken"))
            }

            WsServer.sendMessage(ws_connection, {
                "message": `Ws Connection ${ws_uuid} successfully authtorized`
            })

            wsClient.payload.Authorize(id);

            res.json({
                "message": "Ws connection successfully authtorized"
            })
        } catch(e) {
            return next(ApiError.UnauthorizedError("Invaid AccessToken"))
        }
    }

}

module.exports = new WsController();