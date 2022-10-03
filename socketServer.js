let Users=[]

const addUser=(UserInfo,SocketId)=>{  
  let AlreadyExists=Users.find((all)=>all.userId===UserInfo.userId)
  
  if(!AlreadyExists){
    Users.push({...UserInfo,SocketId:SocketId})
  }
  
}



const removeUser=(SocketId)=>{
  Users=Users.filter((all)=>all.SocketId!==SocketId)
}


const Socket =(io)=>{
  
  
  
  io.on("connection",(socket)=>{
    
    
    socket.on("AddUser",(data)=>{
      addUser(data,socket.id)
      io.emit("GetUsers",Users)
      console.log("On")
    })
    
    socket.on("Message",(data)=>{
      let ToSend=Users.find((all)=>all.userId===data.Reciever._id)
      
      io.to(ToSend.SocketId).emit("GetMessage",{Sender:data.Sender,message:data.text,Reciever:data.Reciever,ConversationId:data.ConversationId
      })
    })
    
    socket.on("disconnect",()=>{
        removeUser(socket.id)
        io.emit("GetUsers",Users)
        console.log("Off")
      })
      
      console.log(Users)
      
    })
  }

export default Socket