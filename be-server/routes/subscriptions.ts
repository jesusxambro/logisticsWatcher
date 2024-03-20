import { Router } from "express";
import { Subscription } from "../types/Subscription";

const router = Router();


router.get("/", async (req, res) => {
 const mockedSubscriptions: Subscription[] = [
    { id: '2', name: 'Weekly Fuel', description: 'On hand status of fuel by Week' },
    { id: '1', name: 'Daily Fuel', description: 'On hand status of fuel by Day' },
  ];
 res.json(mockedSubscriptions);
});



export default router;