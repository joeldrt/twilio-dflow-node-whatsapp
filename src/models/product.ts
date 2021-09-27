import { Schema, model, Types } from "mongoose"

export interface ProductType {
  code: string
  name: string
  description: string
  price: Schema.Types.Decimal128
}

const productSchema = new Schema<ProductType>({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
    get: (v: Schema.Types.Decimal128) =>
      new Types.Decimal128((+v.toString()).toFixed(2)),
    default: 0,
  },
})

export const Product = model("Product", productSchema)
