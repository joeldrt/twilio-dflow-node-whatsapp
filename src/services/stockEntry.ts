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

export const bulkAddStockEntry = async (
  code: string[],
  amount: number[],
  reqPhoneNumber: string
): Promise<string[]> => {
  const bulkResponse = []
  for (let i = 0; i < code.length; i++) {
    try {
      const order = await addStockEntry({
        productCode: code[i],
        amount: amount[i],
        reqPhoneNumber,
      })
      const result = `OK - PID: ${code[i]} / Amount: ${amount[i]}`
      bulkResponse.push(result)
    } catch (error) {
      const result = `ERROR - PID: ${code[i]} / Amount: ${amount[i]}\n${error.message}`
      bulkResponse.push(result)
    }
  }
  return bulkResponse
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
