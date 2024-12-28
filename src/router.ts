import { Router } from "express";

const router = Router();

// Product
router.get("/products", (req, res) => {
  res.json({ message: "hello products" });
});
router.get("/products/:id", () => {});
router.put("/products/:id", () => {});
router.post("/products", () => {});
router.delete("/products/:id", () => {});

// Update
router.get("/updates", () => {});
router.get("/updates/:id", () => {});
router.put("/updates/:id", () => {});
router.post("/updates", () => {});
router.delete("/updates/:id", () => {});

// Update Points
router.get("/updatepoints", () => {});
router.get("/updatepoints/:id", () => {});
router.put("/updatepoints/:id", () => {});
router.post("/updatepoints", () => {});
router.delete("/updatepoints/:id", () => {});

export default router;
