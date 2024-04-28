import { Socket, createSocket } from "dgram";
import WebSocket from "ws";

export class VideoServer {
    private static HOST = '0.0.0.0';
    private static PORT = 11111;

    private server: Socket;

    constructor() {
        this.server = createSocket('udp4');
    }

    start(ws: WebSocket.Server | null) {
        this.server.on('message', (msg, rinfo) => {
            ws?.clients.forEach((client: any) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(msg);
                }
            });
        });

        this.server.on('listening', () => {
            const address = this.server.address();
            console.log(`Server listening ${address.address}:${address.port}`);
        });

        this.server.on('error', (err) => {
            console.error(`Server error:\n${err.stack}`);
            this.server.close();
        });

        this.server.bind(VideoServer.PORT, VideoServer.HOST);
    }

    stop() {
        this.server.close();
    }
}
