export class Video {
    private ffmpegProcess: any;
    private ffplayProcess: any;

    constructor() {
    }

    start() {
    }

    stop() {
        if (this.ffmpegProcess) {
            this.ffmpegProcess.kill();
        }
        if (this.ffplayProcess) {
            this.ffplayProcess.kill();
        }
    }
}
