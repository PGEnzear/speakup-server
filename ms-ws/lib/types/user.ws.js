class UserWsAccount {

    id;

    constructor(id) {
        this.id = id;
    }

}

class UserWsLocation {

    address;
    ip;
    port;

    constructor(ws_connection) {
        const socket = ws_connection._socket

        this.address = socket.address();
        this.ip = socket.remoteAddress
        this.port = socket.remotePort
    }

}

class UserWsPayload {

    isAuthorized;
    account;
    loc;

    async Authorize(id) {
        try {
            this.isAuthorized = true
            this.account = new UserWsAccount(id)
        } catch(e) {
            console.log(e)
        }
    }

    constructor(ws_connection) {
        this.isAuthorized = false;
        this.account = null

        this.loc = new UserWsLocation(ws_connection);
    }

}

class UserWS {

    uuid;
    ws_connection;

    payload;

    constructor(uuid, ws_connection) {
        this.uuid = uuid;
        this.ws_connection = ws_connection;

        this.payload = new UserWsPayload(ws_connection);
    }
    
}

module.exports = {
    UserWS,
    UserWsPayload,
    UserWsLocation,
    UserWsAccount
}