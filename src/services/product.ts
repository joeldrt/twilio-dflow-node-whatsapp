import { Product, IProductType } from "../models/product"

export const getAllProducts = async (): Promise<IProductType[]> => {
  const products = await Product.find()
  return products
}

export const findProductByCode = async (
  code: string
): Promise<IProductType> => {
  const product = await Product.findOne({
    code,
  })
  return product
}
