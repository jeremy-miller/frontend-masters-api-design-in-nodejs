import express from "express";
import morgan from "morgan";
import { createNewUser, signin } from "./handlers/user";
import { protectMiddleware } from "./modules/auth";
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

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use("/api", protectMiddleware, router);

export default app;
