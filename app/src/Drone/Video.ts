import { Socket, createSocket } from "dgram";
import { spawn } from "child_process";

export class Video {
    private static HOST = '0.0.0.0';
    private static PORT = 11111;

    private server: Socket;
    private ffmpegProcess: any;
    private ffplayProcess: any;

    constructor() {
        this.server = createSocket('udp4');
    }

    start() {
        this.server.on('message', (msg, rinfo) => {
            if (!this.ffmpegProcess) {
                this.ffmpegProcess = spawn('ffmpeg', [
                    '-i', 'pipe:0',
                    '-vf', 'drawtext=text=\'Przykładowy tekst\':x=10:y=10:fontsize=24:fontcolor=red',
                    '-f', 'mpegts',
                    'pipe:1'
                ]);
                this.ffplayProcess = spawn('ffplay', ['-i', '-']);
                this.ffmpegProcess.stdout.pipe(this.ffplayProcess.stdin);
            }

            this.ffmpegProcess.stdin.write(msg);
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
        if (this.ffmpegProcess) {
            this.ffmpegProcess.kill();
        }
        if (this.ffplayProcess) {
            this.ffplayProcess.kill();
        }
        this.server.close();
    }
}
