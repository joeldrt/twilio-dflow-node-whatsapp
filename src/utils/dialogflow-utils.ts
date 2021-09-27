import { ProductType } from "./../models/product"
export const toDfResponse = (text: string) => {
  return {
    fulfillmentText: `${text}`,
    fulfillmentMessages: [
      {
        text: {
          text: [`${text}`],
        },
      },
    ],
  }
}

export const productToText = ({
  code,
  name,
  description,
  price,
}: ProductType) => {
  return `CODE: ${code},\nNAME: ${name},\nDESCRIPTION: ${description},\nPRICE: ${price.toString()}`
}
