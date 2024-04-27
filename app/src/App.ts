const { Tello } = require('./Tello');

export class App {
    async main() {
        try {
            console.log('Start');

            const tello = new Tello();
            await tello.connect();
            console.log('Tello - Connect');

            const battery = (await tello.battery()).trim();
            console.log(`Tello - Battery: ${battery}%`);

            console.log('End');
        } catch (error) {
            // await sdk.control.land();
            console.error(error);
        }
    }
}
