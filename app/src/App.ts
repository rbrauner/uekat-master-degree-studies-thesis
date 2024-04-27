const { Drone } = require('./Drone');

export class App {
    async main() {
        try {
            console.log('Start');

            const drone = new Drone();
            console.log('Drone created');

            await drone.connect();
            console.log('Drone connected');

            const battery = await drone.battery();
            console.log(`Battery: ${battery}%`);

            console.log('End');
        } catch (error) {
            // await sdk.control.land();
            console.error(error);
        }
    }
}
