import { Router } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { ActionMessage } from "./../types/ActionMessage";
import SubscriptionEvent, { SubscriptionEventType } from "../schemas/SubscriptionEvent";
import { wSMessageParser } from "../helpers/WebSocketHelpers";

const router = Router();

const eventWs = new WebSocketServer({ port: 3006 });
const clientSubscriptions = new Map<WebSocket, any>();

const events = [
  {
    id: Math.random().toString(36).substring(2, 15),
    categoryId: 1,
    message: "Event for ID 1",
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    categoryId: 2,
    message: "Event for ID 2",
  },
];
function sendMockEvent(clientSubscriptions: Map<WebSocket, Set<number>>) {
  events.forEach((event) => {
    clientSubscriptions.forEach(
      (subscriptionIds: Set<number>, webSocketClient: WebSocket) => {
        console.log(typeof subscriptionIds.values())
        console.log(subscriptionIds);
        if (subscriptionIds.has(event.categoryId)) {
          console.log(`Sending event to client: ${event.message}`);
          webSocketClient.send(JSON.stringify(event));
        }
      }
    );
  });
}

eventWs.on("connection", function connection(ws) {
  console.log("User Connected");
  clientSubscriptions.set(ws, new Set<number>());

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    try {
        
      const validatedMessage : SubscriptionEventType = wSMessageParser(data);
      const clientSubs = clientSubscriptions.get(ws);

      if (validatedMessage.action === "subscribe") {
        validatedMessage.ids.forEach((id: number) => clientSubs.add(+id));
        clientSubscriptions.set(ws, clientSubs);
        console.log("Subscribing to IDs:", validatedMessage.ids);
        sendMockEvent(clientSubscriptions);
      } else if (validatedMessage.action === "unsubscribe") {
        validatedMessage.ids.forEach((id: any) => clientSubs.delete(id));
        console.log("Unsubscribing from IDs:", validatedMessage.ids);
      }
    } catch (e) {
      console.error("Failed to parse message:", e);
    }
  });
  
  while(ws.OPEN && clientSubscriptions.size > 1){
      console.log(`Sending stuff`);
      setTimeout(()=>{sendMockEvent(clientSubscriptions), 3000});
  }

  ws.on("close", () => {
    console.log("Connection closed");
    clientSubscriptions.delete(ws);
  });
});

export default router;
