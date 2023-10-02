import User from '../models/userSchema'
import JWT from 'jsonwebtoken'
import asyncHandler from '../services/asyncHandler' 
import CustomError from '../utils/customerError'
import config from '../config'

export const isLoggedIn = asyncHandler(async(req, res, next)=>{
    let token;
    if(req.cookies.token ||
        (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))){
            token = req.cookies.token || req.headers.authorization.split("")[1] // 0th element is Bearer and 1st element is token
            
            if(!token){
                throw new CustomError('Not Authorized to access this route', 401)
            }

            try{
                const decoded_JWT_payload = JWT.verify(token, config.JWT_SECRET)
                //_id, find user based on id, set this in req.user
                req.user = await User.findById(decoded_JWT_payload._id, "name email role")
                next()
            }catch(err){
                throw new CustomError('Not Authorized to access this route', 401)

            }


        }

})