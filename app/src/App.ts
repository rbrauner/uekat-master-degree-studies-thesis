const sdk = require('tellojs');
const commander = require('tellojs/src/exchanger');
import { Drone } from "./Drone";
import { Video } from "./Video";

export class App {
    private drone: Drone;
    private video: Video;

    constructor() {
        this.drone = new Drone();
        this.video = new Video();
    }

    async main() {
        try {
            console.log('Start');

            this.video.start();

            let result = null;

            result = await this.drone.connect();
            console.log(`Connect: ${result}`);

            result = (await this.drone.battery()).trim();
            console.log(`Battery: ${result}%`);

            result = await this.drone.streamon();
            console.log(`Streamon: ${result}`);

            while (true) {}

            console.log('End');
        } catch (error) {
            console.error(error);
            await this.drone.stop();
            this.video.stop();
        }
    }
}
