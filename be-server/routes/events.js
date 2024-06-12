"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastEvent = void 0;
const express_1 = require("express");
const ws_1 = require("ws");
const WebSocketHelpers_1 = require("../helpers/WebSocketHelpers");
const router = (0, express_1.Router)();
//TODO: Rename/Structure functions and variables to follow the UML
const eventWs = new ws_1.WebSocketServer({ port: 3006 });
const clientSubscriptions = new Map();
eventWs.on("connection", function connection(ws) {
    console.log("User Connected");
    clientSubscriptions.set(ws, new Set());
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        console.log("received: %s", data);
        try {
            const validatedMessage = (0, WebSocketHelpers_1.wSMessageParser)(data);
            const clientSubs = clientSubscriptions.get(ws);
            if (validatedMessage.action === "subscribe") {
                validatedMessage.ids.forEach((id) => clientSubs.add(+id));
                clientSubscriptions.set(ws, clientSubs);
                console.log("Subscribing to IDs:", validatedMessage.ids);
                //notifyUser(ws, clientSubs!);
            }
            else if (validatedMessage.action === "unsubscribe") {
                validatedMessage.ids.forEach((id) => clientSubs.delete(id));
                console.log("Unsubscribing from IDs:", validatedMessage.ids);
            }
        }
        catch (e) {
            console.error("Failed to parse message:", e);
        }
    });
    ws.on("close", () => {
        console.log("Connection closed");
        clientSubscriptions.delete(ws);
    });
});
function broadcastEvent(categoryId, eventData) {
    clientSubscriptions.forEach((subscriptions, client) => {
        if (subscriptions.has(Number(categoryId)) &&
            client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify(eventData));
        }
    });
}
exports.broadcastEvent = broadcastEvent;
exports.default = router;
