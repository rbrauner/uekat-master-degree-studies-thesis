export class Drone {
    private static HOST = '0.0.0.0';
    private static PORT = 8889;

    constructor() {
    }

    async command(msg: string) {
    }

    async connect() {
        return this.command('command');
    }

    async battery() {
        return this.command('battery?');
    }
}
