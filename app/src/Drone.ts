export class Drone {
    private static HOST = '0.0.0.0';
    private static PORT = 8889;

    constructor() {
    }

    async command(msg: string): Promise<any> {
    }

    async connect(): Promise<string> {
        return this.command('command');
    }

    async battery(): Promise<number> {
        return this.command('battery?');
    }
}
