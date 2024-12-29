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
  throw new Error("oops");
});

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use("/api", protectMiddleware, router);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "Server error" });
  }
});

export default app;
