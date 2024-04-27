import { Socket, createSocket } from "dgram";

export class VideoClient {
    private static HOST = '0.0.0.0';
    private static PORT = 11111;

    private server: Socket;
    constructor() {
        this.server = createSocket('udp4');
        this.server.on('message', (msg, rinfo) => {
            console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        });
        this.server.on('listening', () => {
            const address = this.server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        this.server.on('error', (err) => {
            console.error(`server error:\n${err.stack}`);
            this.server.close();
        });
        this.server.bind(VideoClient.PORT, VideoClient.HOST);
    }
}
