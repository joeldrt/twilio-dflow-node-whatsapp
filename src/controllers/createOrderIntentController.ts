import { addStockEntry } from "./../services/stockEntry"
import { toDfResponse } from "./../utils/dialogflow-utils"

const createOrderIntentController = async (req: any, res: any, next: any) => {
  // tslint:disable-next-line:no-console
  console.log(req.body)
  const {
    queryResult: {
      parameters: { amount, code },
    },
    originalDetectIntentRequest: {
      payload: { From },
    },
  } = req.body
  try {
    const order = await addStockEntry({
      productCode: code,
      amount,
      reqPhoneNumber: From,
    })
    res.json(toDfResponse(`Order created with ID: ${order._id}`))
  } catch (error) {
    res.json(toDfResponse(error.message))
  }
}

export default createOrderIntentController
