const WebSocket = require('ws');
const { v4 : uuidv4 }  = require("uuid")

const { UserWS } = require("@types/user.ws")

class WSS {

    clients;
    wss;
    port;

    sendMessage(ws, data) {
        try {
            const message = {
                "time": Date.now(),
                "date": new Date(),
                data
            }
            const msg = JSON.stringify(message); 
            ws.send(msg)
        } catch(e) {
            console.log(e)
        }
    }

    setPort(port) {
        this.port = port;
    }

    constructor() {
        this.clients = new Map();
    }

    async start() {
        console.log(UserWS)
        return new Promise((resolve, reject) => {
            try {
                this.wss = new WebSocket.Server({ port: this.port });

                this.wss.on('connection', (ws) => {
                    const id = uuidv4();

                    const wsUser = new UserWS(id, ws)

                    this.sendMessage(ws, {
                        "uuid": id
                    })

                    this.clients.set(ws, wsUser);
                
                    ws.on('message', (messageAsString) => {
                        console.log(messageAsString)
                    })
        
                    ws.on("close", () => {
                        console.log("disconnect")
                        this.clients.delete(ws);
                    });
                });

                return resolve(true)
            } catch(e) {
                console.warn(e);
                return reject(e)
            }
        })
    }

}

module.exports = new WSS();