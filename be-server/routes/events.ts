import { Router } from "express";
import {WebSocketServer, WebSocket} from "ws";
import {ActionMessage} from "./../types/ActionMessage";


const router = Router();

const eventWs = new WebSocketServer({port: 3006});
const clientSubscriptions = new Map<WebSocket, Set<string>>();

const events = [
    { id: Math.random().toString(36).substring(2, 15), message: "Event for ID 1" },
    { id: Math.random().toString(36).substring(2, 15), message: "Event for ID 2" }
];


eventWs.on('connection', function connection(ws: WebSocket) {
    clientSubscriptions.set(ws, new Set<string>());

    ws.on('error', console.error);
    ws.on('message', function message(data) {
      console.log('received: %s', data);
      try {
        const message: ActionMessage = JSON.parse(data.toString());
        const clientSubs = clientSubscriptions.get(ws);

        if (message.action === "subscribe") {
            message.ids.forEach((id: string) => clientSubs!.add(id));
            console.log('Subscribing to IDs:', message.ids);
        } else if (message.action === "unsubscribe") {
            message.ids.forEach((id: string) => clientSubs!.delete(id));
            console.log('Unsubscribing from IDs:', message.ids);
        }
    } catch (e) {
        console.error('Failed to parse message:', e);
    }
    });
  
    const sendMockEvent = () => {
      events.forEach(event => {
        clientSubscriptions.forEach((subscriptions, ws) => {
            if (subscriptions.has(event.id)) {
                console.log(event)
                ws.send(JSON.stringify(event));
            }
        });
    });
    };
    sendMockEvent();
    
    const interval = setInterval(() => {
      sendMockEvent();
    }, Math.random() * (5000 - 2000) + 2000); 


  
    ws.on('close', () => {
        console.log("closed");
      clearInterval(interval); 
    });
  });

  
  export default router;
  