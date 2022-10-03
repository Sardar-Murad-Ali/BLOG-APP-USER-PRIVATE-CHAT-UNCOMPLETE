import { Button, Typography } from '@mui/material'
import React from 'react'
import {authFetch} from '../utils'
import { useAppContext } from '../context/appContext'

import AlertFront from "./AlertFront"


const Users = () => {
    let [users,SetUsers]=React.useState([])
    let {user}=useAppContext()
    let [text,setText]=React.useState("")
    let [type,setType]=React.useState("")
    let [show,setShow]=React.useState("")
    let alert=React.useRef()


    React.useEffect(()=>{
        let start=async ()=>{
            try {
                let {data}=await authFetch("/auth/allUsers")
                SetUsers(data.users)
                SetUsers((pre)=>pre.filter((all)=>all.email!==user.email))
            } catch (error) {
                console.log(error)
            }
        }
        start()
    },[])
   
    
    const makeFriend=async ({id})=>{
        try {
            let {data}=await authFetch.post(`/auth/follow/${id}`)
            setText("Followed Successfully")
            setType("success")
            setShow(true)
            alert.current.scrollIntoView({behavior:"smooth"})
        } catch (error) {
            setText(error.response.data.msg)
            setType("danger")
            setShow(true)
            alert.current.scrollIntoView({behavior:"smooth"})
        }
        setTimeout(()=>{
            setText("")
            setType("")
            setShow(false)
        },3000)
    }


    const Chat=async (id)=>{
        try {
            let {data}=await authFetch.post(`/chat/createChat/${id}`)
            setText("Chat Craeted Successfully Successfully")
            setType("success")
            setShow(true)
            alert.current.scrollIntoView({behavior:"smooth"})
        } catch (error) {
            setText(error.response.data.msg)
            setType("danger")
            setShow(true)
            alert.current.scrollIntoView({behavior:"smooth"})
        }
        setTimeout(()=>{
            setText("")
            setType("")
            setShow(false)
        },3000)
    }




  return (
    <div>
        <div ref={alert} style={{width:"40%",marginTop:"20px",marginBottom:"30px",marginLeft:"30%"}}>
          {show && <AlertFront alertType={type} alertText={text}/>}
        </div>
       {
         users?.map((all)=>{
            return <div className='section__padding' style={{marginBottom:"40px"}} key={all?.email}>
                <div>
                    <img src={all?.image} style={{height:"40px",width:"40px",borderRadius:"50%"}}/>
                    <Typography variant='h4'>{all?.name}</Typography>
                </div>
                <div style={{marginTop:"30px"}}>
                   <Button   variant='outlined' onClick={()=>makeFriend({id:all?._id})}>Follow</Button>
                   <Button variant='outlined' style={{marginLeft:"30px"}} onClick={()=>Chat(all?._id)}>Start Communication</Button>
                </div>
            </div>
         })
       }
    </div>
  )
}

export default Users
