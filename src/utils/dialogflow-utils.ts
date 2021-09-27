import { IProductType } from "./../models/product"
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

export const productToText = (
  { code, name, description, price }: IProductType,
  inventory: number
) => {
  return `CODE: ${code},\nNAME: ${name},\nDESCRIPTION: ${description},\nPRICE: ${price.toString()}\nINVENTORY: ${inventory}`
}
