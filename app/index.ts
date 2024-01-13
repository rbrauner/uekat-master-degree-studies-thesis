const Tello = require('tello-drone');


class App {
    drone: any;
    currentCommand: string;
    commands: string[];
    locked: boolean;

    constructor() {
        this.drone = new Tello();
        this.currentCommand = "";
        this.commands = [];
        this.locked = false;

        this.drone.on("connection", () => {
            console.log("Connected to drone");
        });
        this.drone.on("state", this.onState.bind(this));
        this.drone.on("send", this.onSend.bind(this));
        this.drone.on("message", this.onMessage.bind(this));

        setInterval(this.consumeCommands.bind(this), 1000);
    }

    consumeCommands() {
        if (this.locked) return;

        this.locked = true;
        const command = this.commands.shift();
        if (command) {
            this.drone.send(command);
        }

        this.locked = false;
    }

    onState(state: number) {
        console.log("Recieved State > ", state);
    }

    onSend(err: Error, length: number) {
        if (err) console.log(err);

        console.log(`Sent command is ${length} long`);
    }

    onMessage(message: string) {
        console.log("Recieved Message > ", message);
    }

    async send(command: string) {
        this.commands.push(command);
    }

    run() {
        try {
            this.send("battery?");
        } catch (error) {
            console.log(error)
            this.drone.send("land")
            setTimeout(process.exit)
        }
    }
}

const app = new App();
app.run();
