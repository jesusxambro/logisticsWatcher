import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from "../types/Subscription";
import { broadcastEvent } from "./events";
import { EventMessage } from "../types/EventMessage";

const router = Router();

router.get("/", async (req, res) => {
  const mockedSubscriptions: Subscription[] = [
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
});

router.post("/submit", async (req, res) => {
  console.log(req.body);
  
  const { fuelUsed, categoryId, unit, message } = req.body;

  const eventMessage: EventMessage = {
    id: uuidv4(),
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
  broadcastEvent(categoryId,  eventMessage)

  res.status(200).json({
    message: "Logistics report received successfully",
    data: req.body,
  });
});

export default router;