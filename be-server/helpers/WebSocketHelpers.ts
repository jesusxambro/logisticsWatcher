import SubscriptionEvent, { SubscriptionEventType } from "../schemas/SubscriptionEvent";



export const wSMessageParser = (data:any) : SubscriptionEventType => {
        const message = JSON.parse(data.toString());
        message.ids = message.ids.map((numberToConvert :String) => ( Number(numberToConvert)));
        return  SubscriptionEvent.parse(message);
}