import User from "../models/userSchema";
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customerError'

export const cookieOptions ={
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // could be in a seperate file in utils
    
}

/*

@SIGNUP
@route http://localhost:/4000/api/auth/signup
@description: User signup controller for creating a new user
@parameters name, email, password
@returns User Object

*/

export const signUp = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new CustomError('Please fill all the fields', 400);
    }

    // Check if user exists
    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new CustomError('User already exists', 400)
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const token = user.getJwtToken()
    console.log(user);
    user.password = undefined

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        success: true,
        token,
        user
    })

})


/*

@LOGIN
@route http://localhost:/4000/api/auth/login
@description: User Login Controller for logging user
@parameters name, email, password
@returns User Object

*/

export const login = asyncHandler(async (req, res)=>{
    const {name, email, password} = req.body

    if(!email || !password){
        throw new CustomError('Please fill all the fields', 400);
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        throw new CustomError("Invalid Credentials", 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(isPasswordMatched){
        const token = user.getJwtToken()
        user.password = undefined;
        res.cookie("token", token, cookieOptions)
        return res.staus(200).json({
            success: true,
            token,
            user
        })


    }

    throw new CustomError('Invalid credentials - pass', 400)

} )

/*

@SIGNOUT
@route http://localhost:/4000/api/auth/logout
@description: User SignOut
@parameters 
@returns success message

*/

export const logout = asyncHandler(async(_req, res)=>{
    // res.clearCookie( )
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

/*

@ForgotPassword
@route http://localhost:/5000/api/auth/password/forgot
@description: User will submit email and we will generate a token 
@parameters: E-mail
@returns success message as 'Email Sent'

*/

export const ForgotPassword = asyncHandler(async(req, res)=>{
    // Grabbing the email
    const {email} = req.body
    // Check email for empty string -  Email Validation
    const user = User.findOne({email});
    if(!user){
        throw new CustomError('User not found', 404)
    }
    const resetToken = user.generateForgotPasswordToken()
    await user.save({validateBeforeSave: false});

    // generating url
    const resetURL = 
    `${req.protocol}://${req.get("host")}api/auth/password/reset${resetToken}`

    const text = `Your password reset url is 
    \n\n ${resetURL}\n\n`

    // send reset url to user
    try{
        await mailHelper({
            email: user.email,
            subject:"Password reset for website",
            text: text,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(err){
        //roll back - clear fields and save
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined

        await user.save({validateBeforeSave: false})
        throw new CustomError(err.message || 'Failed to send email');


    }


})



/******************************************************
 * @ResetPassword
 * @route route http://localhost:/5000/api/auth/profile (we pass the url when when requested)
 * @description User will be able to reset password based on token
 * @parameters token from url, password and confirm password
 * @returns User Object
 ******************************************************/

export const resetPassword = asyncHandler(async(req, res)=>{
    
    const {token: resetToken} = req.params
    const {password, confirmPassword} =req.body
    //decrypt the forgot password token and verify by matching the user's forgot password token in the db using findOne (finding based on token)
    const resetPasswordToken = crypto 
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    const user = User.findOne(
        {
            forgotPasswordToken: resetPasswordToken,
            forgotPasswordExpiry: {$gt: Date.now()} // gt - greater than atleast now 
            

        })


        if(!user){
            throw new CustomError('password token is invalid or expired', 400)
        }

        if(password != confirmPassword){
            throw new CustomError('Password and confirm Password fields doesnt match', 400)
        }

        user.password = password
        user.forgotPasswordExpiry = undefined
        user.forgotPasswordExpiry = undefined

        // the new password's encryption will be handled automaically after it saves

        await user.save()

        //create token and send it to user
        const token = user.getJwtToken()
        user.password = undefined
        // helper method for cookie and 
        res.cookie("token", token, cookieOptions)
        res.status(200).json({
            success: true,
            user
        })


})


// next, create a controller for change password


/******************************************************
 * @GetProfile
 * @route route http://localhost:/5000/api/auth/profile (we pass the url when when requested)
 * @description check for token and populate req.user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const isLoggedIn = asyncHandler(async(req, res)=>{
    const {user} = req

    if(!user){
        throw new CustomError('User not found', 404)
    }
    res.status(200).json({
        success: true,
        user
    })
})



