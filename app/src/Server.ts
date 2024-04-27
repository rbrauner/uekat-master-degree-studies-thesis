const sdk = require('tellojs');
const commander = require('tellojs/src/exchanger');
import { VideoClient } from "./VideoClient";
import express from "express";
import { spawn } from "child_process";


export class Server {
    private static HOST = '0.0.0.0';
    private static PORT = 11111;

    private app: any;

    constructor() {
        this.app = express();
    }

    async start(port: number) {
        // Ścieżka /
        this.app.get('/', (req: any, res: any) => {
            res.send('<video src="/stream" autoplay></video>');
        });

        this.app.get('/stream', (req: any, res: any) => {
            res.contentType('mpegts');
            const args = [
                "-i", `udp://${Server.HOST}:${Server.PORT}`,
                "-vf", "scale=960:720",
                "-c:v", "libx264",
                "-hls_time", "2",
                "-hls_list_size", "5",
                "-start_number", "0",
                "-f", "hls",
                "output.m3u8"
            ];

            const ffmpeg = spawn('ffmpeg', args);
            ffmpeg.stdout.pipe(res);
            ffmpeg.stderr.pipe(process.stderr);
            ffmpeg.on('error', (err) => {
                console.error('FFmpeg error:', err);
            });
        });

        this.app.listen(port, () => {
            console.log(`Express server listening on port ${port}`);
        });
    }
}
