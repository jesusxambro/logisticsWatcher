import {z} from 'zod';



const SubscriptionEvent = z.object(
    {
        action: z.union([z.literal("subscribe"), z.literal("unsubscribe")]),
        ids: z.number().array().nonempty(),
    }
);

export type SubscriptionEventType = z.infer<typeof SubscriptionEvent>;

export default SubscriptionEvent;