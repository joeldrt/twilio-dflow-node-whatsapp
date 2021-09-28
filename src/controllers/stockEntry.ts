import { createExcel } from "./../utils/excelUtility"
import { IStockEntry } from "./../models/stockEntry"
import { getAllStockEntries } from "./../services/stockEntry"

export const getAllStockEntriesController = async (req: any, res: any) => {
  try {
    const stockEntries = await getAllStockEntries()
    res.json(stockEntries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllStockAsExcelFileController = async (req: any, res: any) => {
  try {
    const stockEntries = await getAllStockEntries()
    const rows: any[] = []
    stockEntries.forEach((stockEntry: IStockEntry) => {
      rows.push({
        entryId: stockEntry._id,
        productCode: stockEntry.productCode,
        quantity: stockEntry.amount,
        date: stockEntry.date,
        reqPhoneNumber: stockEntry.reqPhoneNumber,
      })
    })
    const stream: Buffer = await createExcel(
      `Warehouse until ${Date.now}`,
      [
        { header: "_id", key: "entryId" },
        { header: "Product Code", key: "productCode" },
        { header: "Quantity", key: "quantity" },
        { header: "Date", key: "date" },
        { header: "Request Phone Number", key: "reqPhoneNumber" },
      ],
      rows
    )
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.setHeader("Content-Disposition", `attachment; filename=orders.xlsx`)
    res.setHeader("Content-Length", stream.length)
    res.send(stream)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
