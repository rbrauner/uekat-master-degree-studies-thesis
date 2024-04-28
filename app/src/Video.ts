import { Socket, createSocket } from "dgram";
import { spawn } from "child_process";

export class Video {
    private static HOST = '0.0.0.0';
    private static PORT = 11111;

    private server: Socket;
    private videoPlayerProcess: any;

    constructor() {
        this.server = createSocket('udp4');
    }

    start() {
        this.server.on('message', (msg, rinfo) => {
            if (!this.videoPlayerProcess) {
                this.videoPlayerProcess = spawn('ffplay', ['-']);
                // this.videoPlayerProcess = spawn('mpv', ['-']);
            }

            this.videoPlayerProcess.stdin.write(msg);
        });

        this.server.on('listening', () => {
            const address = this.server.address();
            console.log(`Server listening ${address.address}:${address.port}`);
        });

        this.server.on('error', (err) => {
            console.error(`Server error:\n${err.stack}`);
            this.server.close();
        });

        this.server.bind(Video.PORT, Video.HOST);
    }

    stop() {
        if (this.videoPlayerProcess) {
            this.videoPlayerProcess.kill();
        }
        this.server.close();
    }
}
