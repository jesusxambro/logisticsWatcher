import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import morgan from 'morgan';


const app : Express = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));




app.get("/", (req, res) => {
  return res.send("Please use the correct route.");
});

const port = process.env.PORT || 3000;


app.listen(port, () =>
  console.log(`Poke Express listening on port ${process.env.PORT}!`)
);