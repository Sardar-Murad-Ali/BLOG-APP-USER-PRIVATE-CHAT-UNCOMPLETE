import express from "express"
let router=express.Router()

 import {createChat,getSingleUserChats} from "../controllers/ChatController.js"

 router.route("/createChat/:otherUser").post(createChat)
 router.route("/singleUserChats").get(getSingleUserChats)

 export default router