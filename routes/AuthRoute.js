import express from "express"
let router=express.Router()
import Authenticate from "../middleware/auth.js"

import {Login,Register,getAllUsers,followUser,getCurrentUser,UnFollow} from "../controllers/Users.js"
import UploadImage from "../controllers/UploadImage.js"


router.route("/register").post(Register)
router.route("/registerUploadImage").post(UploadImage)
router.route("/login").post(Login)
router.route("/allUsers").get(Authenticate,getAllUsers)
router.route("/follow/:userId").post(Authenticate,followUser)
router.route("/unFollow/:userId").post(Authenticate,UnFollow)
router.route("/currentUser").get(Authenticate,getCurrentUser)


export default router