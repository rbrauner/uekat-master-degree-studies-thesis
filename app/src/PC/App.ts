import { Video } from "./Video";

export class App {
    private video: Video;

    constructor() {
        this.video = new Video();
    }

    async main() {
        try {
            console.log('Start');

            this.video.start();

            console.log('End');
        } catch (error) {
            console.error(error);
            this.video.stop();
        }
    }
}
