import {
  getAllProductsController,
  getProductByIdController,
  createNewProductController,
} from "./../controllers/product"
import express from "express"

// Products endpoint
const router = express.Router()

// GET ALL PRODUCTS
router.get("/", getAllProductsController)

// GET PRODUCT BY CODE
router.get("/:id", getProductByIdController)

// ADD PRODUCT
router.post("/", createNewProductController)

export default router
