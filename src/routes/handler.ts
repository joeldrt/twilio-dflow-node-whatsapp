import express from "express"
const router = express.Router()
import { toDfResponse, productToText } from "../utils/dialogflow-utils"
import { Product } from "../models/product"
import { INTENT_FETCH_PRODUCT } from "../lib/constants"

// Dialogflow fulfill endpoint

router.post("/", async (req, res) => {
  // tslint:disable-next-line:no-console
  console.log(req.body)
  const {
    queryResult: {
      parameters: { code },
      intent: { name },
    },
  } = req.body
  try {
    const product = await Product.findOne({ code })
    if (!product) {
      return res.json(toDfResponse(`404 product not found`))
    }
    const fulfillText = productToText(product)
    res.json(toDfResponse(fulfillText))
  } catch (error) {
    res.json(toDfResponse(error.message))
  }
})

// Ping service
router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "service up and running", request: req.headers })
})

export default router
