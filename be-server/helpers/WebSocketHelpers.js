"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyUser = exports.wSMessageParser = void 0;
const SubscriptionEvent_1 = __importDefault(require("../schemas/SubscriptionEvent"));
const mockEvents_1 = require("./mockEvents");
const wSMessageParser = (data) => {
    const message = JSON.parse(data.toString());
    message.ids = message.ids.map((numberToConvert) => (Number(numberToConvert)));
    return SubscriptionEvent_1.default.parse(message);
};
exports.wSMessageParser = wSMessageParser;
function notifyUser(webSocketClient, clientSubs) {
    const filteredEvents = mockEvents_1.events.filter(event => clientSubs.has(event.categoryId));
    if (filteredEvents.length > 0) {
        const randomEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
        console.log(`Sending event to client: ${randomEvent.message}`);
        webSocketClient.send(JSON.stringify(randomEvent));
    }
    ;
    const nextNotifyTime = Math.random() * (10000 - 5000) + 5000;
    const timeoutId = setTimeout(() => notifyUser(webSocketClient, clientSubs), nextNotifyTime);
}
exports.notifyUser = notifyUser;
;
