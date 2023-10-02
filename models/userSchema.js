import mongoose from "mongoose";
import AuthRoles from "../utils/AuthRoles";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto  from "crypto";
import config from '../config/'


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Length of Name must be less than 50 characters"]
        },
        email: {
            type: String,
            required: [true, "Email  is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minLength: [8, "password must be atleast 8 characters"],
            select: false
        },
        role:{
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date, 

    },
    {
        timestamps: true,

    })

// Challenge - encrypt password - hooks
// middleware here will encrypt the password before saving it
// encrypting the password
userSchema.pre("save", async function(next){
    if(this.modified('password')){ // if this is true, this field is already existed, password is alread created
        this.password = encryptPassword()
    }
    if(!this.modified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
     
})


// more features to schema
userSchema.methods ={
    // compare password - compare the password entered by user
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.
            password)
    },

    //generate JWT Token
    getJWtToken: function(){
        return JWT.sign(
            {
                _id: this._id,
                role: this.role

            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    },

    generateForgotPasswordToken: function(){
        const forgotToken = crypto.randomBytes(20).toString('hex');

        //step 1 - save to DB
        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        this.forgotPasswordExpiry = Date.now() + 20 + 60*1000
        // step 2 -return values to user
        return forgotToken
    }


}  

export default mongoose.model("User", userSchema)

