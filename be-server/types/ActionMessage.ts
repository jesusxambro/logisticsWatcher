export type ActionMessage = {
    action: "subscribe" | "unsubscribe";
    ids: string[];
}