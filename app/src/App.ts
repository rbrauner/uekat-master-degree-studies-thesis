import { Drone } from "./Drone";
import { VideoClient } from "./VideoClient";

export class App {
    private drone: Drone;
    private videoClient: VideoClient;

    constructor() {
        this.drone = new Drone();
        this.videoClient = new VideoClient();
    }

    async main() {
        try {
            console.log('Start');

            await this.drone.connect();
            console.log('Drone connected');

            const battery = await this.drone.battery();
            console.log(`Battery: ${battery}%`);

            console.log('End');
        } catch (error) {
            // await sdk.control.land();
            console.error(error);
        }
    }
}
