import { Socket, createSocket } from "dgram";

export class Drone {
    private static HOST = '192.168.10.1';
    private static PORT = 8889;

    private client: Socket;

    constructor() {
        this.client = createSocket('udp4');
    }

    async command(msg: string): Promise<any> {
        return this.client.send(msg, Drone.PORT, Drone.HOST);
    }

    async connect(): Promise<string> {
        return this.command('command');
    }

    async battery(): Promise<number> {
        return this.command('battery?');
    }
}
