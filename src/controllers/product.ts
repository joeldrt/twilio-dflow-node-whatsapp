import { findProductByCode, getAllProducts } from "./../services/product"
import { Product } from "./../models/product"

export const getAllProductsController = async (req: any, res: any) => {
  try {
    const products = await getAllProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductByIdController = async (req: any, res: any) => {
  try {
    const product = await findProductByCode(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createNewProductController = async (req: any, res: any) => {
  const { code, name, description, price } = req.body
  const product = new Product({
    code,
    name,
    description,
    price,
  })
  try {
    const newProduct = await product.save()
    res.status(201).send(newProduct)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
