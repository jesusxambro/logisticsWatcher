import { Router } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { SubscriptionEventType } from "../schemas/SubscriptionEvent";
import { notifyUser, wSMessageParser } from "../helpers/WebSocketHelpers";
import { EventMessage } from "../types/EventMessage";

const router = Router();


const eventWs = new WebSocketServer({ port: 3006 });
const clientSubscriptions = new Map<WebSocket, Set<number>>();

eventWs.on("connection", function connection(ws) {
  console.log("User Connected");
  clientSubscriptions.set(ws, new Set<number>());

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    try {
      const validatedMessage: SubscriptionEventType = wSMessageParser(data);
      const clientSubs = clientSubscriptions.get(ws);

      if (validatedMessage.action === "subscribe") {
        validatedMessage.ids.forEach((id: number) => clientSubs!.add(+id));
        clientSubscriptions.set(ws, clientSubs!);
        console.log("Subscribing to IDs:", validatedMessage.ids);
        //notifyUser(ws, clientSubs!);
      } else if (validatedMessage.action === "unsubscribe") {
        validatedMessage.ids.forEach((id: any) => clientSubs!.delete(id));
        console.log("Unsubscribing from IDs:", validatedMessage.ids);
      }
    } catch (e) {
      console.error("Failed to parse message:", e);
    }
  });

  ws.on("close", () => {
    console.log("Connection closed");
    clientSubscriptions.delete(ws);
  });
});

export function broadcastEvent(categoryId: number, eventData: EventMessage) {
  clientSubscriptions.forEach((subscriptions, client) => {
    if (
      subscriptions.has(Number(categoryId)) &&
      client.readyState === WebSocket.OPEN
    ) {
      client.send(JSON.stringify(eventData));
    }
  });
}

export default router;
