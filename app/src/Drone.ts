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

    async land() {
        return sdk.control.land();
    }

    async stop() {
        return this.land();
    }
}
