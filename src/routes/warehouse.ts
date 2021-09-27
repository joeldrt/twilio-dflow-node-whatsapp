import { StockEntry } from "./../models/stockEntry"
import express from "express"
import { getAllStockEntriesController } from "./../controllers/stockEntry"

// Warehouse endpoint
const router = express.Router()

// GET ALL STOCK ENTRIES
router.get("/", getAllStockEntriesController)

export default router
