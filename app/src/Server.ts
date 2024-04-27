const sdk = require('tellojs');
const commander = require('tellojs/src/exchanger');
import express from "express";
import * as core from "express-serve-static-core";
import WebSocket from "ws";

export class Server {
    private static readonly APP_PORT = 3000;
    private static readonly WS_PORT = 8080;

    private appServer: core.Express|null = null;
    private webSocketServer: WebSocket.Server|null = null;

    constructor() {}

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
        this.appServer?.close();
        this.webSocketServer?.close();
    }

    getAppServer(): core.Express {
        return this.appServer;
    }

    getWebSocketServer(): WebSocket.Server {
        return this.webSocketServer;
    }
}
