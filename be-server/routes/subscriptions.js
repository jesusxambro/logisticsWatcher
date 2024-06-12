"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const events_1 = require("./events");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mockedSubscriptions = [
        {
            id: "2",
            name: "Weekly Fuel",
            description: "On hand status of fuel by Week",
        },
        {
            id: "1",
            name: "Daily Fuel",
            description: "On hand status of fuel by Day",
        },
    ];
    res.json(mockedSubscriptions);
}));
router.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { fuelUsed, categoryId, unit, message } = req.body;
    const eventMessage = {
        id: (0, uuid_1.v4)(),
        fuelUsed: Number(fuelUsed),
        categoryId: Number(categoryId),
        unit: unit,
        message: message
    };
    if (!fuelUsed || !categoryId || !unit || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (isNaN(fuelUsed)) {
        return res.status(400).json({ error: "Fuel used must be a number" });
    }
    console.log("Received logistics data:", req.body);
    (0, events_1.broadcastEvent)(categoryId, eventMessage);
    res.status(200).json({
        message: "Logistics report received successfully",
        data: req.body,
    });
}));
exports.default = router;
