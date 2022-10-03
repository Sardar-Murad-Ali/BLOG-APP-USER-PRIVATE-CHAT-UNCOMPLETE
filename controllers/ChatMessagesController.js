import ChatMessages from "../models/ChatMessages.js";
import {BadRequestError} from "../errors/index.js"

const createMessage=async (req,res)=>{
    let {Sender,Reciever,ConversationId,message}=req.body

    if(!Sender || !Reciever || !ConversationId || !message){
        throw new BadRequestError("Bad Request")
    }
     
    let Message=await ChatMessages.create({...req.body})
    res.status(200).json({Message})
}


const getSingleChatMessages=async (req,res)=>{
    let {ConversationId}=req.params

    let chatMessages=await ChatMessages.find({ConversationId})

    res.status(200).json({chatMessages})
}

export {createMessage,getSingleChatMessages}