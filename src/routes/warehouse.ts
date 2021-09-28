import express from "express"
import {
  getAllStockEntriesController,
  getAllStockAsExcelFileController,
} from "./../controllers/stockEntry"

// Warehouse endpoint
const router = express.Router()

// GET ALL STOCK ENTRIES
router.get("/", getAllStockEntriesController)

// GET ALL STOCK ENTRIES AS EXCEL FILE
router.get("/excel/download", getAllStockAsExcelFileController)

export default router
