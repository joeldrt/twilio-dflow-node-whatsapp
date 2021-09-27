import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import fulfillHandler from "./routes/handler"
import productHandler from "./routes/product"
import warehouseHandler from "./routes/warehouse"

dotenv.config()

const app = express()

const dbUrl = process.env.DATABASE_URL || "mongodb://localhost/warehouse"
mongoose.connect(dbUrl)
const db = mongoose.connection
db.on("error", (error) => {
  // tslint:disable-next-line:no-console
  console.error(error)
})
db.once("open", () => {
  // tslint:disable-next-line:no-console
  console.log("Connected to mongo")
})

app.use(express.json())

app.use("/twilioWhatsappDFAgentFulFill", fulfillHandler)
app.use("/product", productHandler)
app.use("/warehouse", warehouseHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log("Server started")
})
