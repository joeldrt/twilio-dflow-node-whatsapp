import { getAllProducts, findProductByCode } from "./../services/product"
import express from "express"
import { Product } from "../models/product"

// Products endpoint
const router = express.Router()

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET PRODUCT BY CODE
router.get("/:id", async (req, res) => {
  try {
    const product = await findProductByCode(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ADD PRODUCT
router.post("/", async (req, res) => {
  const { code, name, description, price } = req.body
  const product = new Product({
    code,
    name,
    description,
    price,
  })
  try {
    const newProduct = await product.save()
    res.status(201).send(newProduct)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

export default router
