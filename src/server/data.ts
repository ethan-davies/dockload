export default class Data {
    public static handle(message: string, ws: any, id: string) {
        console.log('[CONTROLLER] ' + message)
        try {
            switch (message) {
                case JSON.stringify({ ping: '@' }):
                    ws.send(
                        JSON.stringify({
                            status: '200',
                            id: id,
                            pong: '@',
                        })
                    )
                    break
                default:
                    ws.send(
                        JSON.stringify({
                            status: '501',
                            id: id,
                            body: 'Received your message but did not handle.',
                        })
                    )
                    break
            }
        } catch (error) {
            ws.send(
                JSON.stringify({
                    status: '400',
                    id: id,
                    body: 'Error handling message',
                })
            )
        }
    }
}
