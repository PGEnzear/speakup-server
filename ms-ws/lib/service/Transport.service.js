const WsServer = require("../ws.server")

class TransportService {

    getWsClientById(id) {
        try {
            const wsClients = WsServer.clients;

            let wsClient = null;

            for (let client of wsClients.values()) {
                if(client.payload.isAuthorized) {
                    if(client.payload.account.id == id) {
                        wsClient = client
                        break;
                    }
                }
            }

            if(!wsClient) {
                return ApiError.UnauthorizedError("Ws Connection not found");
            }

            return wsClient
        } catch(e) {
            console.log(e)
            return ApiError.UnauthorizedError("Ws Connection not found");
        }
    }

}

module.exports = new TransportService();