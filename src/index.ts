import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

process.on("uncaughtException", () => {
  console.error("Uncaught exception");
});

process.on("unhandledRejection", () => {
  console.error("Unhandled rejection");
});
