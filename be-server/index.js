"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const events_1 = __importDefault(require("./routes/events"));
const subscriptions_1 = __importDefault(require("./routes/subscriptions"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use('/api', events_1.default);
app.use('/api/available/', subscriptions_1.default);
app.get("/", (req, res) => {
    return res.send("Please use the correct route.");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`LogisticsWatcher listening on port ${process.env.PORT}!`));
