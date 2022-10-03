import mongoose from "mongoose"

let Schema=new mongoose.Schema({
    members:[{type:mongoose.Types.ObjectId,ref:"BlogAppUsers"}]
})

export default mongoose.model("SocketAppBlogChats",Schema)