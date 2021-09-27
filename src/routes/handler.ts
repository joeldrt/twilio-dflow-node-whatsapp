import express from "express"
const router = express.Router()
import intentDispatcher from "./../middleware/intentDispatcher"

// Dialogflow fulfill endpoint

router.post("/", intentDispatcher())

// Ping service
router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "service up and running", request: req.headers })
})

export default router
