import { Button, Typography } from '@mui/material'
import React from 'react'
import {authFetch} from "../utils"

const CurrentUser = () => {
    let [user,setUser]=React.useState({})

    const start=async ()=>{
      try {
          let {data}=await authFetch("/auth/currentUser")
           setUser(data.user)
      } catch (error) {
          console.log(error.response.data.msg)
      }
    }
    
    React.useEffect(()=>{
        start()
    },[])

    const unFollow=async (id)=>{
      try {
        await authFetch.post(`/auth/unFollow/${id}`)
        start()
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='section__padding'>
        <div>
       <Typography variant='h3'>
         Your Follow
       </Typography>
       {user?.followings?.length<1 && <p className='h__Cormorant'>Nothing to Show..</p>}
       {
           user?.followings?.map((all)=>{
            return <div style={{display:"flex",marginBottom:"30px",marginTop:"30px"}}>
               <Typography variant='h6' style={{marginRight:"30px"}}>{all?.name}</Typography>
               <img src={all?.image} style={{height:"40px",width:"40px",borderRadius:"50%"}}/>
               <Button onClick={()=>unFollow(all?._id)} variant='outlined' style={{marginLeft:"20px"}}>UnFollow</Button>
            </div>
        })
    }
        </div>


        <div>
       <Typography variant='h3'>
          Your Followers
       </Typography>
    {user?.followers?.length<1 && <p className='h__Cormorant'>Nothing to Show..</p>}
       {
        user?.followers?.map((all)=>{
            return <div style={{display:"flex",marginBottom:"30px",marginTop:"30px"}}>
               <Typography variant='h6' style={{marginRight:"30px"}}>{all?.name}</Typography>
               <img src={all?.image} style={{height:"40px",width:"40px",borderRadius:"50%"}}/>
            </div>
        })
       }
        </div>
        


    </div>
  )
}

export default CurrentUser
