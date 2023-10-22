import dotenv from 'dotenv'
import { WebSocketServer } from 'ws'
import Data from './data'

dotenv.config()

const uri = process.env.URI

export default class Server {
    serverQueue: number
    port: number
    uri: string
    public static id: string

    constructor(uri: string, port: number, queue: number, id: string) {
        this.uri = uri
        this.port = port
        this.serverQueue = queue
        Server.id = id
    }

    public static startupWebSocket(port: number) {
        const wss = new WebSocketServer({ port: port }, () => {
            console.log(`Server is listening on port: ${port}`)
        })

        wss.on('connection', (ws) => {
            console.log('Controller connected')

            ws.on('message', (data) => {
                Data.handle(data.toString(), ws, Server.id)
            })
        })
    }
}

const worker = new Server(uri, parseInt(process.env.PORT), 0, process.env.ID)
Server.startupWebSocket(worker.port)
