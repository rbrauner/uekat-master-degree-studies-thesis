const sdk = require('tellojs')

class App {
    async main() {
        await sdk.control.connect();

        const battery = await sdk.read.battery();

        console.log(`Battery: ${battery}`);
    }
}

const app = new App();
app.main();
