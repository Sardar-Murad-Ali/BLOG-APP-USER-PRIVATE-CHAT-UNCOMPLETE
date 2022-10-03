
import mongoose from "mongoose";
let Schema=new mongoose.Schema({
    message:{
        type:String,
        required:[true,'Please Provide the Message']
    },
    ConversationId:{
        type:String,
        required:[true,'Please Provide the ConversationId']
    },
    Sender:{
        type:Object,
        required:[true,'Please Provide the Sender']
    },
    Reciever:{
        type:Object,
        required:[true,'Please Provide the Sender']
    }
},{timestamps:true})

export default mongoose.model("ChatScocketIOMessages",Schema)