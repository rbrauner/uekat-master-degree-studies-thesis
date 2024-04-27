const sdk = require('tellojs');
const commander = require('tellojs/src/exchanger');
import express from "express";
import * as core from "express-serve-static-core";

export class Server {
    private app: core.Express;

    constructor() {
        this.app = express();
    }

    async start(port: number) {
        this.app.get('/', (req: any, res: any) => {
            res.sendFile(__dirname + '/view/index.html');
        });

        this.app.listen(port, () => {
            console.log(`Express server listening on port ${port}`);
        });
    }

    async stop() {
        this.app.close();
    }
}
