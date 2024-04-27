import { Socket, createSocket } from "dgram";

export class VideoClient {
    private static HOST = '0.0.0.0';
    private static PORT = 11111;

    private server: Socket;
    constructor() {
        this.server = createSocket('udp4');
        this.server.on('message', (msg, rinfo) => {
            console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        });
        this.server.on('listening', () => {
            const address = this.server.address();
            console.log(`Server listening ${address.address}:${address.port}`);
        });
        this.server.on('error', (err) => {
            console.error(`Server error:\n${err.stack}`);
            this.server.close();
        });
    }

    start() {
        this.server.bind(VideoClient.PORT, VideoClient.HOST);
    }

    stop() {
        this.server.close();
    }
}
