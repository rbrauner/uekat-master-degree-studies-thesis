const sdk = require('tellojs');
const commander = require('tellojs/src/exchanger');
import { Drone } from "./Drone";
import { Server } from "./Server";
import { VideoServer } from "./VideoServer";

export class App {
    private drone: Drone;
    private server: Server;
    private videoServer: VideoServer;

    constructor() {
        this.drone = new Drone();
        this.server = new Server();
        this.videoServer = new VideoServer();
    }

    async main() {
        try {
            console.log('Start');

            this.server.start();

            // this.videoClient.start();
            // console.log('VideoClient started');

            // this.videoClient.startMpv();
            // console.log('VideoClient mpv started');

            let result = null;

            result = await this.drone.connect();
            console.log(`Connect: ${result}`);

            result = (await this.drone.battery()).trim();
            console.log(`Battery: ${result}%`);

            result = await this.drone.streamon();
            console.log(`Streamon: ${result}`);

            // this.videoClient.stop();
            // console.log('VideoClient stopped');

            console.log('End');
        } catch (error) {
            console.error(error);
            await this.drone.stop();
            this.server.stop();
            this.videoServer.stop();
        }
    }
}
