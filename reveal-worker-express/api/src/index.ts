// @ts-nocheck

import express, {Request, Response} from "express";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";
import {handleRequest} from "./coin-flip/handler";
import {logger} from "./logger/logger";

if (fs.existsSync(".env")) {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}

const app = express();
app.use(cors());


app.get("/", (_: Request, res: Response) => {
  res.send({message: "Dont forget to tip https://twitter.com/STACCart"});
});


app.get("/api", (_: Request, res: Response) => {
  res.send({message: "api is connected"});
});

app.get("/reveal", async (req: express.Request, res: express.Response) => {
res.header("Access-Control-Allow-Origin", 'https://fair3d.me');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  // @ts-ignore
  res.json(await handleRequest(req.query.player, req.query.uuid, req.query.env));

})

// @ts-ignore to fix this, add .env
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running");
});
