const sdk = require('tellojs');
const commander = require('tellojs/src/exchanger');
import { VideoClient } from "./VideoClient";

export class App {
    private videoClient: VideoClient;

    constructor() {
        this.videoClient = new VideoClient();
    }

    async main() {
        try {
            console.log('Start');

            // this.videoClient.start();
            // console.log('VideoClient started');

            // this.videoClient.startMpv();
            // console.log('VideoClient mpv started');

            let result = null;

            result = await sdk.control.connect();
            console.log(`Connect: ${result}`);

            result = (await sdk.read.battery()).trim();
            console.log(`Battery: ${result}%`);

            result = await commander.send('streamon');
            console.log(`Streamon: ${result}`);

            // this.videoClient.stop();
            // console.log('VideoClient stopped');

            console.log('End');
        } catch (error) {
            console.error(error);
            await sdk.control.land();
            this.videoClient.stop();
        }
    }
}
