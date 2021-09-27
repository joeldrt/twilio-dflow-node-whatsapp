import createOrderIntentController from "./../controllers/createOrderIntentController"
import fetchIntentController from "./../controllers/fetchIntentController"
import defaultIntentController from "./../controllers/defaultIntentController"
import { INTENT_FETCH_PRODUCT, INTENT_CREATE_ORDER } from "./../lib/constants"

const intentDispatcher = () => {
  return (req: any, res: any, next: any) => {
    // tslint:disable-next-line:no-console
    console.log(req.body)
    const {
      queryResult: {
        intent: { name },
      },
    } = req.body
    if (name === INTENT_FETCH_PRODUCT) {
      fetchIntentController(req, res, next)
    } else if (name === INTENT_CREATE_ORDER) {
      createOrderIntentController(req, res, next)
    } else {
      defaultIntentController(req, res, next)
    }
  }
}

export default intentDispatcher
