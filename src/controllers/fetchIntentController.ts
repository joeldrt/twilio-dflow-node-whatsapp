import { getInventoryByLoop } from "./../services/stockEntry"
import { findProductByCode } from "./../services/product"
import { productToText, toDfResponse } from "./../utils/dialogflow-utils"

const fetchIntentController = async (req: any, res: any, next: any) => {
  // tslint:disable-next-line:no-console
  console.log(req.body)
  const {
    queryResult: {
      parameters: { code },
    },
  } = req.body
  try {
    const product = await findProductByCode(code)
    if (!product) {
      return res.json(toDfResponse(`404 product not found`))
    }
    const inventory = await getInventoryByLoop(code)
    const fulfillText = productToText(product, Number(inventory))
    res.json(toDfResponse(fulfillText))
  } catch (error) {
    res.json(toDfResponse(error.message))
  }
}

export default fetchIntentController
