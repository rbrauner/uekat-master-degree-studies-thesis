export class App {
    async main() {
        try {
            console.log(1);
            // console.log('Start');

            // await sdk.control.connect();
            // console.log('SDK - Connect');

            // const videoEmitter = await sdk.receiver.video.bind();
            // videoEmitter.on('message', (res: any) => console.log);
            // console.log('SDK - video emitter');

            // while (true) {
            //     // console.log(1);
            // }

            // // sdk.receiver.video.close();

            // console.log('End');
        } catch (error) {
            // await sdk.control.land();
            console.error(error);
        }
    }
}
