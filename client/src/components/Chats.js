import { Button, Typography } from '@mui/material'
import React from 'react'
import { useAppContext } from '../context/appContext'
import {authFetch} from "../utils"

const Chats = ({socket}) => {
    let [chats,setChats]=React.useState([])

    let {user}=useAppContext()

    let [onlineUsers,setOnlineUsers]=React.useState([])

    let [message,setMessage]=React.useState("")

    let [messages,setMessages]=React.useState([])

    let [currentChat,setCurrentChat]=React.useState({})

    let [ConversationId,setConversationId]=React.useState("")
    
    let [ConversationStatus,setConversationStatus]=React.useState("")

        React.useEffect(()=>{
            const start =async ()=>{
                try {
                    let {data}=await authFetch("/chat/singleUserChats")
                    setChats(data.Chats)
                  } catch (error) {
                    console.log(error.response.data.msg)
                  }
                }
                start()
              },[])
              
              
                  React.useEffect(()=>{
                     socket.emit("AddUser",user)
                  },[user])

              
                  React.useEffect(()=>{
                      socket.on("GetUsers",(data)=>{
                           setOnlineUsers(data)        
                      })
                  },[socket])

                  React.useEffect(()=>{
                    if(currentChat){                    
                      socket.on("GetMessage",(data)=>{
                        
                          setMessages((pre)=>[...pre,data])
    
                      })
                    }
                  },[socket])

                  console.log(messages)


    const chat=(chat)=>{
      let Friend=chat.members.find((all)=>all._id!==user.userId)
      setMessages([])
      setCurrentChat(chat)
      setConversationId(chat._id)
      setConversationStatus(`You are now in chat with ${Friend.name}`)
    }

    React.useEffect(()=>{
      const start=async ()=>{
        try {
          if(currentChat){
            let {data}=await authFetch(`/chatMessages/${ConversationId}`)
            setMessages(data.chatMessages)
          }
        } catch (error) {
          console.log(error.response.data.msg)
        }
      }
      start()
    },[currentChat])

    // console.log(ConversationId)

    const send=async ()=>{
      let Friend=currentChat.members.find((all)=>all._id!==user.userId)

      try {
        if(currentChat){
          await authFetch.post('/chatMessages',{ConversationId,Reciever:Friend,Sender:user,message})
        }
      } catch (error) {
        console.log(error.response.data.msg)
      }

       if(currentChat){
         socket.emit("Message",{Sender:user,Reciever:Friend,text:message,ConversationId})
        }
    }

    // console.log(currentChat)


    






  return (
    <div className="ChatMain" style={{display:"flex"}}>
      <div className='SideBar__Chat'>

      <Typography variant='h4'>Your Conversations</Typography>
      {
        chats?.map((all)=>{
          return  all?.members.filter((users)=>users.email!==user.email).map((allUsers)=>{
            return(

              <div  style={{display:"flex",marginBottom:"30px",cursor:"pointer"}} onClick={()=>chat(all)}>
                  <div
                  style={{display:"flex",marginTop:"30px"}}>
                    <img src={allUsers.image} style={{height:"40px",width:"40px",borderRadius:"50%",marginRight:"30px"}} />
                   <Typography variant='h5'>{allUsers.name}</Typography>
                  </div>

            </div>
                )
           })
          })
        }


                  <div className='Online'  style={{marginTop:"40px"}}>
                    <Typography variant='h4'>Online Users</Typography>
                    {
                      onlineUsers.filter((all)=>all.userId!==user.userId).map((all)=>{
                        return(
                          <div onClick={()=>chat(all)} className='dotmain' style={{display:"flex",marginTop:"40px",cursor:"pointer"}} >
                          <Typography style={{marginRight:"20px"}} variant='h5'>{all.name.toUpperCase()}</Typography>
                         <img src={all.image} style={{height:"40px",width:"40px",borderRadius:"50%",marginRight:"30px"}} />
                         <div className='dot'></div>
                         </div>
                      ) 
                    })
                  }
                  </div>

                  </div>


{/* The Chatts */}
                  <div >
                    <div>
                      <Typography variant="h3" style={{marhinTop:"40px",marginBottom:"40px"}}>
                         {ConversationStatus?ConversationStatus:"Please Select One To start chat"}
                      </Typography>
                    </div>

                    <div>
                      {
                        messages.map((all)=>{
                          return(
                             <div>
                               <div style={{display:"flex",marginBottom:"17px"}}>
                                  <Typography style={{marginRight:"10px"}} variant='h7'>{all.Sender.name.toUpperCase()}</Typography>
                                   <img style={{height:"40px",width:"40px",borderRadius:"50%"}} src={all.Sender.image}/>
                               </div>
                               <Typography variant="h6" style={{background:"gray",color:"white",padding:"10px",borderRadius:'20px',width:"40%",marginBottom:"30px"}}>{all.message}</Typography>
                             </div>
                            )
                        })
                      }
                    </div>

                    <div>
                       <input value={message} onChange={(e)=>setMessage(e.target.value)} style={{padding:"10px",ouline:"none",padding:"10px"}} placeholder="Message" />
                       <Button variant='outlined' style={{marginLeft:"20px"}} onClick={send}>Send</Button>
                    </div>
                  </div>
                  
    </div>
  )
}

export default Chats
