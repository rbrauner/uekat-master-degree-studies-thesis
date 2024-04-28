const sdk = require('tellojs');
const commander = require('tellojs/src/exchanger');
import express, { Express } from "express";
import WebSocket from "ws";

export class Server {
    private static readonly APP_PORT = 3000;
    private static readonly WS_PORT = 8080;

    private appServer: Express | null = null;
    private webSocketServer: WebSocket.Server | null = null;

    constructor() { }

    async start() {
        this.appServer = express();

        this.appServer.get('/', (req: any, res: any) => {
            res.sendFile(__dirname + '/view/index.html');
        });

        this.appServer.listen(Server.APP_PORT, () => {
            console.log(`Express server listening on port ${Server.APP_PORT}`);
        });

        this.webSocketServer = new WebSocket.Server({ port: Server.WS_PORT });
    }

    async stop() {
        // TODO: typescript
        // this.appServer?.close();
        this.webSocketServer?.close();
    }

    getAppServer(): Express | null {
        return this.appServer;
    }

    getWebSocketServer(): WebSocket.Server | null {
        return this.webSocketServer;
    }
}
