import SubscriptionEvent, { SubscriptionEventType } from "../schemas/SubscriptionEvent";
import { events } from "./mockEvents";
import { WebSocket } from "ws";



export const wSMessageParser = (data:any) : SubscriptionEventType => {
        const message = JSON.parse(data.toString());
        message.ids = message.ids.map((numberToConvert :String) => ( Number(numberToConvert)));
        return  SubscriptionEvent.parse(message);
}

export function notifyUser(webSocketClient: WebSocket, clientSubs: Set<number>) {
    const filteredEvents = events.filter(event => clientSubs.has(event.categoryId));
    if (filteredEvents.length > 0) {
      const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
      console.log(`Sending event to client: ${randomEvent.message}`);
      webSocketClient.send(JSON.stringify(randomEvent));
    };
    
    const nextNotifyTime = Math.random() * (10000 - 5000) + 5000; 
    const timeoutId = setTimeout(() => notifyUser(webSocketClient, clientSubs), nextNotifyTime);
    
  };