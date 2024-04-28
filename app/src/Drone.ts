const sdk = require('tellojs');
const commander = require('tellojs/src/exchanger');

export class Drone {
    async connect() {
        return sdk.control.connect();
    }

    async battery() {
        return sdk.read.battery();
    }

    async streamon() {
        return commander.send('streamon');
    }

    async streamoff() {
        return commander.send('streamoff');
    }

    async land() {
        return sdk.control.land();
    }

    async stop() {
        await this.land();
        await this.streamoff();
    }
}
