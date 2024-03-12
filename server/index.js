const WebSocket = require('ws')
const PORT = 7071
const wss = new WebSocket.Server({ port: PORT })

const clients = new Map()
var cont = 1

wss.on('connection', (ws) => {   
    const id = uuidv4()
    const RGB = {r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255)}
    const name = `Client-${cont++}`
    const metadata = {id, name, RGB}
    
    process.stdout.write('new connection: ')
    console.log(metadata)
    
    clients.set(ws, metadata)

    ws.on('message', (messageAsString) => {
        const message = JSON.parse(messageAsString)
        const metadata = clients.get(ws)
    
        message.sender = metadata.id
        message.RGB = metadata.RGB
    
        const outbound = JSON.stringify(message)
    
        clients.forEach((value, key) => {
            key.send(outbound);
        });
    })

    ws.on('close', () => {
        clients.delete(ws)
        console.log(`client (${metadata.id}) quit`)
    }) 
})

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

console.log(`WebSocket up and running on port ${PORT}`);

