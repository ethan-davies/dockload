import { WebSocketServer } from "ws";
import Data from "./data";

export default class Server {
    serverQueue: number
    port: number
    uri: string

    constructor(uri: string, port: number, queue: number) {
        this.uri = uri;
        this.port = port;
        this.serverQueue = queue;
    }

    public static startupWebSocket(port: number) {
        const wss = new WebSocketServer({ port: port }, () => {
            console.log(`Server is listening on port: ${port}`);
        });

        wss.on('connection', (ws) => {
            console.log('Controller connected');

            ws.on('message', (data) => {
                Data.handle(data.toString(), ws);
            })
            
        })

    }
}

const worker = new Server('ws://localhost', 8080, 0);
Server.startupWebSocket(worker.port);
