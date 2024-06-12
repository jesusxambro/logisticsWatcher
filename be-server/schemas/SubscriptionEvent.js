"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const SubscriptionEvent = zod_1.z.object({
    action: zod_1.z.union([zod_1.z.literal("subscribe"), zod_1.z.literal("unsubscribe")]),
    ids: zod_1.z.number().array().nonempty(),
});
exports.default = SubscriptionEvent;
