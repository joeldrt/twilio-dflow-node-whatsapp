import { Document, model, Schema } from "mongoose"

export interface IStockEntry extends Document {
  productCode: string
  date?: Date
  amount: number
  reqPhoneNumber: string
}

const stockEntrySchema = new Schema<IStockEntry>({
  productCode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
  amount: {
    type: Number,
    required: true,
  },
  reqPhoneNumber: {
    type: String,
    required: true,
  },
})

export const StockEntry = model("StockEntry", stockEntrySchema)
