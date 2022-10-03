import Auth from "../models/Auth.js"
import {BadRequestError,UnAuthenticatedError,NotFoundError} from "../errors/index.js"
import {StatusCodes} from "http-status-codes"

let Register=async (req,res)=>{
    let {name,password,email,image}=req.body

    if(!name || !password || !email){
        throw new BadRequestError("Please Provide All Credentials")
    }

    let emailAlreadyExists=await Auth.findOne({email})
    if(emailAlreadyExists){
        throw new BadRequestError("Email Already Exists")
    }

    if(!image){
        throw new BadRequestError("Wait for the image to upload to Or provide all the credentials and submit")
    }

    let user=await Auth.create({name,password,email,image})

    let token =user.createJWT()

    res.status(StatusCodes.CREATED).json({
        user:{name,email,image,userId:user._id},
        token:token
    })
}



let Login=async (req,res)=>{
    let {password,email}=req.body
    
    if(!password || !email){
        throw new BadRequestError("Please Provide All Credentials")
    }
    
    let user=await Auth.findOne({email})
    if(!user){
        throw new BadRequestError("User Does Not Exists")
    }

    let isPasswordCorrect=await user.comparePassword(password)
    
    if(!isPasswordCorrect){
        throw new BadRequestError('Password is not correct')
    }
   
    
    let token =user.createJWT()
    
    res.status(StatusCodes.CREATED).json({
        user:{name:user.name,email,image:user.image,userId:user._id},
        token:token

    })
    
}

const getAllUsers=async (req,res)=>{
    const users=await Auth.find({})
    // users=users.filter((all)=>all._id!==req.user.userId)
    res.status(StatusCodes.OK).json({users})
}

const getCurrentUser=async (req,res)=>{
    let user=await Auth.findOne({_id:req.user.userId}).populate("followings").populate('followers')

    res.status(StatusCodes.OK).json({user})
}


const followUser=async (req,res)=>{
 
    if(!req.params.userId){
        throw new BadRequestError("Please Provide the UserId")
    }

    let CurrentUser=await Auth.findOne({_id:req.user.userId})

    let Friend=await Auth.findOne({_id:req.params.userId})

    if(CurrentUser.followings.includes(req.params.userId)){
        throw new BadRequestError("You Already Have Followed This Person")
    }

    await Auth.findOneAndUpdate({_id:req.user.userId},{ $push: { followings: req.params.userId } });

    await Auth.findOneAndUpdate({_id:req.params.userId},{ $push: { followers: req.user.userId } });


    res.status(StatusCodes.OK).json("All Goes According to the plan")

}



const UnFollow=async (req,res)=>{
    if(!req.params.userId){
        throw new BadRequestError("Please Provide the UserId")
    }

    let CurrentUser=await Auth.findOne({_id:req.user.userId})

    let Friend=await Auth.findOne({_id:req.params.userId})

   

    await Auth.findOneAndUpdate({_id:req.user.userId},{ $pull: { followings: req.params.userId } });

    await Auth.findOneAndUpdate({_id:req.params.userId},{ $pull: { followers: req.user.userId } });


    res.status(StatusCodes.OK).json("All Goes According to the plan")
}





export {Register,Login,getAllUsers,followUser,getCurrentUser,UnFollow}