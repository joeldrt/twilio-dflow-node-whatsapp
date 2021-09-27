import { toDfResponse } from "./../utils/dialogflow-utils"

const defaultIntentController = async (req: any, res: any, next: any) => {
  // tslint:disable-next-line:no-console
  console.log(req.body)
  const {
    queryResult: {
      intent: { name },
    },
  } = req.body
  res.json(toDfResponse(`Unable to process intent: ${name}`))
}

export default defaultIntentController
