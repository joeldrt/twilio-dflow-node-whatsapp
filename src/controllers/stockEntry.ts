import { getAllStockEntries } from "./../services/stockEntry"

export const getAllStockEntriesController = async (req: any, res: any) => {
  try {
    const stockEntries = await getAllStockEntries()
    res.json(stockEntries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
