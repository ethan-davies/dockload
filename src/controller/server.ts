import WebSocket from 'ws'

export default class Server {
    serverQueue: number
    port: number
    ip: string
    ws: WebSocket | null

    constructor(ip: string, port: number, queue: number, ws: WebSocket | null) {
        this.ip = ip
        this.port = port
        this.serverQueue = queue
        this.ws = ws
    }

    public static async connectToServer(server: Server): Promise<void> {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(`ws://${server.ip}:${server.port}`)
            server.ws = ws

            ws.on('open', () => {
                console.log(
                    `[CONTROLLER] Connected to ${server.ip}:${server.port}`
                )
                ws.send(JSON.stringify({ test: 'should not handle' }))
                resolve() // Resolve the promise when the connection is established.
            })

            ws.on('message', (data) => {
                console.log(`[SERVER] ${data}`)
            })
        })
    }
}
