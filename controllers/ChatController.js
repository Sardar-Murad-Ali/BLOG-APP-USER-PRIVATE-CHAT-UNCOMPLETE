import ChatModel from "../models/ChatModel.js"
import {BadRequestError} from "../errors/index.js"

const createChat=async (req,res)=>{
    let {otherUser}=req.params

    if(!otherUser){
        throw new BadRequestError("Please Providxe the userId")
    }

    let Alreadyexists=await ChatModel.findOne({
        members:{$all:[req.user.userId,otherUser]}
    })

    if(Alreadyexists){
        throw new BadRequestError("The Chat Already Exists")
    }


     
    let chat=await ChatModel.create({members:[req.user.userId,otherUser]})

    res.status(200).json("Chat Craeted Successfully")
}

const getSingleUserChats=async (req,res)=>{
    let Chats=await ChatModel.find({members:{$in:[req.user.userId]}}).populate("members")
    res.status(200).json({Chats})
}


export {createChat,getSingleUserChats}