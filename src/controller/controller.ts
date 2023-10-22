import Server from './server' // Adjust the path as needed

export default class Controller {
    public static serverOne: Server
    public static servers: Server[]

    public static async initialize() {
        console.log('Initializing controller')
        this.serverOne = new Server('localhost', 8080, 0, null)
        const serverTwo = new Server('localhost', 8081, 5, null)
        const serverThree = new Server('localhost', 8082, 3, null)
        this.servers = [this.serverOne, serverTwo, serverThree]

        try {
            await Server.connectToServer(this.serverOne)
            await this.sendWorkToServer(Controller.servers, 'Hello')
        } catch (error) {
            console.log(`Failed to connect to server`)
        }
    }

    public static async sendWorkToServer(servers: Server[], payload: string) {
        if (servers && servers.length > 0) {
            const lowestPriorityServer = this.findLowestPriorityServer(servers)
            console.log(lowestPriorityServer.serverQueue)
            lowestPriorityServer.serverQueue += 1
            console.log(lowestPriorityServer.serverQueue)
            console.log(
                `Sending message to: ws://${lowestPriorityServer.ip}:${lowestPriorityServer.port} with payload: "${payload}"`
            )
            lowestPriorityServer.ws.send(payload)
        } else {
            console.error('No servers available.')
        }
    }

    public static findLowestPriorityServer(servers: Server[]) {
        let lowestPriorityServer = servers[0]
        for (let i = 0; i < servers.length; i++) {
            if (servers[i].serverQueue < lowestPriorityServer.serverQueue) {
                lowestPriorityServer = servers[i]
            }
        }
        return lowestPriorityServer
    }
}

;(async () => {
    await Controller.initialize()
})()
