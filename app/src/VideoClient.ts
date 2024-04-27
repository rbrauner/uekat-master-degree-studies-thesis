import { spawn } from "child_process";
import { Socket, createSocket } from "dgram";

export class VideoClient {
    private static HOST = '0.0.0.0';
    private static PORT = 11111;

    private server: Socket;

    constructor() {
        this.server = createSocket('udp4');
    }

    startServer() {
        this.server.on('message', (msg, rinfo) => {
            // TODO: Implement video processing
        });

        this.server.on('listening', () => {
            const address = this.server.address();
            console.log(`Server listening ${address.address}:${address.port}`);
        });

        this.server.on('error', (err) => {
            console.error(`Server error:\n${err.stack}`);
            this.server.close();
        });

        this.server.bind(VideoClient.PORT, VideoClient.HOST);
    }

    startMpv() {
        const args = [
            "--no-cache",
            `udp://${VideoClient.HOST}:${VideoClient.PORT}`
        ];

        const player = spawn('mpv', args);
        player.stderr.pipe(process.stderr);
        player.on("exit", function (code: any) {
            console.log("Player exited with code", code);
        });
    }

    startFfmpegToHttp(url: string) {
        var args = [
            "-i", `udp://${VideoClient.HOST}:${VideoClient.PORT}`,
            "-r", "30",
            "-s", "960x720",
            "-codec:v", "mpeg1video",
            "-b", "800k",
            "-f", "mpegts",
            url
        ];

        var streamer = spawn('ffmpeg', args);
        streamer.stderr.pipe(process.stderr);
        streamer.on("exit", function (code: any) {
            console.log("Failure", code);
        });
    }

    startFfmpegToFile(file: string) {
        var args = [
            "-i", `udp://${VideoClient.HOST}:${VideoClient.PORT}`,
            "-r", "30",
            "-s", "960x720",
            "-codec:v", "copy",
            "-f", "mpegts",
            file
        ];

        var streamer = spawn('ffmpeg', args);
        streamer.stderr.pipe(process.stderr);
        streamer.on("exit", function (code: any) {
            console.log("Failure", code);
        });
    }

    stop() {
        this.server.close();
    }
}
