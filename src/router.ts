import { UPDATE_STATUS } from "@prisma/client";
import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import { handleInputErrorMiddleware } from "./modules/middleware";

const router = Router();

// Product
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.patch(
  "/products/:id",
  body("name").isString(),
  handleInputErrorMiddleware,
  updateProduct
);
router.post(
  "/products",
  body("name").isString(),
  handleInputErrorMiddleware,
  createProduct
);
router.delete("/products/:id", deleteProduct);

// Update
router.get("/updates", getUpdates);
router.get("/updates/:id", getUpdateById);
router.patch(
  "/updates/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status")
    .isIn([
      UPDATE_STATUS.IN_PROGRESS,
      UPDATE_STATUS.LIVE,
      UPDATE_STATUS.DEPRECATED,
      UPDATE_STATUS.ARCHIVED,
    ])
    .optional(),
  body("version").optional().isString(),
  body("asset").optional().isString(),
  handleInputErrorMiddleware,
  updateUpdate
);
router.post(
  "/updates",
  body("title").isString(),
  body("body").isString(),
  body("version").optional().isString(),
  body("asset").optional().isString(),
  body("productId").isString(),
  handleInputErrorMiddleware,
  createUpdate
);
router.delete("/updates/:id", deleteUpdate);

router.use((err, req, res, next) => {
  console.error(err);

  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
