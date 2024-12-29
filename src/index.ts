import * as dotenv from "dotenv";
dotenv.config();

import config from "./config/index";
import app from "./server";

app.listen(config.port, () => {
  console.log(`server running at http://localhost:${config.port}`);
});

process.on("uncaughtException", () => {
  console.error("Uncaught exception");
});

process.on("unhandledRejection", () => {
  console.error("Unhandled rejection");
});
