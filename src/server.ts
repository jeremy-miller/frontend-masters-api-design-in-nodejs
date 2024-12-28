import express from "express";
import morgan from "morgan";
import router from "./router";

const app = express();

// middleware
app.use(morgan("dev")); // log requests
app.use(express.json()); // allow clients to send JSON
app.use(express.urlencoded({ extended: true })); // allow clients to send query parameters

// routes
app.get("/", (req, res) => {
  console.log("hello");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", router);

export default app;
