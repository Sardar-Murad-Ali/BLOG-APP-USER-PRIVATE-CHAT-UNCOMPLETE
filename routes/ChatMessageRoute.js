import express from "express"
let router=express.Router()


import {createMessage,getSingleChatMessages} from "../controllers/ChatMessagesController.js"

router.route("/").post(createMessage)
router.route("/:ConversationId").get(getSingleChatMessages)

export default router