import { findProductByCode } from "./product"
import { StockEntry, IStockEntry } from "./../models/stockEntry"

export const getAllStockEntries = async (): Promise<IStockEntry[]> => {
  const stockEntries = await StockEntry.find()
  return stockEntries
}

export const addStockEntry = async ({
  productCode,
  amount,
  reqPhoneNumber,
  date,
}: {
  productCode: string
  amount: number
  reqPhoneNumber: string
  date?: Date
}): Promise<IStockEntry> => {
  const product = await findProductByCode(productCode)
  if (!product) {
    throw new Error("404 product not found")
  }
  const stockEntry = await StockEntry.create({
    productCode,
    date,
    amount,
    reqPhoneNumber,
  })
  return stockEntry
}

export const getInventory = async (code: string): Promise<string> => {
  const inventory = await StockEntry.aggregate([
    {
      $match: { productCode: code },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ])
  return inventory.toString()
}

export const getInventoryByLoop = async (code: string): Promise<string> => {
  const stockEntries = await StockEntry.find({ productCode: code })
  let inventory = 0
  for (const stockEntry of stockEntries) {
    inventory = inventory + stockEntry.amount
  }
  return inventory.toString()
}
