const Tello = require('tello-drone');

const drone = new Tello();

drone.on("connection", () => {
    console.log("Connected to drone");
});

drone.on("state", (state: number) => {
    console.log("Recieved State > ", state);
});

drone.on("send", (err: Error, length: number) => {
    if (err) console.log(err);

    console.log(`Sent command is ${length} long`);
});

drone.on("message", (message: string) => {
    console.log("Recieved Message > ", message);
});

drone.on("connection", async () => {
    try {
        await drone.send("battery?");
    } catch (error) {
        console.log(error)
        drone.send("land")
        setTimeout(process.exit)
    }
});
