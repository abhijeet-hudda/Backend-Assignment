import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String, unique: true
  },
  password: {
    type: String,
    required: [true,"password is required"]
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  refreshToken:{
    type:String
  }
},{timestamps: true});

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password,10);
})
//custom method add in mongoose schema
userSchema.methods.isPasswordCorrect=  async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
    //.sign(payload,secret,expiry)
};
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id: this._id,  
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
};

export const User = mongoose.model("User",userSchema);