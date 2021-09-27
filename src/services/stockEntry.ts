import { findProductByCode } from "./product"
import { StockEntry, IStockEntry } from "./../models/stockEntry"

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
