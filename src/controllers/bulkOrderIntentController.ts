import { bulkAddStockEntry } from "./../services/stockEntry"
import { toDfResponse } from "./../utils/dialogflow-utils"

const bulkOrderIntentController = async (req: any, res: any, next: any) => {
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
  // tslint:disable-next-line:no-console
  console.log(amount)
  // tslint:disable-next-line:no-console
  console.log(code)
  if (amount.length !== code.length) {
    return res.json(toDfResponse("codes and amounts length mismatch"))
  }
  const results = await bulkAddStockEntry(amount, code, From)
  return res.json(toDfResponse(results.join("\n")))
}

export default bulkOrderIntentController
