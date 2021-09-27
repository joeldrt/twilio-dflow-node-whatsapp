import { Product, ProductType } from "../models/product"

export const getAllProducts = async (): Promise<ProductType[]> => {
  const products = await Product.find()
  return products
}

export const findProductByCode = async (code: string): Promise<ProductType> => {
  const product = await Product.findOne({
    code,
  })
  return product
}
