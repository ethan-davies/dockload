export default class Data {
    public static handle(message: any, ws: any) {
        console.log('[CONTROLLER] ' + message);
        ws.send(`Received your message: ${message}`);
    }
}